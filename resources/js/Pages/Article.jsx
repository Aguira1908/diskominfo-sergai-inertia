import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useArticleNewsStore from "../Global/useArticleNewsStore";

const Article = ({ slug }) => {
    const { articleData, isLoading, error, fetchArticleNews } =
        useArticleNewsStore();

    useEffect(() => {
        fetchArticleNews(slug);
    }, []);

    return (
        <div className="relative">
            <section className="h-[450px]">
                <div className="relative w-full h-full overflow-hidden">
                    <div>
                        <img
                            src={articleData.image_url}
                            className="w-full h-full absolute top-0 object-cover object-center"
                            alt="berita diskominfo "
                            loading={"lazy"}
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
                </div>
            </section>
            <section className="w-full min-h-[400px] flex justify-center items-center absolute top-0 z-10">
                <div className="container flex flex-col gap-2 mx-auto px-6 2xl:px-0 xl:max-w-7xl relative pt-24 pb-40 z-10">
                    <p className="text-md font-semibold text-white">
                        {new Date(articleData.published_at).toLocaleDateString(
                            "id-ID",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>
                    <h1 className=" text-3xl md:text-5xl font-bold leading-relaxed text-white">
                        {articleData.title}
                    </h1>
                    <p className="text-sm line-clamp-2  text-white">
                        {articleData.excerpt}
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
                                    __html: articleData.content,
                                }}
                            ></article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Article;
