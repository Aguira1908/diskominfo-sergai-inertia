import React, { useEffect, useRef, useState } from "react";

import { Calendar, PenLine, ArrowRight, ArrowLeft } from "lucide-react";
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
import axios from "axios";

const Berita = () => {
    const swiperRef = useRef(null);

    const newsPerCategory = [
        {
            id: 1,
            title: "Kepala Dinas Kominfo Jabar Adi Komar Melakukan Serah Terima Jabatan dengan Kadiskominfo Jabar Priode 2022-2025 Ika Mardiah",
            image: Image1,
            slug: "kepala-dinas-kominfo-jabar-adi-komar-melakukan-serah-terima-jabatan-dengan-kadiskominfo-jabar-priode-2022-2025-ika-mardiah",
            category_id: 2,
            published_at: "2025-05-13T08:35:44.000000Z",
            created_at: "2025-05-13T08:37:49.000000Z",
            category: {
                id: 2,
                name: "Politik",
                slug: "politik",
            },
        },
        {
            id: 2,
            title: "Gubernur Jabar Resmikan Jalan Tol Baru di Wilayah Selatan",
            image: Image1,
            slug: "gubernur-jabar-resmikan-jalan-tol-baru-di-wilayah-selatan",
            category_id: 2,
            published_at: "2025-05-20T10:15:00.000000Z",
            created_at: "2025-05-20T10:17:30.000000Z",
            category: {
                id: 2,
                name: "Politik",
                slug: "politik",
            },
        },
        {
            id: 3,
            title: "Startup Teknologi Asal Bandung Raup Investasi Rp50 Miliar",
            image: Image1,
            slug: "startup-teknologi-asal-bandung-raup-investasi-rp50-miliar",
            category_id: 3,
            published_at: "2025-06-01T09:00:00.000000Z",
            created_at: "2025-06-01T09:05:00.000000Z",
            category: {
                id: 3,
                name: "Ekonomi",
                slug: "ekonomi",
            },
        },
    ];
    const newsData = [
        {
            id: 1,
            title: "Kepala Dinas Kominfo Jabar Adi Komar Melakukan Serah Terima Jabatan dengan Kadiskominfo Jabar Priode 2022-2025 Ika Mardiah",
            image: Image1,
            slug: "kepala-dinas-kominfo-jabar-adi-komar-melakukan-serah-terima-jabatan-dengan-kadiskominfo-jabar-priode-2022-2025-ika-mardiah",
            category_id: 2,
            published_at: "2025-05-13T08:35:44.000000Z",
            created_at: "2025-05-13T08:37:49.000000Z",
            category: {
                id: 2,
                name: "Politik",
                slug: "politik",
            },
        },
        {
            id: 2,
            title: "Gubernur Jabar Resmikan Jalan Tol Baru di Wilayah Selatan",
            image: Image1,
            slug: "gubernur-jabar-resmikan-jalan-tol-baru-di-wilayah-selatan",
            category_id: 2,
            published_at: "2025-05-20T10:15:00.000000Z",
            created_at: "2025-05-20T10:17:30.000000Z",
            category: {
                id: 2,
                name: "Politik",
                slug: "politik",
            },
        },
        {
            id: 3,
            title: "Startup Teknologi Asal Bandung Raup Investasi Rp50 Miliar",
            image: Image1,
            slug: "startup-teknologi-asal-bandung-raup-investasi-rp50-miliar",
            category_id: 3,
            published_at: "2025-06-01T09:00:00.000000Z",
            created_at: "2025-06-01T09:05:00.000000Z",
            category: {
                id: 3,
                name: "Ekonomi",
                slug: "ekonomi",
            },
        },
    ];
    return (
        <>
            <section className="relative">
                <div className="w-full">
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
                                console.log(news);
                                // console.log(news);
                                if (!news) return null; // Handle jika tidak ada berita

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
                                                                news.latest_news?.published_at // <-- perbaikan di sini
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                        |
                                                        <p className="flex gap-1">
                                                            <PenLine
                                                                className="w-5"
                                                                alt=""
                                                            />
                                                            Penulis:{" "}
                                                            {
                                                                news.latest_news
                                                                    ?.writer
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="div7 md:col-span-4 md:row-start-5 p-1 md:p-4 rounded-lg">
                                                    <div className="flex justify-between flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                                                        <Link
                                                            to={`/artikel/${news.latest_news?.slug}`}
                                                            className="text-sm border border-gray-600 border-opacity-30 px-4  flex items-center rounded-lg"
                                                        >
                                                            Baca Selengkapnya →
                                                        </Link>

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
                                                                    {index + 1}{" "}
                                                                    dari{" "}
                                                                    {
                                                                        newsPerCategory.length
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
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="relative  bg-gray-200 pb-6 md:pb-8 xl:pb-12">
                <div className=" container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                    <div className="w-full shadow-xl h-full p-4 md:px-8 bg-white rounded-xl  grid grid-cols-1  xl:grid-cols-[1fr,315px] gap-6">
                        {/* Latest News By Category */}
                        <h1 className="font-bold text-4xl py-2 text-gray-700">
                            Berita Serdang Bedagai
                        </h1>
                        <section className=" w-full h-full grid grid-cols-1 xl:grid-cols-[800px_1fr] gap-10">
                            {/* Card News */}
                            <div className="w-full grid grid-cols-1 gap-8 grid-rows-1  xl:grid-cols-[1fr,330px]">
                                <div className="w-full h-[536px] overflow-hidden rounded-lg">
                                    <div className="shadow w-full h-full overflow-hidden relative group">
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
                                                                                        News
                                                                                            .category
                                                                                            .name
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
                                                                                            News.date
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
                                                                                            News.writer
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
                                                                                        dari
                                                                                        5
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
                                    </div>
                                </div>
                                <div className="mb-6 mt-7 text-slate-700 flex  flex-col gap-3">
                                    {/* <NewsCard seeNumber={seeNumber} currentNews={currentNews} /> */}
                                </div>
                                <div className="text-slate-700 w-full border-t-2 flex ">
                                    {/* <SeeMore
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        seeNumber={seeNumber}
                        setSeeNumber={setSeeNumber}
                        seeMore={seeMore}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> */}
                                </div>
                            </div>
                            {/* Card News */}
                            {/* <LatestNews LatestNewsFilter={LatestNewsFilter} /> */}
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Berita;
