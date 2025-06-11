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
import axios from "axios";
import SeeMore from "../Modules/SeeMore";
const Berita = () => {
    const swiperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const [seeNumber, setSeeNumber] = useState(5);

    const [currentPage, setCurrentPage] = useState(1);

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
            image: Image1,
            alt: "News 1",
            title: "Pemerintah Luncurkan Paket Stimulus Ekonomi Senilai Rp 10 Triliun untuk UMKM",
            slug: "pemerintah-luncurkan-paket-stimulus-ekonomi-senilai-rp-10-triliun-untuk-umkm",
            category: "Ekonomi",
            content:
                "Paket bantuan ditujukan untuk memulihkan usaha mikro dan kecil yang terdampak resesi global.",
            caption: "Sosialisasi Program UMKM",
            writer: "Diskominfo Tapsel",
            date: "2023-05-05",
        },
        {
            image: Image1,
            alt: "News 2",
            title: "Beasiswa Pendidikan 10.000 Mahasiswa Berprestasi Tahun 2023 Dibuka",
            slug: "beasiswa-pendidikan-10000-mahasiswa-berprestasi-tahun-2023-dibuka",
            category: "Pendidikan",
            content:
                "Program beasiswa mencakup biaya kuliah penuh dan tunjangan hidup bulanan.",
            caption: "Pendaftaran Beasiswa",
            writer: "Diskominfo Tapsel",
            date: "2023-06-10",
        },
        {
            image: Image1,
            alt: "News 3",
            title: "Pembangunan 100 Puskesmas Digital di Daerah Terpencil",
            slug: "pembangunan-100-puskesmas-digital-di-daerah-terpencil",
            category: "Kesehatan",
            content:
                "Fasilitas kesehatan dilengkapi sistem telemedicine dan rekam medis elektronik.",
            caption: "Puskesmas Modern",
            writer: "Diskominfo Tapsel",
            date: "2023-07-15",
        },
        {
            image: Image1,
            alt: "News 4",
            title: "Pembangunan Jalan Tol Trans-Sumatera Tahap III Dimulai",
            slug: "pembangunan-jalan-tol-trans-sumatera-tahap-iii-dimulai",
            category: "Infrastruktur",
            content:
                "Proyek strategis nasional untuk meningkatkan konektivitas logistik.",
            caption: "Pembangunan Infrastruktur",
            writer: "Diskominfo Tapsel",
            date: "2023-08-20",
        },
        {
            image: Image1,
            alt: "News 5",
            title: "Program Subsidi Pupuk untuk Petani Ditingkatkan 25%",
            slug: "program-subsidi-pupuk-untuk-petani-ditingkatkan-25",
            category: "Pertanian",
            content:
                "Bantuan pemerintah untuk meningkatkan produktivitas sektor pertanian.",
            caption: "Distribusi Pupuk",
            writer: "Diskominfo Tapsel",
            date: "2023-09-01",
        },
        {
            image: Image1,
            alt: "News 6",
            title: "Implementasi Sistem Smart City di 15 Kota Besar",
            slug: "implementasi-sistem-smart-city-di-15-kota-besar",
            category: "Teknologi",
            content:
                "Integrasi teknologi IoT untuk manajemen lalu lintas dan sampah.",
            caption: "Kota Cerdas",
            writer: "Diskominfo Tapsel",
            date: "2023-10-12",
        },
        {
            image: Image1,
            alt: "News 7",
            title: "Penambahan Kuota Bansos untuk Lansia dan Disabilitas",
            slug: "penambahan-kuota-bansos-untuk-lansia-dan-disabilitas",
            category: "Sosial",
            content: "Alokasi dana sosial meningkat 15% dari tahun sebelumnya.",
            caption: "Bantuan Sosial",
            writer: "Diskominfo Tapsel",
            date: "2023-11-05",
        },
        {
            image: Image1,
            alt: "News 8",
            title: "Rehabilitasi 500 Hektar Hutan Mangrove di Pesisir Pantai",
            slug: "rehabilitasi-500-hektar-hutan-mangrove-di-pesisir-pantai",
            category: "Lingkungan",
            content:
                "Upaya preventif untuk mengurangi dampak abrasi dan perubahan iklim.",
            caption: "Konservasi Alam",
            writer: "Diskominfo Tapsel",
            date: "2023-12-01",
        },
        {
            image: Image1,
            alt: "News 9",
            title: "Penguatan Satgas Antikorupsi di Sektor Pengadaan Barang",
            slug: "penguatan-satgas-antikorupsi-di-sektor-pengadaan-barang",
            category: "Hukum",
            content:
                "Peningkatan pengawasan terhadap proyek-proyek strategis pemerintah.",
            caption: "Penegakan Hukum",
            writer: "Diskominfo Tapsel",
            date: "2023-05-20",
        },
        {
            image: Image1,
            alt: "News 10",
            title: "Pembangunan PLTS Terbesar di Nusa Tenggara Timur",
            slug: "pembangunan-plts-terbesar-di-nusa-tenggara-timur",
            category: "Energi",
            content:
                "Kapasitas 100MW untuk memenuhi kebutuhan listrik daerah terpencil.",
            caption: "Energi Terbarukan",
            writer: "Diskominfo Tapsel",
            date: "2023-06-25",
        },
        {
            image: Image1,
            alt: "News 11",
            title: "Festival Budaya Danau Toba 2023 Dongkrak Kunjungan Wisatawan",
            slug: "festival-budaya-danau-toba-2023-dongkrak-kunjungan-wisatawan",
            category: "Pariwisata",
            content:
                "Event tahunan ini menampilkan 50 lebih kesenian tradisional Batak.",
            caption: "Pariwisata Budaya",
            writer: "Diskominfo Tapsel",
            date: "2023-09-15",
        },
        {
            image: Image1,
            alt: "News 12",
            title: "Pertumbuhan Ekonomi Tapsel Capai 5.7% di Triwulan III",
            slug: "pertumbuhan-ekonomi-tapsel-capai-57-di-triwulan-iii",
            category: "Ekonomi",
            content:
                "Kenaikan didorong oleh performa sektor pertanian dan pariwisata.",
            caption: "Laporan Ekonomi",
            writer: "Diskominfo Tapsel",
            date: "2023-10-30",
        },
    ];

    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split("?")[1]);

    const selectedCategory = searchParams.get("category") || "Semuanya";

    const filteredNews =
        selectedCategory === "Semuanya"
            ? newsData
            : newsData.filter((item) => item.category === selectedCategory);
    const LatestNewsFilter = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const totalPages = Math.ceil(filteredNews.length / seeNumber);

    const startIndex = (currentPage - 1) * (seeNumber || 5);
    const endIndex = startIndex + (seeNumber || 5);
    const currentNews = filteredNews.slice(startIndex, endIndex);

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
        <div className=" ">
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
                        <div className="flex flex-col">
                            <h1 className="font-bold text-4xl py-2 text-gray-700">
                                Berita Serdang Bedagai
                            </h1>
                            <div className="relative flex justify-center mb-5 border-b-2 border-gray-200">
                                {/* Blur Effect Kiri */}
                                <div className="absolute left-0 md:-left-4 top-0 h-full  w-3 md:w-8 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                {/* Blur Effect Kanan */}
                                <div className="absolute right-0 md:-right-1 top-0 h-full w-3 md:w-8 bg-gradient-to-l from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                <Swiper
                                    slidesPerView="auto"
                                    spaceBetween={50}
                                    centeredSlides={false}
                                    style={{ overflow: "hidden" }}
                                    className="overflow-hidden" // Important untuk membuat slide bisa keluar dari container
                                    breakpoints={{
                                        640: { spaceBetween: 24 },
                                        1024: { spaceBetween: 32 },
                                    }}
                                >
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group ${"border-b-2 border-blue-500 text-blue-500"}`}
                                        >
                                            <Link to={"#"}>
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    Ekonomi
                                                </span>
                                            </Link>
                                        </li>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                        <section className="w-full h-full grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-4 md:gap-10">
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
                                                    console.log(News.slug);
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
                                                                                    to={`berita/${News.slug}`}
                                                                                    className=""
                                                                                    w
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
                                                                            <Link
                                                                                to={`berita/${News.slug}`}
                                                                                className="text-sm border border-gray-600 border-opacity-30 px-4 py-1 flex items-center rounded-lg"
                                                                            >
                                                                                Baca
                                                                                Selengkapnya
                                                                                →
                                                                            </Link>
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
                                <div className="mb-6 mt-7 text-slate-700 ">
                                    <ul>
                                        {currentNews
                                            .slice(0, seeNumber)
                                            .map((News, index) => (
                                                <li
                                                    key={index}
                                                    className="group mb-3 "
                                                >
                                                    <Link
                                                        to="#"
                                                        className="h-fit "
                                                    >
                                                        <article className="flex lg:grid-cols-3 gap-5 my-2 group-hover:bg-gray-100">
                                                            <div className="hidden w-full p-3 overflow-clip rounded-xl  md:block aspect-video">
                                                                <img
                                                                    src={
                                                                        News.image
                                                                    }
                                                                    className="w-full h-full rounded-lg object-cover object-center duration-300 ease-brand group-hover:scale-125"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-3 lg:col-span-2 p-2">
                                                                <h2 className="font-semibold text-lg hover:underline text-gray-900 hover:text-blue-500s">
                                                                    {News.title}
                                                                </h2>
                                                                <div className="text-black/70 font-semibold line-clamp-3">
                                                                    Lorem ipsum
                                                                    dolor sit
                                                                    amet
                                                                    consectetur
                                                                    adipisicing
                                                                    elit. Ex
                                                                    dolor in
                                                                    officiis
                                                                    quam labore,
                                                                    porro
                                                                    corporis
                                                                    dolore modi
                                                                    doloremque
                                                                    id magni
                                                                    molestias,
                                                                    iure
                                                                    provident
                                                                    iste autem
                                                                    quaerat
                                                                    ullam,
                                                                    adipisci
                                                                    eaque
                                                                    excepturi.
                                                                    Suscipit,
                                                                    rem totam
                                                                    adipisci
                                                                    laborum
                                                                    aspernatur
                                                                    quis eaque
                                                                    ea?
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <h3 className="text-xs">
                                                                        <span>
                                                                            {
                                                                                News.category
                                                                            }
                                                                        </span>
                                                                        <span>
                                                                            {" "}
                                                                            |{" "}
                                                                        </span>
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
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="text-slate-700 w-full border-t-2 flex ">
                                    <SeeMore
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        seeNumber={seeNumber}
                                        setSeeNumber={setSeeNumber}
                                        seeMore={seeMore}
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                            </div>
                            {/* Card News */}
                            <div className=" w-[90%] h-[518px] grid grid-cols-1 grid-rows-[38px,1fr] gap-4 ">
                                <button
                                    className="flex items-center border-b-4 border-blue-400 py-2  "
                                    aria-hidden="true"
                                >
                                    <div>
                                        <h1 className="font-bold text-xl text-slate-700">
                                            TERBARU
                                        </h1>
                                    </div>
                                </button>
                                <ul className="  w-full h-full flex flex-col gap-4">
                                    {LatestNewsFilter.slice(0, 4).map(
                                        (News, index) => (
                                            <li
                                                key={index}
                                                className="group p-3 rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500 "
                                            >
                                                <a href="#">
                                                    <div className="flex flex-col gap-3 w-full">
                                                        <h2 className="line-clamp-2 font-medium leading-7 group-hover:text-blue-700">
                                                            {News.title}
                                                        </h2>
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="text-xs">
                                                                <span>
                                                                    {
                                                                        News.category
                                                                    }
                                                                </span>
                                                                <span> | </span>
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
                                                            </h3>
                                                            <ScreenShare className="w-[13px] h-auto hidden group-hover:block text-blue-600" />
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Berita;
