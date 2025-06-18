import { create } from "zustand";
import axios from "axios";
import { SanitizeData } from "./useSanitizeData";

const useArticleContentStore = create((set) => ({
    contentData: {},
    isLoading: false,
    error: null,

    fetchArticleContent: async (slug) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`/api/contents/${slug}`);
            const cleanData = SanitizeData(response?.data?.data || {});
            set({ contentData: cleanData || {}, isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.error("failed to feth Article", err);
        }
    },

    // Reset state saat slug berubah
    reset: () => set({ contentData: null }),
}));

export default useArticleContentStore;
