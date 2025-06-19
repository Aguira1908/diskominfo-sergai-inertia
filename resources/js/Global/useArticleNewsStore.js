import { create } from "zustand";
import axios from "axios";
import { SanitizeData } from "./useSanitizeData";
const useArticleNewsStore = create((set) => ({
    articleData: {},
    isLoading: false,
    error: null,

    fetchArticleNews: async (slug) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`/api/news/${slug}`);
            //sanitize dulu cuy
            const cleanData = SanitizeData(response?.data?.data || {});
            set({ articleData: cleanData || {}, isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.log("Failed to fetch Article", err);
        }
    },
}));

export default useArticleNewsStore;
