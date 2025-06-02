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

import { Link } from "@inertiajs/react";
import axios from "axios";

// import Image1 from "../../../public/storage/news-images/01JRX6J0ZZGQXCPBCD7JJYK4PQ.webp";
// import Image2 from "../../../public/storage/news-images/01JRX6M0PXENEVHT9SPWMH1YC6.jpeg";
// import Image3 from "../../../public/storage/news-images/01JRZHKAH1DXYN9ME9GK0PGKMX.jpg";

// import Slide1 from "../../../public/storage/slideshow/slide1.webp";
// import Slide2 from "../../../public/storage/slideshow/slide2.webp";
// import Slide3 from "../../../public/storage/slideshow/slide3.webp";
// import Slide4 from "../../../public/storage/slideshow/slide4.webp";

import "../../css/Home.css";
import Banner from "../Modules/Banner";
import HeroSection from "../Section/HeroSection";
import NewsSection from "../Section/NewsSection";
import BannerSection from "../Section/BannerSection";
import FeaturedProgram from "../Section/FeaturedProgram";

const Home = () => {
    const swiperRef = useRef(null);
    const [categoriesWithNews, setCategoriesWithNews] = useState(null);

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
                                    href="#"
                                    aria-label="Lihat Semua Berita"
                                    className=""
                                >
                                    <button className="flex justify-between items-center text-blue-500 py-2 px-3 font-medium text-sm border border-blue-300 rounded-xl">
                                        <p className="px-2">
                                            Lihat Semua berita
                                        </p>
                                        <div>
                                            <ScreenShare className="w-3 h-auto " />
                                        </div>
                                    </button>
                                </a>
                            </div>
                            {/* Berita */}
                            <div className="bg-sky-300w-full grid grid-cols-1 gap-8 md:grid-rows-1 lg:grid-cols-[1fr_330px]">
                                <div className=" carousel w-full h-[536px] overflow-hidden rounded-lg">
                                    {/* <NewsSection /> */}
                                </div>
                                {/* List Berita Terbaru */}
                                <div className=" w-full h-[518px] grid grid-cols-1 grid-rows-[38px_1fr] gap-4 ">
                                    <button
                                        className="flex items-center border-b-4 border-blue-400 "
                                        aria-hidden="true"
                                    >
                                        <div>
                                            <h1 className="font-bold text-sm">
                                                TERBARU
                                            </h1>
                                        </div>
                                    </button>
                                    <ul className="  w-full h-full flex flex-col gap-4">
                                        <li className="group p-3 rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500 ">
                                            <a href="#">
                                                <div className="flex flex-col gap-3 w-full">
                                                    <h2 className="line-clamp-2 font-medium leading-7 group-hover:text-blue-700">
                                                        Lorem, ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit. Quae
                                                        incidunt unde officiis
                                                        commodi harum delectus
                                                        excepturi eveniet cumque
                                                        ut nam?
                                                    </h2>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-xs">
                                                            <span>
                                                                category
                                                            </span>
                                                            <span> | </span>
                                                            <span>Tanggal</span>
                                                        </h3>
                                                        <ScreenShare className="w-[13px] h-auto hidden group-hover:block" />
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
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
                                    Dapatkan informasi terkait semua kegiatan
                                    yang dilakukan di Jawa Barat.
                                </p>
                            </div>
                            <div className="rounded-br-md rounded-bl-md pt-3 flex-grow bg-white border border-blue-gray-50 overflow-hidden">
                                <div className=" flex flex-col gap-6">
                                    <div className="px-4 text-slate-600 ">
                                        <p className="font-bold text-sm mb-1">
                                            monthName year
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Minggu Ke weekNumber
                                        </p>
                                    </div>
                                    <div className="relative w-full h-fit">
                                        <div className="flex w-full relative  flex-row items-center">
                                            <Swiper
                                                className="mySwiper  w-[70%]"
                                                slidesPerView={4}
                                                slidesPerGroup={4}
                                                speed={1000}
                                                navigation={{
                                                    nextEl: ".custom-next",
                                                    prevEl: ".custom-prev", // Gunakan class kustom
                                                }}
                                                modules={[
                                                    Navigation,
                                                    Mousewheel,
                                                ]}
                                            >
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                            <div className="custom-prev   absolute left-2 top-1/2 -translate-y-1/2 z-10 ">
                                                <ArrowLeft className="w-6 h-6" />
                                            </div>
                                            <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10">
                                                <ArrowRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[470px] md:h-[380px] xl:h-[470px] bg-white flex flex-col items-center justify-center overflow-hidden ml-5 mr-4">
                                        <div className="px-4">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 pb-5">
                                                <CalendarX2 className="w-[100px]  " />
                                                <div className="w-full leading-6 text-center">
                                                    <p className="text-base font-bold text-blue-gray-500 max-w-[20ch] mx-auto mb-2">
                                                        Tidak ada kegiatan/event
                                                        di hari ini
                                                    </p>
                                                    <p className="text-xs  text-gray-500">
                                                        Silahkan Lihat tanggal
                                                        sebelum atau selanjutnya
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                    <ul className="grid md:grid-cols-3 md:grid-rows-[auto,1fr] md:gap-x-6 lg:gap-x-20 gap-y-6 lg:gap-y-12">
                        <li className="md:row-start-1 md:col-start-1 md:col-end-4 lg:row-start-auto lg:col-start-auto lg:col-end-auto flex flex-col gap-2 lg:gap-6">
                            <h2 className="text-2xl text-center lg:text-left md:text-4xl font-medium leading-loose">
                                Akses Cepat
                            </h2>
                            <p className="text-center lg:text-left text-sm text-gray-600 leading-6">
                                Dapatkan kemudahaan akses ke beberapa layanan
                                Pemerintah Provinsi Jawa Barat untuk kebutuhan
                                Anda.
                            </p>
                        </li>
                        <li className="group px-4 py-3 rounded-md hover:bg-blue-50 transition-colors ease-in-out duration-250">
                            <a
                                href="#"
                                className="flex flex-col gap-4"
                                aria-label={`Buka `}
                            >
                                <img
                                    src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                    alt="gambar"
                                    loading="lazy"
                                    className="lazy-img w-fit h-10"
                                />

                                <p className="font-roboto font-bold group-hover:text-blue-700">
                                    PPID
                                </p>
                                <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                                    Ajukan permohonan informasi kepada Pejabat
                                    Pengelola Informasi dan Dokumentasi untuk
                                    mendapatkan informasi terkini dan terakurat
                                    seputar Diskominfo Jawa Barat
                                </p>
                            </a>
                        </li>
                        <li className="group px-4 py-3 rounded-md hover:bg-blue-50 transition-colors ease-in-out duration-250">
                            <a
                                href="#"
                                className="flex flex-col gap-4"
                                aria-label={`Buka `}
                            >
                                <img
                                    src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                    alt="gambar"
                                    loading="lazy"
                                    className="lazy-img w-fit h-10"
                                />

                                <p className="font-roboto font-bold group-hover:text-blue-700">
                                    SPAN Lapor
                                </p>
                                <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                                    Sampaikan aspirasi dan pengaduan terkait
                                    permasalahan anda melalui saluran resmi
                                    Pemerintah Pusat.
                                </p>
                            </a>
                        </li>
                        <li className="group px-4 py-3 rounded-md hover:bg-blue-50 transition-colors ease-in-out duration-250">
                            <a
                                href="#"
                                className="flex flex-col gap-4"
                                aria-label={`Buka `}
                            >
                                <img
                                    src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                                    alt="gambar"
                                    loading="lazy"
                                    className="lazy-img w-fit h-10"
                                />

                                <p className="font-roboto font-bold group-hover:text-blue-700">
                                    Service Desk
                                </p>
                                <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                                    Akses berbagai layanan Diskominfo Jabar.
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Video Profil */}
            <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl py-8">
                <h2 className="text-blue-gray-800 text-lg font-bold mb-8">
                    Video Profil
                </h2>
                <div className="flex justify-center items-center">
                    {/* <iframe
                        src="https://www.youtube.com/embed/Qw-r5FeDs9Q?si=ELT5j81X4CPUCv7_"
                        frameBorder="0"
                        className="rounded-xl w-full lg:w-[80%] h-[200px] sm:h-[450px] "
                    ></iframe> */}
                </div>
            </div>
        </main>
    );
};

export default Home;
