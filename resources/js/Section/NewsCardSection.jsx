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
import useLatestNewsStore from "../Global/useLatesNewsStore";
const NewsCardSection = () => {
    const swiperRef = useRef(null);
    const { newsData, isLoading, fetchLatestNews } = useLatestNewsStore();

    useEffect(() => {
        fetchLatestNews();
    }, []);

    return (
        <div className="shadow w-full h-full overflow-hidden relative group">
            {isLoading ? (
                <div className="relative w-full h-full overflow-hidden">
                    <div className="w-full h-full bg-black/20">
                        <div className=" visible inline-block h-[67%] md:h-[50%] absolute bottom-0 w-full bg-black/30 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white">
                            <h1 className="md:text-4xl font-extrabold">
                                Memuat...
                            </h1>
                        </div>
                    </div>
                </div>
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
                    className="mySwiper relative w-full h-full overflow-hidden"
                >
                    {newsData.slice(0, 5).map((News, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full group">
                                    <img
                                        src={News.image_url}
                                        alt=""
                                        className="w-full h-full absolute top-0 object-cover object-center bg-gray-100 border-none"
                                    />
                                    <div className=" visible inline-block h-[67%] md:h-[50%] absolute bottom-0 w-full bg-black/30 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white">
                                        <div className="flex flex-col h-full">
                                            <div className="flex-grow flex flex-col h-auto justify-between">
                                                <div>
                                                    <p className="font-roboto text-sm  uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                                                        {Array.isArray(
                                                            News.category
                                                        )
                                                            ? News.category
                                                                  .length > 0
                                                                ? News.category.map(
                                                                      (
                                                                          cat,
                                                                          i
                                                                      ) => (
                                                                          <span
                                                                              key={
                                                                                  i
                                                                              }
                                                                          >
                                                                              {
                                                                                  cat.name
                                                                              }
                                                                              {
                                                                                  "  "
                                                                              }
                                                                          </span>
                                                                      )
                                                                  )
                                                                : "Tidak ada kategori"
                                                            : News.category
                                                                  ?.name ||
                                                              "Tidak ada kategori"}
                                                    </p>
                                                    <a
                                                        href={`/berita/${News.slug}`}
                                                        className=""
                                                    >
                                                        <h2 className="line-clamp-3 md:line-clamp-2 font-intro font-extrabold text-xl md:text-2xl leading-9 md:leading-10 max-h-[108px] md:max-h-[90px] mb-3">
                                                            {News.title}
                                                        </h2>
                                                    </a>
                                                </div>
                                                <div className="flex mb-5 flex-col md:flex-row gap-2 opacity-60 text-xs md:divide-x divide-white">
                                                    <p className="flex items-center gap-2 md:pr-2">
                                                        <Calendar className="w-[16px]" />
                                                        <span>
                                                            {new Date(
                                                                News.published_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p className="md:pl-2 flex items-center gap-2 capitalize">
                                                        <PenLine
                                                            width="16px"
                                                            height="16px"
                                                            aria-hidden="true"
                                                        />
                                                        <span>
                                                            Penulis :{" "}
                                                            {News.writer ||
                                                                "Admin"}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Footer News */}
                                            <div className="md:flex justify-between items-center">
                                                <a
                                                    href={`berita/${News.slug}`}
                                                    className="text-sm border border-gray-600 border-opacity-30 px-4 py-1 flex items-center rounded-lg"
                                                >
                                                    Baca Selengkapnya →
                                                </a>
                                                <div className="flex bg-gray-900/20 border border-gray-700 rounded-2xl p-2 justify-between gap-3">
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
                                                            {newsData.length}
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
                                                            className="w-[25px] h-auto "
                                                            alt="Prev"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Footer News */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default NewsCardSection;
