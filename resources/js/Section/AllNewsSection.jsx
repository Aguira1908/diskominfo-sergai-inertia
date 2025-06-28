import React, { useEffect } from "react";
import useNewsStore from "../Global/useNewsStore";
import { Link } from "@inertiajs/react";

const AllNewsSection = ({ currentCategory, curPage, seeMore }) => {
    const { newsData, meta, isLoading, fetchNews } = useNewsStore();

    useEffect(() => {
        fetchNews({
            latestPerCategory: false,

            category: currentCategory,
            page: curPage,
            perPage: seeMore,
        });
    }, [fetchNews, currentCategory, curPage, seeMore]);

    const currentNews = newsData || [];
    return (
        <ul>
            {currentNews.map((News, index) => (
                <li key={index} className="group mb-3  ">
                    <a href={`/berita/${News.slug}`} className="h-fit ">
                        <article className="flex flex-col lg:grid lg:grid-cols-[250px_1fr] gap-5 my-2 p-3 group-hover:bg-gray-100 rounded-2xl">
                            <div className="hidden overflow-hidden rounded-xl  lg:block aspect-video">
                                <img
                                    src={News.image_url}
                                    loading="lazy"
                                    className="w-full h-auto  rounded-xl group-hover:scale-120 transition-all"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col gap-3  p-2">
                                <h2 className="font-semibold text-lg hover:underline text-gray-900 hover:text-blue-500s">
                                    {News.title}
                                </h2>
                                <div className="text-black/70 font-semibold line-clamp-3 text-justify">
                                    {News.excerpt}
                                </div>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs">
                                        <span>{News.category.name}</span>
                                        <span> | </span>
                                        <span>
                                            {new Date(
                                                News.date
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </article>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default AllNewsSection;
