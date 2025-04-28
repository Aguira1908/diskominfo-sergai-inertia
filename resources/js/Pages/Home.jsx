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

import Image1 from "../../../public/storage/news-images/01JRX6J0ZZGQXCPBCD7JJYK4PQ.webp";
import Image2 from "../../../public/storage/news-images/01JRX6M0PXENEVHT9SPWMH1YC6.jpeg";
import Image3 from "../../../public/storage/news-images/01JRZHKAH1DXYN9ME9GK0PGKMX.jpg";

import Slide1 from "../../../public/storage/slideshow/slide1.webp";
import Slide2 from "../../../public/storage/slideshow/slide2.webp";
import Slide3 from "../../../public/storage/slideshow/slide3.webp";
import Slide4 from "../../../public/storage/slideshow/slide4.webp";

import "../../css/Home.css";
import Banner from "../Modules/Banner";

const Home = () => {
    const swiperRef = useRef(null);
    const [categoriesWithNews, setCategoriesWithNews] = useState(null);

    // Data dummy berita
    const newsData = [
        {
            id: 1,
            title: "Teknologi AI Terbaru Ubah Cara Kerja Perusahaan",
            image: Image1,
            penulis: "Ahmad Fauzi",
            tanggal: "15 April 2024",
            category: "Pemerintah",
        },
        {
            id: 2,
            title: "Pemerintah Umumkan Stimulus Ekonomi untuk UMKM",
            image: Image2,
            penulis: "Rina Wijaya",
            tanggal: "10 April 2024",
            category: "Pemerintah",
        },
        {
            id: 3,
            title: "Prediksi Harga Emas Naik 20% di Kuartal Kedua",
            image: Image3,
            penulis: "Budi Santoso",
            tanggal: "5 April 2024",
            category: "Pemerintah",
        },
    ];
    return (
        <main className="overflow-hidden">
            <div className="relative">
                <div className="w-full">
                    <div className="h-[700px] bg-gray-800 ">
                        {/* Swiper */}
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
                            {newsData?.map((news, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div>
                                            <img
                                                src={news.image}
                                                alt="image"
                                                className="w-full h-full absolute top-0 object-cover object-center"
                                                width={1920}
                                                height={740}
                                            />
                                            <div
                                                className="w-full h-full absolute top-0"
                                                style={{
                                                    background:
                                                        "radial-gradient(100% 820.78% at 0% 0%, rgba(0, 60, 150, 0.675) 0%, rgba(4, 36, 84, 0.5625) 61.62%)",
                                                }}
                                            ></div>
                                        </div>
                                        {/* Carousel Image */}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <section className=" font-[times-new-roman] flex justify-center items-center w-full absolute top-10 z-10 min-h-[740px]">
                            <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                                <div
                                    className="background_section_1 flex flex-col items-center -mt-20 bg-no-repeat py-3  bg-contain"
                                    style={{
                                        backgroundImage: `url()`,
                                    }}
                                >
                                    <h1 className="lg:pt-5 text-white font-lora uppercase leading-normal text-center tracking-tight text-2xl md:text-4xl lg:text-[42px] mb-2 md:mb-3 lg:mb-2">
                                        Diskominfo Sergai
                                    </h1>
                                    <h2 className="max-w-[500px] md:max-w-[800px] text-white font-lora font-bold uppercase text-center tracking-tight text-xl leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:leading-relaxed mb-4 md:mb-6 lg:mb-12">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Nulla, beatae?
                                    </h2>
                                    <p className="text-gray-300  font-medium leading-relaxed text-center max-w-xl lg:max-w-2xl mb-4 md:mb-7 text-sm md:text-base">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ratione dolore facere
                                        dignissimos delectus fugiat a quae
                                        laudantium voluptatem praesentium
                                        possimus?
                                    </p>

                                    <ul className="flex w-full md:w-[fit-content] max-w-xl mt-4 justify-between md:justify-center gap-6 md:mt-0 md:absolute md:h-[740px] md:top-0 md:right-6 md:flex-col">
                                        <a
                                            href="#"
                                            className="bg-gray-200/10 rounded-xl flex justify-center items-center p-3"
                                        >
                                            <div
                                                aria-hidden="true"
                                                className=" flex justify-center items-center text-white group-hover:opacity-100 md:opacity-40"
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                }}
                                            >
                                                <Facebook className="opacity-50 " />
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <div className="curved"></div>
                    </div>
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
                                    <div className="carousel w-full h-full overflow-hidden relative group">
                                        {/* Image Section Start*/}
                                        {/* Banner Berita */}
                                        <Swiper
                                            onSwiper={(swiper) =>
                                                (swiperRef.current = swiper)
                                            }
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
                                            {newsData
                                                .slice(0, 5)
                                                .map((News, index) => {
                                                    console.log(News);
                                                    return (
                                                        <SwiperSlide
                                                            key={index}
                                                        >
                                                            <div className="w-full h-full group">
                                                                <img
                                                                    src={
                                                                        News.image
                                                                    }
                                                                    alt=""
                                                                    className="w-full h-full absolute top-0 object-cover object-center"
                                                                />
                                                                <div className=" visible inline-block h-[67%] md:h-[50%] absolute bottom-0 w-full bg-black/40 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white">
                                                                    <div className="flex flex-col h-full">
                                                                        <div className="flex-grow flex flex-col h-auto justify-between">
                                                                            <div>
                                                                                <p className="font-roboto text-sm uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                                                                                    {
                                                                                        News.category
                                                                                    }
                                                                                </p>
                                                                                <Link
                                                                                    to={
                                                                                        "#"
                                                                                    }
                                                                                    className=""
                                                                                >
                                                                                    <h2 className="line-clamp-3 md:line-clamp-2 font-intro font-extrabold text-xl md:text-2xl leading-9 md:leading-10 max-h-[108px] md:max-h-[90px] mb-3">
                                                                                        {
                                                                                            News.title
                                                                                        }
                                                                                    </h2>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="flex mb-5 flex-col md:flex-row gap-2 opacity-60 text-xs md:divide-x divide-white">
                                                                                <p className="flex items-center gap-2 md:pr-2">
                                                                                    <img
                                                                                        src={
                                                                                            Calendar
                                                                                        }
                                                                                        width="16px"
                                                                                        height="16px"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    <span>
                                                                                        {new Date(
                                                                                            News.tanggal
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
                                                                                        Penulis
                                                                                        :{" "}
                                                                                        {
                                                                                            News.penulis
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        {/* Footer News */}
                                                                        <div className="md:flex justify-between items-center">
                                                                            <a
                                                                                href="#"
                                                                                className="text-sm border border-gray-600 border-opacity-30 px-4 py-1 flex items-center rounded-lg"
                                                                            >
                                                                                Baca
                                                                                Selengkapnya
                                                                                →
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
                                                                                        {index +
                                                                                            1}{" "}
                                                                                        dari{" "}
                                                                                        {
                                                                                            newsData.length
                                                                                        }
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
                                        {/* Image Section End */}
                                    </div>
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
                <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl max-w-full xl:px-6 group">
                    <Swiper
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        mousewheel={true}
                        spaceBetween={30}
                        pagination={{
                            el: ".custom-pagination",
                            clickable: true,
                        }}
                        effect="slide"
                        loop={true}
                        speed={1500}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev", // Gunakan class kustom
                        }}
                        modules={[Pagination, Autoplay, Navigation, Mousewheel]}
                        className="mySwiper relative"
                        breakpoints={{
                            641: {
                                slidesPerView: 1,
                                allowTouchMove: true,
                            },
                            1024: {
                                slidesPerView: 1.2,
                                allowTouchMove: true,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="w-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
                                <picture>
                                    <img
                                        src={Slide1}
                                        alt=""
                                        width="360"
                                        height="120"
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
                                <picture>
                                    <img
                                        src={Slide2}
                                        alt=""
                                        width="360"
                                        height="120"
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
                                <picture>
                                    <img
                                        src={Slide3}
                                        alt=""
                                        width="360"
                                        height="120"
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>

                        <div className="custom-pagination mt-3 flex justify-center"></div>
                        <div className="custom-prev   absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                            <ArrowLeft className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                        </div>
                        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                            <ArrowRight className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                        </div>
                    </Swiper>
                </div>
            </section>

            {/* Program Unggulan */}
            <section className="py-6 md:py-8 xl:py-12">
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
                            <SwiperSlide>
                                <div className="h-[253px] md:h-[234px] flex flex-col items-start gap-4 group bg-white p-6 rounded-xl border border-white hover:border-blue-400 hover:shadow-md transition-colors  duration-300">
                                    <img
                                        src="#"
                                        className=" h-[32px] "
                                        alt=""
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
                                        src="#"
                                        className=" h-[32px] "
                                        alt=""
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
                                    src=""
                                    alt=""
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
                                    src=""
                                    alt=""
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
                                    src=""
                                    alt=""
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
                    <iframe
                        src="https://www.youtube.com/embed/Qw-r5FeDs9Q?si=ELT5j81X4CPUCv7_"
                        frameBorder="0"
                        className="rounded-xl w-full lg:w-[80%] h-[200px] sm:h-[450px] "
                    ></iframe>
                </div>
            </div>
        </main>
    );
};

export default Home;
