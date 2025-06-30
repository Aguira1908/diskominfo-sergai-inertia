import useLatestNewsStore from "../Global/useLatesNewsStore";
import { ScreenShare } from "lucide-react";

const LatestNewsCard = () => {
    const { newsData, fetchLatestNews, isLoading, error } =
        useLatestNewsStore();

    return (
        <ul className="  w-full h-full flex flex-col gap-4">
            {isLoading ? (
                <li className="bg-gray-100   group p-5 rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500 ">
                    <h1>Memuat...</h1>
                </li>
            ) : (
                newsData.slice(0, 4).map((News, index) => {
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
                                            <span>
                                                {Array.isArray(News.category)
                                                    ? News.category.length > 0
                                                        ? News.category
                                                              .slice(0, 2)
                                                              .map((cat, i) => (
                                                                  <span key={i}>
                                                                      {cat.name}
                                                                      {"  "}
                                                                  </span>
                                                              ))
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
                                        <ScreenShare className="w-[13px] h-auto hidden group-hover:block" />
                                    </div>
                                </div>
                            </a>
                        </li>
                    );
                })
            )}
        </ul>
    );
};

export default LatestNewsCard;
