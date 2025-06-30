import React, { useEffect } from "react";
import useNewsStore from "../Global/useNewsStore";
import { Link } from "@inertiajs/react";

const AllNewsSection = ({ currentCategory, curPage, seeMore }) => {
    const { newsData, meta, fetchNews, isLoading, error } = useNewsStore();

    useEffect(() => {
        fetchNews({
            latestPerCategory: false,

            category: currentCategory,
            page: curPage,
            perPage: seeMore,
        });
    }, [fetchNews, currentCategory, curPage, seeMore]);

    const currentNews = newsData || [];

    if (error) return <h1>Gagal Memuat Berita</h1>;
    return (
        <ul>
            {isLoading ? (
                <li className="mb-3">
                    <div className="w-full  bg-gray-100 px-6 py-13 rounded-2xl h-fit">
                        <h1>Memuat Berita...</h1>
                    </div>
                </li>
            ) : (
                currentNews.map((News, index) => (
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
                                            <span>
                                                {Array.isArray(News.category)
                                                    ? News.category.length > 0
                                                        ? News.category.map(
                                                              (cat, i) => (
                                                                  <span key={i}>
                                                                      {cat.name}{" "}
                                                                  </span>
                                                              )
                                                          )
                                                        : "Tidak ada kategori"
                                                    : News.category?.name ||
                                                      "Tidak ada kategori"}
                                            </span>
                                            <span> | </span>
                                            <span>
                                                {new Date(
                                                    News.published_at
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
                ))
            )}
        </ul>
    );
};

export default AllNewsSection;
