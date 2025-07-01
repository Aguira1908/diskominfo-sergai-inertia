import { create } from "zustand";
import axios from "axios";

const useLatestNewsStore = create((set) => ({
    newsData: [],
    isLoading: false,
    error: null,

    fetchLatestNews: async () => {
        set({ isLoading: true, error: null });

        try {
            const localRes = await axios.get("/api/news?latest=true");

            // const [localRes, mediaRes] = await Promise.all([
            //     axios.get("/api/news?latest=true"),
            //     axios.get("/proxy/media-latest"),
            // ]);

            const localData = localRes?.data?.data || [];
            // const mediaData = mediaRes?.data || [];

            // console.log(localData);
            // console.log(mediaData);

            // const mergedNews = [...localData, ...mediaData];
            const mergedNews = localData;
            set({ newsData: mergedNews || [], isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.log("Failed to fetch latest news", err);
        }
    },
}));
export default useLatestNewsStore;
