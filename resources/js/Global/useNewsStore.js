// src/store/useNewsStore.js
import { create } from "zustand";
import axios from "axios";

const useNewsStore = create((set) => ({
    newsData: [],
    meta: {},
    isLoading: false,
    error: null,

    // fetchNews menerima parameter dari komponen
    fetchNews: async ({
        page = 1,
        perPage = 5,
        latest = false,
        latestPerCategory = false,
        category = null,
    } = {}) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get("/api/news", {
                params: {
                    page,
                    per_page: perPage,
                    ...(latest && { latest: true }),
                    ...(latestPerCategory && { latest_per_category: true }),
                    ...(category && { category }),
                },
            });
            console.log(response?.data?.data);
            set({
                newsData: response?.data?.data || [],
                meta: response?.data?.meta || {},
                isLoading: false,
            });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.error("Failed to fetch news:", err);
        }
    },
}));

export default useNewsStore;
