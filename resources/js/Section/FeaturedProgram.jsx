import React, { useEffect, useRef, useState } from "react";
import {
    Facebook,
    ScreenShare,
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
    CalendarX2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import {
    EffectFade,
    Autoplay,
    Mousewheel,
    Navigation,
    Pagination,
    Grid,
} from "swiper/modules";
import axios from "axios";

const FeaturedProgram = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await axios.get("api/featured-programs");
                const apiData = response.data?.data || {};
            } catch (error) {
                console.error("Failed to Fetch Program", error);
            }
        };
    });

    return (
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl ">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-8">
                <h2 className="font-medium text-[28px] md:text-4xl leading-loose">
                    Program Unggulan
                </h2>
                <div className="flex-1 flex justify-center flex-col text-center">
                    <div className="border-b border-gray-300"></div>
                </div>
            </div>
            <div className=" py-2 group/swiper ">
                {/* Card */}
                <Swiper
                    className="mySwiper relative"
                    spaceBetween={20}
                    pagination={{
                        el: ".custom-pagination",
                        clickable: true,
                    }}
                    mousewheel={true}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        disabledClass: ".swiper-button-disabled",
                    }}
                    speed={1500}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            grid: { rows: 1 },
                        },
                        641: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            grid: { rows: 2 },
                        },
                        1024: {
                            slidesPerView: 3,
                            slidesPerGroup: 4,
                            grid: { rows: 2, fill: "rows" },
                        },
                    }}
                    modules={[Navigation, Pagination, Mousewheel, Grid]}
                >
                    {programs.map((program, index) => {
                        return (
                            <SwiperSlide>
                                <div className="h-[253px] md:h-[234px] flex flex-col items-start gap-4 group bg-white p-6 rounded-xl border border-white hover:border-blue-400 hover:shadow-md transition-colors  duration-300">
                                    <img
                                        src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                        className=" h-[32px] "
                                        alt="gambar"
                                    />
                                    <h3 className="font-bold text-xl md:text-2xl leading-normal group-hover:text-blue-500">
                                        title
                                    </h3>
                                    <p className="text-sm leading-6 text-blue-gray-800 group-hover:text-blue-gray-900 line-clamp-3 md:line-clamp-2">
                                        description
                                    </p>

                                    <a href="#" className="w-full">
                                        <button
                                            aria-label="Buka Program Unggulan"
                                            className="flex justify-between font-sans-1 items-center text-blue-500 font-bold text-sm hover:bg-blue-100 rounded-lg transition-colors duration-200 py-1 px-2 w-full  "
                                        >
                                            Selengkapnya
                                            <div className="flex justify-center items-center w-[20px] h-auto ">
                                                <ScreenShare />
                                            </div>
                                        </button>
                                    </a>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                    <SwiperSlide>
                        <div className="h-[253px] md:h-[234px] flex flex-col items-start gap-4 group bg-white p-6 rounded-xl border border-white hover:border-blue-400 hover:shadow-md transition-colors  duration-300">
                            <img
                                src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                className=" h-[32px] "
                                alt="gambar"
                            />
                            <h3 className="font-bold text-xl md:text-2xl leading-normal group-hover:text-blue-500">
                                title
                            </h3>
                            <p className="text-sm leading-6 text-blue-gray-800 group-hover:text-blue-gray-900 line-clamp-3 md:line-clamp-2">
                                description
                            </p>

                            <a href="#" className="w-full">
                                <button
                                    aria-label="Buka Program Unggulan"
                                    className="flex justify-between font-sans-1 items-center text-blue-500 font-bold text-sm hover:bg-blue-100 rounded-lg transition-colors duration-200 py-1 px-2 w-full  "
                                >
                                    Selengkapnya
                                    <div className="flex justify-center items-center w-[20px] h-auto ">
                                        <ScreenShare />
                                    </div>
                                </button>
                            </a>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="h-[253px] md:h-[234px] flex flex-col items-start gap-4 group bg-white p-6 rounded-xl border border-white hover:border-blue-400 hover:shadow-md transition-colors  duration-300">
                            <img
                                src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                className=" h-[32px] "
                                alt="gambar"
                            />
                            <h3 className="font-bold text-xl md:text-2xl leading-normal group-hover:text-blue-500">
                                title
                            </h3>
                            <p className="text-sm leading-6 text-blue-gray-800 group-hover:text-blue-gray-900 line-clamp-3 md:line-clamp-2">
                                description
                            </p>

                            <a href="#" className="w-full">
                                <button
                                    aria-label="Buka Program Unggulan"
                                    className="flex justify-between font-sans-1 items-center text-blue-500 font-bold text-sm hover:bg-blue-100 rounded-lg transition-colors duration-200 py-1 px-2 w-full  "
                                >
                                    Selengkapnya
                                    <div className="flex justify-center items-center w-[20px] h-auto ">
                                        <ScreenShare />
                                    </div>
                                </button>
                            </a>
                        </div>
                    </SwiperSlide>

                    <div className="custom-pagination mt-3 flex justify-center "></div>

                    <div className="swiper-button-prev  opacity-0 md:group-hover/swiper:opacity-100 transition-colors duration-500 ">
                        <ArrowLeft className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                    </div>
                    <div className="swiper-button-next rotate-180 opacity-0 md:group-hover/swiper:opacity-100 transition-colors duration-500  ">
                        <ArrowRight className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedProgram;
