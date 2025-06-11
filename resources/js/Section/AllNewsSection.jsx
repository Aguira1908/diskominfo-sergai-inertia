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
    console.log(currentNews);
    return (
        <ul>
            {currentNews.map((News, index) => (
                <li key={index} className="group mb-3 ">
                    <Link to="#" className="h-fit ">
                        <article className="flex lg:grid-cols-3 gap-5 my-2 group-hover:bg-gray-100">
                            <div className="hidden w-full p-3 overflow-clip rounded-xl  md:block aspect-video">
                                <img
                                    src="#"
                                    className="w-full h-full rounded-lg object-cover object-center duration-300 ease-brand group-hover:scale-125"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col gap-3 lg:col-span-2 p-2">
                                <h2 className="font-semibold text-lg hover:underline text-gray-900 hover:text-blue-500s">
                                    {News.title}
                                </h2>
                                <div className="text-black/70 font-semibold line-clamp-3">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ex dolor in officiis quam
                                    labore, porro corporis dolore modi
                                    doloremque id magni molestias, iure
                                    provident iste autem quaerat ullam, adipisci
                                    eaque excepturi. Suscipit, rem totam
                                    adipisci laborum aspernatur quis eaque ea?
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
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default AllNewsSection;
