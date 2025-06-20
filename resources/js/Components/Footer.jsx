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
                        <div class="flex flex-col gap-1">
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
                        <Phone className="w-8 opacity-60 mt-2" />
                        <div className="flex flex-col gap-1">
                            <span className="font-bold leading-7">Telepon</span>
                            <span className="font-roboto leading-7">
                                {configData.telephone || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 ">
                        <Mail className="w-8 opacity-60 mt-2" />
                        <div className="flex flex-col gap-1">
                            <span className="font-bold leading-7">E-Mail</span>
                            <span className="font-roboto leading-7">
                                {configData.email || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 ">
                        <Globe className="w-8 opacity-60 mt-2" />
                        <div className="flex flex-col gap-3 w-full">
                            <span className="text-gray-700 font-bold opacity-90 mb-4">
                                Media Sosial
                            </span>
                            <span className="flex  text-white justify-between px-2 md:justify-start md:gap-8">
                                <a
                                    href=""
                                    className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600"
                                >
                                    <Facebook />
                                </a>
                                <a
                                    href=""
                                    className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600"
                                >
                                    <Instagram />
                                </a>
                                <a
                                    href=""
                                    className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600"
                                >
                                    <Youtube />
                                </a>
                                <a
                                    href=""
                                    className="p-[5px] flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600"
                                >
                                    <Music />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2025{" "}
                        <span>
                            Pemerintah Daerah Kabupaten Serdang Bedagai™
                        </span>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>

        // <footer className="bg-gray-100">
        //     <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        //         <div className="md:flex md:justify-between">
        //             <div className="mb-6 md:mb-0">
        //                 <a
        //                     href="#"
        //                     className="flex flex-col items-center md:items-start"
        //                 >
        //                     {/* Logo placeholder */}
        //                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-2" />
        //                     <span className="text-xl md:text-2xl font-semibold text-center md:text-left">
        //                         Diskominfo Serdang Bedagai
        //                     </span>
        //                 </a>
        //             </div>

        //             <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        //                 {/* Berita Section */}
        //                 <div>
        //                     <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
        //                         Berita
        //                     </h2>
        //                     <ul className="text-gray-500 font-medium grid grid-cols-2 gap-3">
        //                         {[...Array(7)].map((_, i) => (
        //                             <li key={i} className="mb-2">
        //                                 <a
        //                                     href="#"
        //                                     className="hover:underline text-sm"
        //                                 >
        //                                     Kategori {i + 1}
        //                                 </a>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>

        //                 {/* PPID Section */}
        //                 <div>
        //                     <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
        //                         PPID
        //                     </h2>
        //                     <ul className="text-gray-500 font-medium grid grid-cols-2 gap-3">
        //                         {[...Array(9)].map((_, i) => (
        //                             <li key={i} className="mb-2">
        //                                 <a
        //                                     href="#"
        //                                     className="hover:underline text-sm"
        //                                 >
        //                                     Menu {i + 1}
        //                                 </a>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>

        //                 {/* Legal Section */}
        //                 <div>
        //                     <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
        //                         Legal
        //                     </h2>
        //                     <ul className="text-gray-500 font-medium space-y-2">
        //                         <li>
        //                             <a
        //                                 href="#"
        //                                 className="hover:underline text-sm"
        //                             >
        //                                 Privacy Policy
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a
        //                                 href="#"
        //                                 className="hover:underline text-sm"
        //                             >
        //                                 Terms &amp; Conditions
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a
        //                                 href="#"
        //                                 className="hover:underline text-sm"
        //                             >
        //                                 Kebijakan Penggunaan
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>

        //         <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        //         <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        //             <span className="text-sm text-gray-500 text-center mb-4 sm:mb-0">
        //                 © 2023 Dinas Komunikasi dan Informatika
        //                 <br className="sm:hidden" />
        //                 Kabupaten Serdang Bedagai
        //             </span>
        //             <div className="flex space-x-5">
        //                 {["facebook", "twitter", "instagram", "youtube"].map(
        //                     (platform) => (
        //                         <a
        //                             key={platform}
        //                             href="#"
        //                             className="text-gray-500 hover:text-gray-900"
        //                             aria-label={`${platform} page`}
        //                         >
        //                             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
        //                         </a>
        //                     )
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </footer>
    );
};

export default Footer;
