import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

class StoreClass {
    constructor(name) {
        if (!name || typeof name !== "string") {
            throw new Error("Store name is required");
        }

        this.name = name;
    }

    /**
     * Guarda un valor.
     *
     * @param {string} key
     * @param {string} value
     * @returns {Promise<void>}
     */
    async set(key, value) {
        const storageKey = this._keyConstructor(key);

        if (typeof value !== "string") {
            throw new TypeError("Store value must be a string");
        }

        if (isWeb) {
            localStorage.setItem(storageKey, value);
            return;
        }

        await SecureStore.setItemAsync(storageKey, value);
    }

    /**
     * Obtiene un valor.
     *
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    async get(key) {
        const storageKey = this._keyConstructor(key);

        if (isWeb) {
            return localStorage.getItem(storageKey);
        }

        return await SecureStore.getItemAsync(storageKey);
    }

    /**
     * Elimina un valor.
     *
     * @param {string} key
     * @returns {Promise<void>}
     */
    async remove(key) {
        const storageKey = this._keyConstructor(key);

        if (isWeb) {
            localStorage.removeItem(storageKey);
            return;
        }

        await SecureStore.deleteItemAsync(storageKey);
    }

    /**
     * Comprueba si existe una key.
     *
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    async has(key) {
        const value = await this.get(key);

        return value !== null;
    }

    /**
     * Construye la key utilizada internamente.
     *
     * @param {string} key
     * @returns {string}
     */
    _keyConstructor(key) {
        if (!key || typeof key !== "string") {
            throw new TypeError("Store key must be a non-empty string");
        }

        return `${this.name}-${key}`;
    }
}

export default function Store (name) { 
    return new StoreClass(name);
}
