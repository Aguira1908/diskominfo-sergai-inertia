import React from "react";

const QuickAccess = () => {
    return (
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
            <ul className="grid md:grid-cols-3 md:grid-rows-[auto,1fr] md:gap-x-6 lg:gap-x-20 gap-y-6 lg:gap-y-12">
                <li className="md:row-start-1 md:col-start-1 md:col-end-4 lg:row-start-auto lg:col-start-auto lg:col-end-auto flex flex-col gap-2 lg:gap-6">
                    <h2 className="text-2xl text-center lg:text-left md:text-4xl font-medium leading-loose">
                        Akses Cepat
                    </h2>
                    <p className="text-center lg:text-left text-sm text-gray-600 leading-6">
                        Dapatkan layanan dari Pemerintah Kabupaten Serdang
                        Bedagai dengan lebih mudah dan cepat sesuai keperluan
                        Anda.
                    </p>
                </li>
                <li className="group p-6 rounded-xl border border-gray-200 shadow-xl shadow-gray-200  bg-gray-50 hover:bg-blue-50 transition-colors ease-in-out duration-250">
                    <div className="flex flex-col gap-4" aria-label={`Buka `}>
                        {/* <img
                            src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                            alt="gambar"
                            loading="lazy"
                            className="lazy-img w-fit h-10"
                        /> */}

                        <h1 className="text-xl font-roboto font-bold group-hover:text-blue-700">
                            PPID
                        </h1>
                        <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                            Sampaikan permohonan informasi Anda kepada PPID
                            untuk memperoleh data terbaru dan terpercaya dari
                            Diskominfo Kabupaten Serdang Bedagai.
                        </p>
                    </div>
                </li>
                {/* <li className="group p-6 rounded-xl border border-gray-200 shadow-xl shadow-gray-200  bg-gray-50 hover:bg-blue-50 transition-colors ease-in-out duration-250">
                    <a
                        href="#"
                        className="flex flex-col gap-4"
                        aria-label={`Buka `}
                    >
                        <img
                            src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                            alt="gambar"
                            loading="lazy"
                            className="lazy-img w-fit h-10"
                        />

                        <p className="font-roboto font-bold group-hover:text-blue-700">
                            SPAN Lapor
                        </p>
                        <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                            Sampaikan aspirasi dan pengaduan terkait
                            permasalahan anda melalui saluran resmi Pemerintah
                            Pusat.
                        </p>
                    </a>
                </li>
                <li className="group p-6 rounded-xl border border-gray-200 shadow-xl shadow-gray-200  bg-gray-50 hover:bg-blue-50 transition-colors ease-in-out duration-250">
                    <a
                        href="#"
                        className="flex flex-col gap-4"
                        aria-label={`Buka `}
                    >
                        <img
                            src="https://d2s1u1uyrl4yfi.cloudfront.net/diskominfo/showcase/386c9057f88c0eb85d367ca4a0c04d1e.webp"
                            alt="gambar"
                            loading="lazy"
                            className="lazy-img w-fit h-10"
                        />

                        <p className="font-roboto font-bold group-hover:text-blue-700">
                            Service Desk
                        </p>
                        <p className="text-sm text-gray-600 leading-6 group-hover:text-blue-gray-800 focus:outline-none">
                            Akses berbagai layanan Diskominfo Jabar.
                        </p>
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default QuickAccess;
