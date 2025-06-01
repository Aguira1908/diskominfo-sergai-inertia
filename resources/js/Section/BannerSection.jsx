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

const BannerSection = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get("/api/banners");
                const apiData = response.data?.data || {};
                setBanners(apiData);
            } catch (err) {
                console.log("Failed to fetch banner", err);
            }
        };

        fetchBanner();
    }, []);
    console.log(banners);
    return (
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
                {banners.map((banner, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
                                <picture>
                                    <img
                                        src={banner.image_url}
                                        alt=""
                                        width="360"
                                        height="120"
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className="custom-pagination mt-3 flex justify-center"></div>
                <div className="custom-prev   absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowLeft className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                </div>
                <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="bg-white border border-blue-400 w-full h-auto rounded-full" />
                </div>
            </Swiper>
        </div>
    );
};

export default BannerSection;
