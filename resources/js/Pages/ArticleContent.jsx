import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";

import { Mousewheel } from "swiper/modules";
import ArticleContentSection from "../Section/ArticleContentSection";

const ArticleContent = ({ menu, submenu }) => {
    const [currentMenu, setCurrentMenu] = useState({});
    const [menuContent, setMenuContent] = useState([]);

    const [currentSlug, setCurrentSlug] = useState("");

    // Cek Current Menu
    useEffect(() => {
        if (submenu) {
            setCurrentMenu(submenu);
        } else if (menu) {
            setCurrentMenu(menu);
        }
    }, []);

    useEffect(() => {
        const fetchMenuContent = async () => {
            try {
                const response = await axios.get(
                    `/api/contents?menu_slug=${
                        menu?.url_slug || ""
                    }&sub_menu_slug=${submenu?.url_slug || ""}`
                );
                const apiData = response?.data?.data || [];
                setMenuContent(apiData);
            } catch (err) {
                console.log("Failed to fetch Menu", err);
            }
        };

        fetchMenuContent();
    }, []);

    useEffect(() => {
        if (menuContent.length > 0) {
            setCurrentSlug(menuContent[0].slug);
        }
    }, [menuContent]);

    return (
        <div className="relative">
            <section className="h-[450px]">
                <div className="relative w-full h-full overflow-hidden">
                    <div>
                        <img
                            src="/images/diskominfo-sergai.webp"
                            className="w-full h-full absolute top-0 object-cover object-center"
                            alt="berita diskominfo "
                            loading={"lazy"}
                            width={1920}
                            height={740}
                        />
                        <div
                            className="w-full h-full absolute top-0"
                            // style={{
                            //     background:
                            //         "radial-gradient(100% 820.78% at 0% 0%, rgba(0, 60, 150, 0.675) 0%, rgba(4, 36, 84, 0.5625) 61.62%)",
                            // }}
                            style={{
                                background:
                                    "radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)",
                            }}
                        ></div>
                    </div>
                </div>
            </section>
            <section className="w-full min-h-[400px] flex justify-center items-center absolute top-0 z-10">
                <div className="container flex flex-col gap-2 mx-auto px-6 2xl:px-0 xl:max-w-7xl relative pt-24 pb-40 z-10">
                    <h1 className=" text-3xl md:text-5xl font-bold leading-relaxed text-white">
                        {currentMenu.title}
                    </h1>
                    <p className="text-sm line-clamp-2  text-white">
                        {currentMenu.excerpt}
                    </p>
                </div>
            </section>
            <section className="w-full bg-gray-50">
                <div className="container mx-auto px-6 2xl:px-0 xl:max-w-4xl relative -top-24 z-10">
                    <div className="p-3  md:p-4 lg:py-8 lg:px-10 rounded-xl shadow-xl bg-white min-h-[calc(100vh-300px)] w-full">
                        {/* Navigasi dengan Scroll Indicator */}
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
                                {menuContent.map((tab, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="!w-auto"
                                    >
                                        <li
                                            className={`relative min-w-fit h-10 px-4 flex gap-4 items-center justify-between group`}
                                        >
                                            <button
                                                onClick={() =>
                                                    setCurrentSlug(tab.slug)
                                                }
                                            >
                                                <span className="font-semibold text-sm group-hover:text-blue-500">
                                                    {tab.title}
                                                </span>
                                            </button>
                                        </li>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="mx-auto prose lg:prose-xl ">
                            {/* {isLoading && <h1>Memuat...</h1>} */}

                            <ArticleContentSection
                                key={currentSlug}
                                slug={currentSlug}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleContent;
