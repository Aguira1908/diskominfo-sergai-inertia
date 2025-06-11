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

    const { newsData, meta, isLoading, fetchNews } = useNewsStore();

    // // fetch Latest per category
    // useEffect(() => {
    //     fetchNews({ page: currentPage, perPage: seeNumber });
    // }, [fetchNews]);

    // console.log(meta);
    // const newsPerCategory = [
    //     {
    //         id: 1,
    //         title: "Kepala Dinas Kominfo Jabar Adi Komar Melakukan Serah Terima Jabatan dengan Kadiskominfo Jabar Priode 2022-2025 Ika Mardiah",
    //         image: Image1,
    //         slug: "kepala-dinas-kominfo-jabar-adi-komar-melakukan-serah-terima-jabatan-dengan-kadiskominfo-jabar-priode-2022-2025-ika-mardiah",
    //         category_id: 2,
    //         published_at: "2025-05-13T08:35:44.000000Z",
    //         created_at: "2025-05-13T08:37:49.000000Z",
    //         category: {
    //             id: 2,
    //             name: "Politik",
    //             slug: "politik",
    //         },
    //     },
    //     {
    //         id: 2,
    //         title: "Gubernur Jabar Resmikan Jalan Tol Baru di Wilayah Selatan",
    //         image: Image1,
    //         slug: "gubernur-jabar-resmikan-jalan-tol-baru-di-wilayah-selatan",
    //         category_id: 2,
    //         published_at: "2025-05-20T10:15:00.000000Z",
    //         created_at: "2025-05-20T10:17:30.000000Z",
    //         category: {
    //             id: 2,
    //             name: "Politik",
    //             slug: "politik",
    //         },
    //     },
    //     {
    //         id: 3,
    //         title: "Startup Teknologi Asal Bandung Raup Investasi Rp50 Miliar",
    //         image: Image1,
    //         slug: "startup-teknologi-asal-bandung-raup-investasi-rp50-miliar",
    //         category_id: 3,
    //         published_at: "2025-06-01T09:00:00.000000Z",
    //         created_at: "2025-06-01T09:05:00.000000Z",
    //         category: {
    //             id: 3,
    //             name: "Ekonomi",
    //             slug: "ekonomi",
    //         },
    //     },
    // ];

    // const newsData = [
    //     {
    //         image: Image1,
    //         alt: "News 1",
    //         title: "Pemerintah Luncurkan Paket Stimulus Ekonomi Senilai Rp 10 Triliun untuk UMKM",
    //         slug: "pemerintah-luncurkan-paket-stimulus-ekonomi-senilai-rp-10-triliun-untuk-umkm",
    //         category: "Ekonomi",
    //         content:
    //             "Paket bantuan ditujukan untuk memulihkan usaha mikro dan kecil yang terdampak resesi global.",
    //         caption: "Sosialisasi Program UMKM",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-05-05",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 2",
    //         title: "Beasiswa Pendidikan 10.000 Mahasiswa Berprestasi Tahun 2023 Dibuka",
    //         slug: "beasiswa-pendidikan-10000-mahasiswa-berprestasi-tahun-2023-dibuka",
    //         category: "Pendidikan",
    //         content:
    //             "Program beasiswa mencakup biaya kuliah penuh dan tunjangan hidup bulanan.",
    //         caption: "Pendaftaran Beasiswa",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-06-10",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 3",
    //         title: "Pembangunan 100 Puskesmas Digital di Daerah Terpencil",
    //         slug: "pembangunan-100-puskesmas-digital-di-daerah-terpencil",
    //         category: "Kesehatan",
    //         content:
    //             "Fasilitas kesehatan dilengkapi sistem telemedicine dan rekam medis elektronik.",
    //         caption: "Puskesmas Modern",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-07-15",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 4",
    //         title: "Pembangunan Jalan Tol Trans-Sumatera Tahap III Dimulai",
    //         slug: "pembangunan-jalan-tol-trans-sumatera-tahap-iii-dimulai",
    //         category: "Infrastruktur",
    //         content:
    //             "Proyek strategis nasional untuk meningkatkan konektivitas logistik.",
    //         caption: "Pembangunan Infrastruktur",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-08-20",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 5",
    //         title: "Program Subsidi Pupuk untuk Petani Ditingkatkan 25%",
    //         slug: "program-subsidi-pupuk-untuk-petani-ditingkatkan-25",
    //         category: "Pertanian",
    //         content:
    //             "Bantuan pemerintah untuk meningkatkan produktivitas sektor pertanian.",
    //         caption: "Distribusi Pupuk",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-09-01",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 6",
    //         title: "Implementasi Sistem Smart City di 15 Kota Besar",
    //         slug: "implementasi-sistem-smart-city-di-15-kota-besar",
    //         category: "Teknologi",
    //         content:
    //             "Integrasi teknologi IoT untuk manajemen lalu lintas dan sampah.",
    //         caption: "Kota Cerdas",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-10-12",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 7",
    //         title: "Penambahan Kuota Bansos untuk Lansia dan Disabilitas",
    //         slug: "penambahan-kuota-bansos-untuk-lansia-dan-disabilitas",
    //         category: "Sosial",
    //         content: "Alokasi dana sosial meningkat 15% dari tahun sebelumnya.",
    //         caption: "Bantuan Sosial",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-11-05",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 8",
    //         title: "Rehabilitasi 500 Hektar Hutan Mangrove di Pesisir Pantai",
    //         slug: "rehabilitasi-500-hektar-hutan-mangrove-di-pesisir-pantai",
    //         category: "Lingkungan",
    //         content:
    //             "Upaya preventif untuk mengurangi dampak abrasi dan perubahan iklim.",
    //         caption: "Konservasi Alam",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-12-01",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 9",
    //         title: "Penguatan Satgas Antikorupsi di Sektor Pengadaan Barang",
    //         slug: "penguatan-satgas-antikorupsi-di-sektor-pengadaan-barang",
    //         category: "Hukum",
    //         content:
    //             "Peningkatan pengawasan terhadap proyek-proyek strategis pemerintah.",
    //         caption: "Penegakan Hukum",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-05-20",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 10",
    //         title: "Pembangunan PLTS Terbesar di Nusa Tenggara Timur",
    //         slug: "pembangunan-plts-terbesar-di-nusa-tenggara-timur",
    //         category: "Energi",
    //         content:
    //             "Kapasitas 100MW untuk memenuhi kebutuhan listrik daerah terpencil.",
    //         caption: "Energi Terbarukan",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-06-25",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 11",
    //         title: "Festival Budaya Danau Toba 2023 Dongkrak Kunjungan Wisatawan",
    //         slug: "festival-budaya-danau-toba-2023-dongkrak-kunjungan-wisatawan",
    //         category: "Pariwisata",
    //         content:
    //             "Event tahunan ini menampilkan 50 lebih kesenian tradisional Batak.",
    //         caption: "Pariwisata Budaya",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-09-15",
    //     },
    //     {
    //         image: Image1,
    //         alt: "News 12",
    //         title: "Pertumbuhan Ekonomi Tapsel Capai 5.7% di Triwulan III",
    //         slug: "pertumbuhan-ekonomi-tapsel-capai-57-di-triwulan-iii",
    //         category: "Ekonomi",
    //         content:
    //             "Kenaikan didorong oleh performa sektor pertanian dan pariwisata.",
    //         caption: "Laporan Ekonomi",
    //         writer: "Diskominfo Tapsel",
    //         date: "2023-10-30",
    //     },
    // ];

    // const { url } = usePage();
    // const searchParams = new URLSearchParams(url.split("?")[1]);

    // const selectedCategory = searchParams.get("category") || "Semuanya";

    // const filteredNews =
    //     selectedCategory === "Semuanya"
    //         ? newsData
    //         : newsData.filter((item) => item.category === selectedCategory);
    const LatestNewsFilter = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // const totalPages = Math.ceil(filteredNews.length / seeNumber);

    // const startIndex = (currentPage - 1) * (seeNumber || 5);
    // const endIndex = startIndex + (seeNumber || 5);
    // const currentNews = filteredNews.slice(startIndex, endIndex);

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
                            <h1 className="font-bold text-4xl py-2 text-gray-700">
                                Berita Serdang Bedagai
                            </h1>
                            <div className="relative flex justify-center mb-5 border-b-2 border-gray-200">
                                {/* Blur Effect Kiri */}
                                <div className="absolute left-0 md:-left-4 top-0 h-full  w-3 md:w-8 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                {/* Blur Effect Kanan */}
                                <div className="absolute right-0 md:-right-1 top-0 h-full w-3 md:w-8 bg-gradient-to-l from-white via-white/80 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

                                <CarouselCategorySection
                                    categoryHandler={setCategory}
                                    activeCategory={category}
                                />
                            </div>
                        </div>
                        <section className="w-full h-full grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-4 md:gap-10">
                            {/* Card News */}
                            <div className="w-full grid grid-cols-1 gap-8 grid-rows-1  xl:grid-cols-[1fr,330px]">
                                <div className="w-full h-[536px] overflow-hidden rounded-lg">
                                    <NewsCardSection newsData={newsData} />
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
                            <div className=" w-[90%] h-[518px] grid grid-cols-1 grid-rows-[38px,1fr] gap-4">
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
                                <LatestNewsCard />
                                {/* <ul className="  w-full h-full flex flex-col gap-4">
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
                                </ul> */}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Berita;
