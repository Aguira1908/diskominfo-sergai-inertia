import React, { useEffect, useRef, useState } from "react";
import { ScreenShare, Newspaper } from "lucide-react";

import "../../css/Home.css";
import HeroSection from "../Section/HeroSection";
import NewsSection from "../Section/NewsSection";
import BannerSection from "../Section/BannerSection";
import FeaturedProgram from "../Section/FeaturedProgram";
import QuickAccess from "../Section/QuickAccess";

import useLatestNewsStore from "../Global/useLatesNewsStore";
import LatestNewsCard from "../Modules/LatestNewsCard";
import AgendaSection from "../Section/AgendaSection";
const Home = () => {
    const { newsData, fetchLatestNews } = useLatestNewsStore();

    useEffect(() => {
        fetchLatestNews();
    }, [fetchLatestNews]);
    return (
        <main className="overflow-hidden">
            <div className="relative">
                <div className="w-full">
                    <HeroSection />
                </div>
            </div>

            {/* News Agenda */}
            <section className="relative top-[-12rem] mb-[-12rem] md:top-[-14rem] md:mb-[-14rem] lg:-top-20 lg:-mb-40 z-10 pb-6 md:pb-8 xl:pb-12">
                <div className=" container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                    <div className="w-full h-full p-4 md:p-8 bg-white rounded-xl shadow grid grid-cols-1 xl:grid-cols-[1fr_315px] gap-6">
                        {/* section News */}
                        <section className=" w-full h-full grid grid-cols-1 gap-4 text-slate-700">
                            {/* Header Berita */}
                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 mb-4 items-center">
                                <h1 className=" font-medium text-[28px] md:text-4xl">
                                    Berita Serdang Bedagai
                                </h1>
                                <div className="flex-1 ">
                                    <hr className="border-r border-gray-500 " />
                                </div>
                                <a
                                    href="/berita"
                                    aria-label="Lihat Semua Berita"
                                    className=""
                                >
                                    <div className="flex justify-between items-center hover:text-blue-500 py-2 px-3 font-medium text-sm border hover:border-blue-300 rounded-xl">
                                        <p className="px-2">
                                            Lihat Semua berita
                                        </p>
                                        <div>
                                            <ScreenShare className="w-3 h-auto " />
                                        </div>
                                    </div>
                                </a>
                                {/* Proses Develop */}
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
                            </div>
                            {/* Berita */}
                            <div className="w-full grid grid-cols-1 gap-8 md:grid-rows-1 lg:grid-cols-[1fr_330px]">
                                <div className=" carousel w-full h-[536px] xl:h-full overflow-hidden rounded-lg">
                                    <NewsSection />
                                </div>
                                {/* List Berita Terbaru */}
                                <div className=" w-full h-[518px] grid grid-cols-1 grid-rows-[38px_1fr] gap-4 ">
                                    <div
                                        className="flex items-center border-b-4 border-blue-400 "
                                        aria-hidden="true"
                                    >
                                        <div>
                                            <h1 className="font-bold text-sm">
                                                TERBARU
                                            </h1>
                                        </div>
                                    </div>
                                    <LatestNewsCard />
                                </div>
                            </div>
                        </section>

                        {/* <AgendaSection /> */}
                        <section className=" rounded-md overflow-hidden">
                            <div className="bg-blue-500 text-white px-5 pt-3 pb-4 flex flex-col gap-1">
                                <h2 className="font-bold text-xl">
                                    Agenda Diskominfo Serdang Bedagai
                                </h2>
                                <p className="text-xs">
                                    Ikuti berbagai aktivitas dan agenda resmi
                                    yang berlangsung di Kabupaten Sergai.
                                </p>
                            </div>
                            <AgendaSection />
                        </section>
                    </div>
                </div>
            </section>
            {/* Banner */}
            <section className="py-6 md:py-8 xl:py-12 my-10  ">
                <BannerSection />
            </section>

            {/* Program Unggulan */}
            <section className="py-6 md:py-8 xl:py-12">
                <FeaturedProgram />
            </section>

            {/* Akses Cepat  */}
            <section className="bg-white py-6 md:py-8 xl:py-12 md:px-4 xl:px-16">
                <QuickAccess />
            </section>

            {/* Video Profil */}
            {/* Proses Develop */}
            {/* <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl py-8">
                <h2 className="text-blue-gray-800 text-lg font-bold mb-8">
                    Video Profil
                </h2>
                <div className="flex justify-center items-center">
                    <iframe
                        src="https://www.youtube.com/embed/Qw-r5FeDs9Q?si=ELT5j81X4CPUCv7_"
                        frameBorder="0"
                        className="rounded-xl w-full lg:w-[80%] h-[200px] sm:h-[450px] "
                    ></iframe>
                </div>
            </div> */}
        </main>
    );
};

export default Home;
