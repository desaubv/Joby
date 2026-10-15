
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    CONFIG_KEY,
    DEFAULT_CONFIG,
} from "../../config/appConfig";

const storage = {
    async getItem(key) {
        if (Platform.OS === "web") {
            return localStorage.getItem(key);
        }

        return AsyncStorage.getItem(key);
    },

    async setItem(key, value) {
        if (Platform.OS === "web") {
            localStorage.setItem(key, value);
            return;
        }

        return AsyncStorage.setItem(key, value);
    },

    async removeItem(key) {
        if (Platform.OS === "web") {
            localStorage.removeItem(key);
            return;
        }

        return AsyncStorage.removeItem(key);
    },
};

const LocalStorage = {
    async getConfig() {
        try {
            const stored = await storage.getItem(CONFIG_KEY);

            if (!stored) {
                return { ...DEFAULT_CONFIG };
            }

            const parsed = JSON.parse(stored);

            return {
                ...DEFAULT_CONFIG,
                ...parsed,
            };
        } catch (error) {
            console.error(
                "Error al leer la configuración:",
                error
            );

            return { ...DEFAULT_CONFIG };
        }
    },

    async setConfig(config) {
        const current = await this.getConfig();

        const updated = {
            ...current,
            ...config,
        };

        await storage.setItem(
            CONFIG_KEY,
            JSON.stringify(updated)
        );

        return updated;
    },

    async resetConfig() {
        await storage.removeItem(CONFIG_KEY);

        return { ...DEFAULT_CONFIG };
    },
};

export default LocalStorage;
