import Logo from "/public/images/diskominfosergei.avif";
import {
    Facebook,
    Instagram,
    Youtube,
    Music,
    Phone,
    Mail,
    Globe,
} from "lucide-react";

import useConfiguration from "../Global/useConfigurationStore";
import { useEffect } from "react";

const Footer = () => {
    const { configData, isLoading, error, fetchConfig } = useConfiguration();

    useEffect(() => {
        fetchConfig();
    }, [fetchConfig]);

    return (
        <footer className="bg-gray-100 z-0">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:px-0 lg:py-8">
                <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-6 text-gray-800">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex flex-col ">
                            <img
                                loading="lazy"
                                src={Logo}
                                className="  w-40 h-auto"
                                alt="Logo Diskominfo"
                            />
                        </a>
                        <div class="flex flex-col gap-2">
                            <p class="font-bold leading-7">
                                DINAS KOMUNIKASI DAN INFORMATIKA
                            </p>
                            <p class="font-roboto font-bold leading-7">
                                KABUPATEN SERDANG BEDAGAI
                            </p>
                            <div class="flex flex-col text-sm leading-6">
                                <p>
                                    Jl. Negara No.300, Firdaus, Kec. Sei Rampah
                                </p>
                                <p>
                                    Kabupaten Serdang Bedagai, Sumatera Utara,
                                    20995
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 ">
                        {/* <Phone className="w-8 opacity-60 mt-2" /> */}
                        <div className="flex flex-col gap-1">
                            <span className="font-bold leading-7 text-lg p-2">
                                Telepon
                            </span>
                            <span className="font-roboto leading-7 p-2">
                                {configData.telephone || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                        {/* <Mail className="w-8 opacity-60 mt-2" /> */}
                        <div className="flex flex-col gap-1">
                            <span className="font-bold leading-7 text-lg p-2">
                                E-Mail
                            </span>
                            <span className="font-roboto leading-7 p-2">
                                {configData.email || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 w-[220px] ">
                        {/* <Globe className="w-8 opacity-60 mt-2" /> */}
                        <div className="flex flex-col gap-3 w-full">
                            <span className="text-gray-700 text-lg p-2 font-bold opacity-90 md:mb-4">
                                Media Sosial
                            </span>
                            <span className="flex flex-col gap-3 text-white justify-between md:justify-start md:gap-4">
                                <a
                                    className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg"
                                    href="https://www.facebook.com/diskominfo.serdangbedagaikab"
                                >
                                    <div className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600">
                                        <Facebook />
                                    </div>
                                    <span className="text-gray-900">
                                        Facebook
                                    </span>
                                </a>
                                <a
                                    className="flex items-center gap-3   hover:bg-gray-200 p-2 rounded-lg"
                                    href="https://www.instagram.com/diskominfoserdangbedagai/"
                                >
                                    <div className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600">
                                        <Instagram />
                                    </div>
                                    <span className="text-gray-900">
                                        Instagram
                                    </span>
                                </a>
                                <a
                                    className="flex items-center gap-3  hover:bg-gray-200 p-2 rounded-lg "
                                    href="https://www.youtube.com/@mediacentersergai7087"
                                >
                                    <div className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600">
                                        <Youtube />
                                    </div>
                                    <span className="text-gray-900">
                                        Youtube
                                    </span>
                                </a>
                                <a
                                    className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg "
                                    href="https://sergaifm.serdangbedagaikab.go.id/"
                                >
                                    <div className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600">
                                        <Music />
                                    </div>
                                    <span className="text-gray-900">
                                        Sergai FM
                                    </span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2025{" "}
                        <span>Pemerintah Daerah Kabupaten Serdang Bedagai</span>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
