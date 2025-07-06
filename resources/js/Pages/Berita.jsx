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
import SeeMore from "../Modules/SeeMore";
import HeroNewsSection from "../Section/HeroNewsSection";
import CarouselCategorySection from "../Section/CarouselCategorySection";
import NewsCardSection from "../Section/NewsCardSection";
import LatestNewsCard from "../Modules/LatestNewsCard";
import useNewsStore from "../Global/useNewsStore";
import AllNewsSection from "../Section/AllNewsSection";
const Berita = () => {
    const swiperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState(false);
    const [seeNumber, setSeeNumber] = useState(5);

    const [currentPage, setCurrentPage] = useState(1);

    const { meta } = useNewsStore();

    const seeMore = [
        {
            number: 10,
        },
        {
            number: 15,
        },
        {
            number: 20,
        },
    ];
    return (
        <div className="">
            <section className="relative">
                <div className="w-full">
                    <HeroNewsSection />
                </div>
            </section>
            <section className="relative  bg-gray-200 pb-6 md:pb-8 xl:pb-12">
                <div className=" container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                    <div className="w-full shadow-xl h-full p-4 md:px-8 bg-white rounded-xl  grid grid-cols-1  xl:grid-cols-[1fr,315px] gap-6">
                        {/* Latest News By Category */}
                        <div className="flex flex-col">
                            {/* <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center ">
                                <h1 className="font-bold text-4xl py-2 text-gray-700 mb-8">
                                    Berita Serdang Bedagai
                                </h1>
                                <span className="border-1 border-gray-500/50"></span>

                                <a
                                    href={`/summarize`}
                                    aria-label="Lihat Semua Berita"
                                    className=""
                                >
                                    <div className="flex justify-between items-center  py-2 px-3 font-medium text-sm border bg-blue-500 hover:bg-blue-600 border-blue-400 text-white rounded-xl">
                                        <p className="px-2">
                                            Lihat Ringkasan Berita
                                        </p>
                                        <div>
                                            <Newspaper className="w-3 h-auto " />
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 mb-8 py-5 items-center">
                                <h1 className=" font-bold py-2 text-4xl">
                                    Berita Serdang Bedagai
                                </h1>
                                <span className=" flex-1 "></span>

                                {/* Proses Develop */}
                                <a
                                    href={`/summarize`}
                                    aria-label="Lihat Semua Berita"
                                    className="py-2"
                                >
                                    <div className="flex justify-between items-center  py-2 px-3 font-medium text-sm border bg-blue-500 hover:bg-blue-600 border-blue-400 text-white rounded-xl">
                                        <p className="px-2">
                                            Lihat Ringkasan Berita
                                        </p>
                                        <div>
                                            <Newspaper className="w-3 h-auto " />
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="relative flex justify-center mb-5  border-gray-200">
                                {/* Blur Effect Kiri */}
                                <div className="absolute left-0 md:-left-7 top-0 h-full  w-3 md:w-8 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                {/* Blur Effect Kanan */}
                                <div className="absolute right-0 md:-right-3 top-0 h-full w-3 md:w-8 bg-gradient-to-l from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                <CarouselCategorySection
                                    categoryHandler={setCategory}
                                    activeCategory={category}
                                />
                            </div>
                            <span className="border-b border-gray-500/20"></span>
                        </div>
                        <section className="w-full h-full grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-4 md:gap-10">
                            {/* Card News */}
                            <div className="w-full grid grid-cols-1 gap-8 grid-rows-1  xl:grid-cols-[1fr,330px]">
                                <div className="w-full h-[536px] overflow-hidden rounded-lg">
                                    <NewsCardSection />
                                </div>
                                <div className="mb-6 mt-7 text-slate-700 ">
                                    <AllNewsSection
                                        currentCategory={category}
                                        curPage={currentPage}
                                        seeMore={seeNumber}
                                    />
                                </div>
                                <div className="text-slate-700 w-full border-t-2 flex ">
                                    <SeeMore
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        seeNumber={seeNumber}
                                        setSeeNumber={setSeeNumber}
                                        seeMore={seeMore}
                                        totalPages={
                                            Math.ceil(meta.total / seeNumber) ||
                                            0
                                        }
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                            </div>
                            {/* Card News */}
                            <div className="w-full xl:w-[90%] relative h-full xl:h-[518px] grid grid-cols-1 grid-rows-[38px_1fr] gap-4">
                                <div
                                    className="flex items-center border-b-4 border-blue-400 py-2  "
                                    aria-hidden="true"
                                >
                                    <div>
                                        <h1 className="font-bold text-xl text-slate-700">
                                            TERBARU
                                        </h1>
                                    </div>
                                </div>
                                <LatestNewsCard />
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Berita;
