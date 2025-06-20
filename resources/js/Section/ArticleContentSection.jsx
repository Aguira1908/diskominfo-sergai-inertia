import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";

import { Mousewheel } from "swiper/modules";
import useArticleContentStore from "../Global/useArticleContentStore";

const ArticleContentSection = ({ slug }) => {
    const [article, setArticle] = useState([]);
    const { contentData, isLoading, error, fetchArticleContent, reset } =
        useArticleContentStore();

    useEffect(() => {
        if (slug) {
            reset();
            fetchArticleContent(slug);
        }
    }, [slug, fetchArticleContent]);

    return (
        <article
            className="prose  prose-zinc    prose-p:leading-7 prose-img:rounded-lg mx-auto max-w-full"
            dangerouslySetInnerHTML={{
                __html: contentData?.content || "",
            }}
        ></article>
    );
};

export default ArticleContentSection;
