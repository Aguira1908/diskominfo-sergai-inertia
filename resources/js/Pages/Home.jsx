import React, { useEffect, useRef, useState } from "react";
import {
    Facebook,
    ScreenShare,
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay, Mousewheel } from "swiper/modules";

import { Link } from "@inertiajs/react";
import axios from "axios";

import Image1 from "../../../public/storage/news-images/01JRX6J0ZZGQXCPBCD7JJYK4PQ.webp";
import Image2 from "../../../public/storage/news-images/01JRX6M0PXENEVHT9SPWMH1YC6.jpeg";
import Image3 from "../../../public/storage/news-images/01JRZHKAH1DXYN9ME9GK0PGKMX.jpg";

import "../../css/Home.css";

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
            <section className="relative top-[-12rem] mb-[-12rem] md:top-[-14rem] md:mb-[-14rem] lg:-top-30 lg:-mb-40 z-10 pb-6 md:pb-8 xl:pb-12">
                <div className=" container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                    <div className="w-full h-full p-4 md:p-8 bg-white rounded-xl shadow grid grid-cols-1 xl:grid-cols-[1fr,315px] gap-6">
                        {/* section News */}
                        <section className=" w-full h-full grid grid-cols-1 gap-4 text-slate-700">
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
                                    <div className="flex justify-between items-center text-blue-500 py-2 px-3 font-medium text-sm border border-blue-300 rounded-xl">
                                        <p className="px-2">
                                            Lihat Semua berita
                                        </p>
                                        <div>
                                            <ScreenShare className="w-3 h-auto " />
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {/* Berita */}
                            {/* Card News */}
                            <div className="bg-sky-300w-full grid grid-cols-2 gap-8 md:grid-rows-1 lg:grid-cols-[1fr,330px]">
                                <div className=" carousel w-full h-[536px] overflow-hidden rounded-lg">
                                    <div className="carousel w-full h-full overflow-hidden relative group">
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
                                            {newsData?.map((news, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="w-full h-full group">
                                                            <img
                                                                src={news.image}
                                                                alt=""
                                                                className="w-full h-full absolute top-0 object-cover object-center"
                                                            />
                                                            <div className=" visible inline-block h-[67%] md:h-[50%] absolute bottom-0 w-full bg-black/40 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg px-8 py-6 text-white">
                                                                <div className="flex flex-col h-full">
                                                                    <div className="flex-grow flex flex-col h-auto justify-between">
                                                                        <div>
                                                                            <p className="font-roboto text-sm uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                                                                                {
                                                                                    news.category
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
                                                                                        news.title
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
                                                                                        news.tanggal
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
                                                                                        news.penulis
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
                                                                                    className="w-[25px] h-auto"
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
                                    </div>
                                </div>
                                {/* Latest News */}
                                <div className="h-full   gap-4">
                                    <button
                                        className="flex w-full p-3  items-center border-b-4 border-blue-400 "
                                        aria-hidden="true"
                                    >
                                        <h1 className="font-bold text-sm">
                                            TERBARU
                                        </h1>
                                    </button>
                                    <ul className="  w-full h-full flex flex-col gap-4">
                                        <li className="group p-3 rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500 ">
                                            <a
                                                href={`berita/`}
                                                aria-label="Buka Berita Terbaru Berikut"
                                            >
                                                <div className="flex flex-col gap-3 w-full">
                                                    <h2 className="line-clamp-2 font-medium leading-7 group-hover:text-blue-700">
                                                        Title
                                                    </h2>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-xs">
                                                            <span>
                                                                category
                                                            </span>
                                                            <span> | </span>
                                                            <span>
                                                                formattedDate
                                                            </span>
                                                        </h3>
                                                        <ScreenShare className="w-[13px] h-auto hidden group-hover:block" />
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Agenda */}
                            </div>
                        </section>
                        {/* Agenda */}
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
                                            Februari 2024
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Minggu Ke 4
                                        </p>
                                    </div>
                                    <div className="relative w-full">
                                        <div className="flex w-full flex-row items-center">
                                            <Swiper
                                                className="mySwiper w-[70%]"
                                                slidesPerView={4}
                                                slidesPerGroup={4}
                                                speed={1000}
                                                navigation={{
                                                    nextEl: ".swiper-button-next",
                                                    prevEl: ".swiper-button-prev",
                                                }}
                                                modules={[
                                                    Autoplay,
                                                    Navigation,
                                                    Mousewheel,
                                                ]}
                                            >
                                                <SwiperSlide>
                                                    <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250">
                                                        <div className="uppercase text-[10px]  ">
                                                            hari
                                                        </div>
                                                        <div className="font-medium text-sm ">
                                                            tanggal
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                            <div className="swiper-button-prev  left-0 ">
                                                <ArrowLeft />
                                            </div>
                                            <div className="swiper-button-next  right-0 rotate-180   ">
                                                <ArrowRight />
                                            </div>
                                        </div>
                                    </div>

                                    {/*Event */}
                                    <div>No Event</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
