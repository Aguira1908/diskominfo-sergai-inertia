import React, { useEffect, useRef } from "react";
import { Calendar, PenLine, ArrowRight, ArrowLeft } from "lucide-react";
import "../../css/app.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

import useNewsHero from "../Global/useNewsHeroStore";

const HeroNewsSection = () => {
    const swiperRef = useRef(null);

    const { newsHero, isLoading, fetchLatestPerCat } = useNewsHero();

    useEffect(() => {
        if (!newsHero || newsHero.length === 0) {
            fetchLatestPerCat();
        }
    }, [newsHero, fetchLatestPerCat]);

    return (
        <div className="h-[700px] bg-gray-800">
            {isLoading ? (
                <h1 className="text-white text-center pt-20">Memuat...</h1>
            ) : (
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
                    className="mySwiper relative w-full h-full overflow-hidden bg-blue-500"
                >
                    {newsHero?.map((news, index) => (
                        <SwiperSlide key={news.id}>
                            <div>
                                <img
                                    src={news.thumbnail || news.image_url}
                                    loading="lazy"
                                    alt="image"
                                    className="w-full h-full absolute pointer-events-none top-0 object-cover object-center"
                                    width={1920}
                                    height={740}
                                />
                                <div
                                    className="w-full h-full absolute top-0 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)",
                                    }}
                                ></div>
                            </div>

                            <div className="absolute w-full bottom-0 text-white">
                                <div className="text-white container mx-auto px-6 2xl:px-0 xl:max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-1">
                                    <div className="md:col-span-4 px-0 md:p-4 rounded-lg">
                                        <span className="text-sm md:text-xl md:py-4 font-semibold">
                                            {news.category?.name || "-"}
                                        </span>
                                    </div>

                                    <div className="md:col-span-5 md:row-span-2 md:row-start-2 p-1 md:py-4 rounded-lg">
                                        <h1 className="text-xl md:text-5xl font-extrabold mb-2 line-clamp-2">
                                            {news.title}
                                        </h1>
                                    </div>

                                    <div className="md:col-span-4 md:row-start-4 p-1 md:py-4 rounded-lg">
                                        <div className="text-gray-300 text-sm flex space-y-2 md:flex-row gap-6">
                                            <p className="flex gap-1">
                                                <Calendar className="w-5" />
                                                {new Date(
                                                    news.date ||
                                                        news.published_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            |
                                            <p className="flex gap-1">
                                                <PenLine className="w-5" />
                                                Penulis:{" "}
                                                {news.writer || "Admin"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="div7 md:col-span-5 md:row-start-5 p-1 md:py-4 rounded-lg">
                                        <div className="flex justify-between flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                                            <a
                                                href={
                                                    news.source === "media"
                                                        ? news.link
                                                        : `/berita/${news.slug}`
                                                }
                                                className="text-sm border border-gray-600 border-opacity-30 px-4 flex items-center rounded-lg"
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
                                                    <ArrowLeft className="w-[25px] h-auto" />
                                                </button>
                                                <p className="text-sm">
                                                    <span className="text-gray-300">
                                                        {index + 1} dari{" "}
                                                        {newsHero.length}
                                                    </span>
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        swiperRef.current?.slideNext()
                                                    }
                                                    className="cursor-pointer"
                                                    aria-label="Berita Terbaru Selanjutnya"
                                                >
                                                    <ArrowRight className="w-[25px] h-auto" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default HeroNewsSection;
