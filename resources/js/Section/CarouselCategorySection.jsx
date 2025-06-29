import React, { useEffect, useRef, useState } from "react";

import {
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
    ScreenShare,
    Newspaper,
} from "lucide-react";
import "../../css/app.css";
import { usePage } from "@inertiajs/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

import { Link } from "@inertiajs/react";
import axios from "axios";
const CarouselCategorySection = ({ categoryHandler, activeCategory }) => {
    const [isActive, setIsActive] = useState(false);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                // const localRes = await axios.get("api/news-category");
                // const mediaRes = await axios.get(
                //     `https://cors-anywhere.herokuapp.com/https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories`
                // );

                const [localRes, mediaRes] = await Promise.all([
                    axios.get("/api/news-category"), // local DB
                    axios.get("/proxy/categories"), // WordPress
                ]);
                // const apiData = response?.data || [];

                const localCategories = localRes.data || [];
                const mediaCategories = (mediaRes.data || []).map((cat) => ({
                    id: `media-${cat.id}`, // beri prefix agar tidak konflik dengan id lokal
                    name: cat.name,
                    slug: cat.slug,
                    source: "mediacenter",
                }));

                setCategory([
                    { id: "all", name: "Semuanya", slug: false },
                    ...localCategories,
                    ...mediaCategories,
                ]);

                // setCategory([
                //     { id: "all", name: "Semuanya", slug: false },
                //     ...apiData,
                // ]);
            } catch (err) {
                console.log("Failed to fetch category", err);
            }
        };

        fetchCategoryNews();
    }, []);

    return (
        <Swiper
            slidesPerView="auto"
            spaceBetween={50}
            centeredSlides={false}
            style={{ overflow: "hidden" }}
            className="overflow-hidden" // Important untuk membuat slide bisa keluar dari container
            breakpoints={{
                640: { spaceBetween: 24 },
                1024: { spaceBetween: 32 },
            }}
        >
            {/* proses develop */}
            {/* <SwiperSlide className="!w-auto">
                Proses Develop
                <a
                    href={`/summarize`}
                    aria-label="Lihat Semua Berita"
                    className=""
                >
                    <div className="flex justify-between items-center  py-2 px-3 font-medium text-sm border bg-blue-500 hover:bg-blue-600 border-blue-400 text-white rounded-xl">
                        <p className="px-2">Lihat Ringkasan Berita</p>
                        <div>
                            <Newspaper className="w-3 h-auto " />
                        </div>
                    </div>
                </a>
                <li
                    className={
                        "relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group border-2 rounded-full border-blue-500 text-blue-500"
                    }
                >
                    <Link href={"/summarize"}>
                        <span className="font-semibold text-sm group-hover:text-blue-500">
                            Ringkasan
                        </span>
                    </Link>
                </li>
            </SwiperSlide> */}
            {category.map((cat, index) => {
                return (
                    <SwiperSlide className="!w-auto" key={index}>
                        <li
                            className={` relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group rounded-xl hover:bg-blue-200/60  transition-colors duration-200 ${
                                activeCategory === cat.slug
                                    ? "border-2 border-blue-500 bg-blue-100 text-blue-500"
                                    : "text-gray-600  "
                            }`}
                        >
                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    categoryHandler(cat.slug);
                                    setIsActive(!isActive);
                                }}
                            >
                                <span className="font-semibold text-sm group-hover:text-gray-700">
                                    {cat.name}
                                </span>
                            </button>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default CarouselCategorySection;
