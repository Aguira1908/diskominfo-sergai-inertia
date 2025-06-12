import { create } from "zustand";
import axios from "axios";

const useLatestNewsStore = create((set) => ({
    newsData: [],
    isLoading: false,
    error: null,

    fetchLatestNews: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get("/api/news?latest=true");
            set({ newsData: response?.data?.data || [], isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.log("Failed to fetch banner", err);
        }
    },
}));
export default useLatestNewsStore;
