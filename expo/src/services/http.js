class HttpError extends Error {
    constructor(message, { status, data, url, method } = {}) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.data = data;
        this.url = url;
        this.method = method;
    }
}

class HttpService {
    constructor({ baseURL = "", headers = {}, timeout = 15000 } = {}) {
        this.baseURL = baseURL.replace(/\/+$/, "");
        this.headers = headers;
        this.timeout = timeout;
        this.requests = new Map();
        this.nextId = 0;
    }

    setBaseURL(baseURL) {
        this.baseURL = baseURL.replace(/\/+$/, "");
    }

    setHeaders(headers) {
        this.headers = { ...this.headers, ...headers };
    }

    setHeader(name, value) {
        this.headers[name] = value;
    }

    removeHeader(name) {
        delete this.headers[name];
    }

    request(method, path, options = {}) {
        const {
            id = `request-${++this.nextId}`,
            headers = {},
            body,
            params,
            timeout = this.timeout,
            signal: externalSignal,
            ...fetchOptions
        } = options;

        this.cancel(id);

        const controller = new AbortController();
        const url = this.buildURL(path, params);

        let timeoutId;
        let settled = false;

        const abort = (reason) => {
            if (!controller.signal.aborted) {
                controller.abort(reason);
            }
        };

        const cancel = (reason = "Request cancelled") => {
            abort(reason);
        };

        const onExternalAbort = () => {
            abort(externalSignal.reason);
        };

        if (externalSignal) {
            if (externalSignal.aborted) {
                onExternalAbort();
            } else {
                externalSignal.addEventListener(
                    "abort",
                    onExternalAbort,
                    { once: true }
                );
            }
        }

        const requestHeaders = {
            ...this.headers,
            ...headers,
        };

        const isFormData =
            typeof FormData !== "undefined" &&
            body instanceof FormData;

        const isStringBody =
            typeof body === "string";

        let requestBody = body;

        if (
            body != null &&
            !isFormData &&
            !isStringBody &&
            !(body instanceof ArrayBuffer) &&
            !ArrayBuffer.isView(body)
        ) {
            requestBody = JSON.stringify(body);
            requestHeaders["Content-Type"] ??= "application/json";
        }

        if (isFormData) {
            delete requestHeaders["Content-Type"];
            delete requestHeaders["content-type"];
        }

        if (timeout > 0) {
            timeoutId = setTimeout(() => {
                abort("Request timeout");
            }, timeout);
        }

        const promise = (async () => {
            try {
                const response = await fetch(url, {
                    ...fetchOptions,
                    method: method.toUpperCase(),
                    headers: requestHeaders,
                    body: ["GET", "HEAD"].includes(
                        method.toUpperCase()
                    )
                        ? undefined
                        : requestBody,
                    signal: controller.signal,
                });

                const contentType =
                    response.headers.get("content-type") || "";

                let data = null;

                if (response.status !== 204) {
                    if (contentType.includes("application/json")) {
                        data = await response.json();
                    } else {
                        const text = await response.text();
                        data = text || null;
                    }
                }

                if (!response.ok) {
                    throw new HttpError(
                        data?.message ||
                            data?.error ||
                            response.statusText ||
                            "HTTP request failed",
                        {
                            status: response.status,
                            data,
                            url,
                            method: method.toUpperCase(),
                        }
                    );
                }

                return {
                    data,
                    status: response.status,
                    headers: response.headers,
                };
            } catch (error) {
                if (controller.signal.aborted) {
                    const reason = controller.signal.reason;

                    const abortError = new Error(
                        typeof reason === "string"
                            ? reason
                            : "Request cancelled"
                    );

                    abortError.name = "AbortError";
                    abortError.cause = error;

                    throw abortError;
                }

                if (error instanceof HttpError) {
                    throw error;
                }

                throw error;
            } finally {
                settled = true;

                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                externalSignal?.removeEventListener(
                    "abort",
                    onExternalAbort
                );

                if (this.requests.get(id)?.controller === controller) {
                    this.requests.delete(id);
                }
            }
        })();

        this.requests.set(id, {
            controller,
            promise,
            cancel,
            get settled() {
                return settled;
            },
        });

        return {
            id,
            promise,
            cancel,
        };
    }

    buildURL(path, params) {
        const url = /^https?:\/\//i.test(path)
            ? path
            : `${this.baseURL}/${path.replace(/^\/+/, "")}`;

        if (!params) {
            return url;
        }

        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value == null) return;

            if (Array.isArray(value)) {
                value.forEach(item => {
                    query.append(key, String(item));
                });
            } else {
                query.append(key, String(value));
            }
        });

        const search = query.toString();

        if (!search) return url;

        return `${url}${url.includes("?") ? "&" : "?"}${search}`;
    }

    get(path, options = {}) {
        return this.request("GET", path, options);
    }

    post(path, body, options = {}) {
        return this.request("POST", path, {
            ...options,
            body,
        });
    }

    put(path, body, options = {}) {
        return this.request("PUT", path, {
            ...options,
            body,
        });
    }

    patch(path, body, options = {}) {
        return this.request("PATCH", path, {
            ...options,
            body,
        });
    }

    delete(path, options = {}) {
        return this.request("DELETE", path, options);
    }

    cancel(id, reason) {
        const request = this.requests.get(id);

        if (!request) return false;

        request.cancel(reason);
        return true;
    }

    cancelAll(reason = "All requests cancelled") {
        for (const request of this.requests.values()) {
            request.cancel(reason);
        }
    }

    getActiveRequests() {
        return Array.from(this.requests.entries()).map(
            ([id, request]) => ({
                id,
                settled: request.settled,
            })
        );
    }
}

export { HttpService, HttpError };

export default new HttpService({
    baseURL: process.env.PUBLIC_API_URL || "",
});
