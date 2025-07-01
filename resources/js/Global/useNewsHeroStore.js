import { create } from "zustand";
import axios from "axios";

const useNewsHero = create((set) => ({
    newsHero: [],
    isLoading: false,
    error: null,

    fetchLatestPerCat: async () => {
        set({ isLoading: true, error: null });

        try {
            const localRes = await axios.get(
                "/api/news?latest_per_category=true"
            );

            // const [localRes, mediaRes] = await Promise.all([
            //     axios.get("/api/news?latest_per_category=true"), //Local
            //     axios.get("/proxy/posts-latest-by-category"),
            // ]);
            const localLatest = (localRes?.data?.data || []).map((item) => ({
                id: `local-${item.id}`,
                source: "local",
                title: item.title,
                excerpt: item.excerpt,
                slug: item.slug,
                link: `/berita/${item.slug}`,
                date: item.published_at,
                thumbnail: item.image_url,
                category: {
                    id: item.category?.id,
                    name: item.category?.name,
                    slug: item.category?.slug,
                },
            }));

            // const mediaLatest = (mediaRes?.data || []).map((item) => ({
            //     id: `media-${item.post_id}`,
            //     source: "media",
            //     title: item.title,
            //     excerpt: item.excerpt,
            //     slug: item.slug,
            //     link: item.link,
            //     date: item.date,
            //     thumbnail: item.thumbnail,
            //     category: {
            //         id: item.category_id,
            //         name: item.category_name,
            //     },
            // }));

            set({
                // newsHero: [...localLatest, ...mediaLatest],
                newsHero: localLatest || [],
                isLoading: false,
            });
        } catch (err) {
            set({ error: err, isLoading: false });
            console.error("Failed to fetch news:", err);
        }
    },
}));
export default useNewsHero;
