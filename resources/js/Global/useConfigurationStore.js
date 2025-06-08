import { create } from "zustand";
import axios from "axios";

const useConfiguration = create((set) => ({
    configData: {},
    isLoading: false,
    error: null,

    fetchConfig: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get("/api/configuration");

            set({ configData: response?.data || {}, isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.log("Failed to fetch config", err);
        }
    },
}));

export default useConfiguration;
