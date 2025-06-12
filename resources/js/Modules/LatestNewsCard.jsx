import useLatestNewsStore from "../Global/useLatesNewsStore";
import { ScreenShare } from "lucide-react";

const LatestNewsCard = () => {
    const { newsData, fetchLatestNews, isLoading, error } =
        useLatestNewsStore();

    return (
        <ul className="  w-full h-full flex flex-col gap-4">
            {newsData.slice(0, 5).map((News, index) => {
                return (
                    <li
                        key={index}
                        className="bg-gray-50 border-gray-200 border  group p-3 rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500 "
                    >
                        <a href={`/berita/${News.slug}`}>
                            <div className="flex flex-col gap-3 w-full">
                                <h2 className="line-clamp-2 font-medium leading-7 group-hover:text-blue-700">
                                    {News.title}
                                </h2>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs">
                                        <span>{News.category.name}</span>
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
                                    <ScreenShare className="w-[13px] h-auto hidden group-hover:block" />
                                </div>
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default LatestNewsCard;
