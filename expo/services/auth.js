import Store from "./store";

const STORE_NAME = "auth";
const TOKEN_KEY = "session";

const store = Store(STORE_NAME);

export async function saveToken(token) {    
    await store.set(TOKEN_KEY, token);
}

export async function getToken() {
    return await store.get(TOKEN_KEY);
}

export async function removeToken() {
    await store.remove(TOKEN_KEY);
}