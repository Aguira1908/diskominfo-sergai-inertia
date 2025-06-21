import React, { useEffect, useRef, useState } from "react";
import { Facebook } from "lucide-react";

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

import "../../css/Home.css";
import axios from "axios";

const HeroSection = ({}) => {
    const swiperRef = useRef(null);

    const [config, setConfig] = useState({
        title: "Diskominfo Sergai",
        slogan: "",
        information: "",
        background_urls: [],
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get("/api/configuration");
                const apiData = response?.data || {};
                setConfig({
                    title: apiData.title || "Diskominfo Sergai",
                    slogan: apiData.slogan || "",
                    information: apiData.information || "",
                    background_urls: Array.isArray(apiData.background_urls)
                        ? apiData.background_urls
                        : [],
                });
            } catch (err) {
                console.error("failed to fetch config:", err);
            }
        };

        fetchConfig();
    }, []);

    return (
        <div className="h-[700px] bg-gray-800 ">
            {/* Swiper */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                loop={config.background_urls.length > 1}
                allowTouchMove={false}
                effect={"fade"}
                modules={[EffectFade, Autoplay]}
                className="mySwiper relative w-full h-full overflow-hidden"
            >
                {config.background_urls.map((url, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div>
                                <img
                                    src={url}
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
                            {config.title || "Diskominfo Sergai"}
                        </h1>
                        <h2 className="max-w-[500px] md:max-w-[800px] text-white font-lora font-bold uppercase text-center tracking-tight text-xl leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:leading-relaxed mb-4 md:mb-6 lg:mb-12">
                            {config.slogan}
                        </h2>
                        <p className="text-gray-300  font-medium leading-relaxed text-center max-w-xl lg:max-w-2xl mb-4 md:mb-7 text-sm md:text-base">
                            {config.information}
                        </p>

                        {/* Development */}
                        {/* <ul className="flex justify-between  w-full md:w-[fit-content] max-w-xl mt-4 md:justify-center gap-6 md:mt-0 md:absolute md:h-[740px] md:top-0 md:right-6 md:flex-col">
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
                        </ul> */}
                    </div>
                </div>
            </section>
            <div className="curved"></div>
        </div>
    );
};

export default HeroSection;
