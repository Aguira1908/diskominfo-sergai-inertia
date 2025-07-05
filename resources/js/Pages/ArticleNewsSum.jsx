import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";
import { SanitizeData } from "../Global/useSanitizeData";
import { Mousewheel } from "swiper/modules";
import ArticleContentSection from "../Section/ArticleContentSection";
const ArticleNewsSum = () => {
    const [newsSum, setNewsSUm] = useState({});

    useEffect(() => {
        const fetchNewsSum = async () => {
            try {
                const response = await axios.get("/api/summarize");
                // console.log(response);
                const cleanData = SanitizeData(response?.data || []);
                setNewsSUm(cleanData);
            } catch (err) {
                console.log("Failed to fetch Summarize", err);
            }
        };

        fetchNewsSum();
    }, []);

    // console.log(newsSum);
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
                    <div className="flex gap-2">
                        <p className="text-md font-semibold text-white">
                            {new Date(
                                newsSum[0]?.start_date
                            ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <span className="text-md font-semibold text-white">
                            {"  "}-{"  "}
                        </span>
                        <p className="text-md font-semibold text-white">
                            {new Date(newsSum[0]?.end_date).toLocaleDateString(
                                "id-ID",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    <h1 className=" text-3xl md:text-6xl font-bold leading-relaxed text-white">
                        {/* {articleData.title} */}
                        Ringkasan Berita Terbaru Minggu Ini
                    </h1>
                    <p className="text-md line-clamp-2  text-white">
                        {/* {articleData.excerpt} */}
                        Simak poin-poin penting dari berita pilihan minggu ini —
                        cepat, ringkas, dan informatif.
                    </p>
                </div>
            </section>
            <section className="w-full bg-gray-50">
                <div className="container mx-auto px-6 2xl:px-0 xl:max-w-4xl relative -top-24 z-10">
                    <div className="p-3  md:p-4 lg:py-8 lg:px-10 rounded-xl shadow-xl bg-white min-h-[calc(100vh-300px)] w-full">
                        <div className="mx-auto prose lg:prose-xl ">
                            {/* {isLoading && <h1>Memuat...</h1>} */}

                            <article
                                className="prose  prose-zinc    prose-p:leading-7 prose-img:rounded-lg mx-auto max-w-full"
                                dangerouslySetInnerHTML={{
                                    __html: newsSum[0]?.summary || "",
                                }}
                            ></article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleNewsSum;
