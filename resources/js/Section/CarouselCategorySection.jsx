import React, { useEffect, useRef, useState } from "react";

import {
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
    ScreenShare,
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
                const response = await axios.get("api/news-category");
                const apiData = response?.data || [];

                setCategory([
                    { id: "all", name: "Semuanya", slug: false },
                    ...apiData,
                ]);
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
            <SwiperSlide className="!w-auto">
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
            </SwiperSlide>
            {category.map((cat, index) => {
                return (
                    <SwiperSlide className="!w-auto" key={index}>
                        <li
                            className={` relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${
                                activeCategory === cat.slug
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-600"
                            }`}
                        >
                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    categoryHandler(cat.slug);
                                    setIsActive(!isActive);
                                }}
                            >
                                <span className="font-semibold text-sm group-hover:text-blue-500">
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
