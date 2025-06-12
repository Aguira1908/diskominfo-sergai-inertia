import React, { useEffect, useRef, useState } from "react";

import {
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
    ScreenShare,
} from "lucide-react";
import Image1 from "../../../storage/app/public/news-images/01JV4CNY9XDQ66ASKCXVX2SWZT.jpeg";
import "../../css/app.css";
import { usePage } from "@inertiajs/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

import { Link } from "@inertiajs/react";
import useNewsStore from "../Global/useNewsStore";

const HeroNewsSection = () => {
    const swiperRef = useRef(null);

    const { newsData, meta, isLoading, fetchNews } = useNewsStore();

    useEffect(() => {
        fetchNews({ latestPerCategory: true });
    }, [fetchNews]);

    const newsPerCategory = newsData || [];
    return (
        <div className="h-[700px] bg-gray-800 ">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                loop={true}
                allowTouchMove={false}
                effect={"fade"}
                modules={[EffectFade, Autoplay]}
                className="mySwiper relative w-full h-full overflow-hidden"
            >
                {newsPerCategory.map((news, index) => {
                    if (!news) return null; // Handle jika tidak ada berita

                    return (
                        <SwiperSlide key={index}>
                            <div>
                                <img
                                    src={news.image_url}
                                    loading="lazy"
                                    alt="image"
                                    className="w-full h-full absolute top-0 object-cover object-center"
                                    width={1920}
                                    height={740}
                                />
                                <div
                                    className="w-full h-full absolute top-0"
                                    style={{
                                        background:
                                            "radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)",
                                    }}
                                ></div>
                            </div>
                            <div className="absolute w-full bottom-0 text-white ">
                                <div className="text-white container mx-auto px-6 2xl:px-0 xl:max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-1">
                                    <div className="div1 md:col-span-4 px-0  md:p-4 rounded-lg">
                                        <span className="text-sm md:text-xl md:p-0 font-semibold ">
                                            {news.name}
                                        </span>
                                    </div>

                                    <div className="div2 md:col-span-4 md:row-span-2 md:row-start-2 p-1 md:p-4 rounded-lg">
                                        <h1 className="text-xl md:text-4xl font-bold mb-2">
                                            {news.title}
                                        </h1>
                                    </div>

                                    <div className="div3 md:col-span-4 md:row-start-4 p-1 md:p-4 rounded-lg">
                                        <div className="text-gray-300 text-sm flex  space-y-2 md:flex-row gap-6 ">
                                            <p className="  flex gap-1">
                                                <Calendar
                                                    src={Calendar}
                                                    className="w-5"
                                                />
                                                {new Date(
                                                    news.published_at // <-- perbaikan di sini
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            |
                                            <p className="flex gap-1">
                                                <PenLine
                                                    className="w-5"
                                                    alt=""
                                                />
                                                Penulis:{" "}
                                                {news.writer || "Admin"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="div7 md:col-span-4 md:row-start-5 p-1 md:p-4 rounded-lg">
                                        <div className="flex justify-between flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                                            <a
                                                href={`/berita/${news.slug}`}
                                                className="text-sm border border-gray-600 border-opacity-30 px-4  flex items-center rounded-lg"
                                            >
                                                Baca Selengkapnya →
                                            </a>

                                            <div className="flex bg-gray-950 border border-gray-700 rounded-2xl p-2 justify-between gap-3">
                                                <button
                                                    onClick={() =>
                                                        swiperRef.current?.slidePrev()
                                                    }
                                                    className="cursor-pointer"
                                                    aria-label="Berita Terbaru Sebelumnya"
                                                >
                                                    <ArrowLeft
                                                        className="w-[25px] h-auto"
                                                        alt="Next"
                                                    />
                                                </button>
                                                <p className="text-sm">
                                                    <span className="text-gray-300 ">
                                                        {index + 1} dari{" "}
                                                        {newsPerCategory.length}
                                                    </span>
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        swiperRef.current?.slideNext()
                                                    }
                                                    className="cursor-pointer"
                                                    aria-label="Berita Terbaru Selanjutnya"
                                                >
                                                    <ArrowRight
                                                        className="w-[25px] h-auto"
                                                        alt="Prev"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default HeroNewsSection;
