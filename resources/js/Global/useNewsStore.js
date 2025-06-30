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
            // console.log(response?.data?.data);
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
// src/store/useNewsStore.js

// import { create } from "zustand";
// import axios from "axios";

// const useNewsStore = create((set) => ({
//     newsData: [],
//     meta: {},
//     isLoading: false,
//     error: null,

//     fetchNews: async ({ page = 1, perPage = 10, category = null } = {}) => {
//         set({ isLoading: true, error: null });

//         try {
//             // 1. Fetch dari lokal dan media center secara paralel
//             const [localRes, mediaRes] = await Promise.all([
//                 axios.get("/api/news", {
//                     params: { page, per_page: perPage, category },
//                     timeout: 10000, // 10 detik
//                 }),
//                 axios.get("/proxy/media-news", {
//                     params: { page, per_page: perPage, category },
//                     timeout: 10000, // 10 detik
//                 }),
//             ]);

//             const localNews = localRes.data?.data || [];
//             const mediaNews = mediaRes.data?.data || [];

//             // 2. Gabungkan dan urutkan semua berita berdasarkan tanggal
//             const mergedNews = [...localNews, ...mediaNews].sort((a, b) => {
//                 return new Date(b.published_at) - new Date(a.published_at);
//             });

//             // 3. Hitung total pagination gabungan
//             const total =
//                 (localRes.data?.meta?.total || 0) +
//                 (mediaRes.data?.meta?.total || 0);

//             const totalPages = Math.ceil(total / perPage);

//             set({
//                 newsData: mergedNews,
//                 meta: {
//                     current_page: page,
//                     per_page: perPage,
//                     total,
//                     total_pages: totalPages,
//                 },
//                 isLoading: false,
//             });
//         } catch (err) {
//             console.error("Failed to fetch news:", err);
//             set({ error: err, isLoading: false });
//         }
//     },
// }));

// export default useNewsStore;
