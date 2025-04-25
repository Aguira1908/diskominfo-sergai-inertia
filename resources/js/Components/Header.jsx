import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { ChevronDown, CircleX, Menu } from "lucide-react";
import Information from "../../../public/images/informasi.svg";
import axios from "axios";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenHam, setIsOpenHam] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, [isOpen]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/menu"
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMenu();
    }, []);
    return (
        <header className="pembungkus-header  flex items-center w-screen h-16 fixed top-0 z-20 bg-white sm:h-16 lg:h-20">
            <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                <nav className="flex items-center">
                    <Link
                        href={"/"}
                        className="mr-auto h-full  md:h-10 nuxt-link-exact-active nuxt-link-active"
                    >
                        <img src="#" alt="Logo" className=" w-32 auto" />
                    </Link>
                    <ul className="items-center gap-4 text-white hidden lg:flex lg:gap-[16px]">
                        <li>
                            <Link className="mr-auto w-8 h-8 lg:w-[38px] lg:h-[38px] xl:w-[228px] xl:h-[38px]">
                                <span className=" font-[400] leading-7 text-gray-700 px-4 py-2">
                                    Profil
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="mr-auto w-8 h-8 lg:w-[38px] lg:h-[38px] xl:w-[228px] xl:h-[38px]">
                                <span className=" font-[400] leading-7 text-gray-700 px-4 py-2">
                                    Berita
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="mr-auto w-8 h-8 lg:w-[38px] lg:h-[38px] xl:w-[228px] xl:h-[38px]">
                                <span className=" font-[400] leading-7 text-gray-700 px-4 py-2">
                                    Informasi
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg"
                            >
                                <span className=" font-[400] font-roboto leading-7 text-gray-700">
                                    PPID
                                </span>
                                <div
                                    aria-hidden="true"
                                    className="flex justify-center items-center"
                                    style={{ width: "25", height: "25" }}
                                >
                                    <i className="jds-icon">
                                        <div>
                                            <ChevronDown color="#161618" />
                                        </div>
                                    </i>
                                </div>
                            </button>
                        </li>
                        {/*  */}
                        <li>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg"
                            >
                                <span className=" font-[400] font-roboto leading-7 text-gray-700">
                                    Pengaduan
                                </span>
                                <div
                                    aria-hidden="true"
                                    className="flex justify-center items-center"
                                    style={{ width: "25", height: "25" }}
                                >
                                    <i className="jds-icon">
                                        <div>
                                            <ChevronDown color="#161618" />
                                        </div>
                                    </i>
                                </div>
                            </button>
                        </li>
                        {/*Drop Down Menu */}
                        {isOpen ? (
                            <section
                                className={`DropDownMenu bg-white w-full absolute top-full left-0 border-t border-gray-400 overflow-auto max-h-[calc(100vh-60px)] xl:max-h-[calc(100vh-80px)] transition-all duration-300 ease-out ${
                                    isVisible
                                        ? "opacity-100 transform translate-y-0"
                                        : "opacity-0 transform translate-y-[-10px]"
                                } `}
                            >
                                <div className="container px-6 mx-auto 2xl:px-0 xl:max-w-7xl">
                                    <div className="text-slate-800 flex mx-auto items-start pt-6 pb-10 bg-no-repeat">
                                        <div className="flex flex-col gap-8 flex-grow">
                                            <h1 className="text-gray-800  font-bold text-3xl leading-[45px]">
                                                PPID
                                            </h1>
                                            <nav className="grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-10">
                                                <Link
                                                    href={"#"}
                                                    className="flex items-start text-gray-800"
                                                >
                                                    <img
                                                        src={Information}
                                                        className="w-[52px] h-auto mt-1.5"
                                                        alt="Informasi"
                                                    />
                                                    <div className="ml-4">
                                                        <h2 className=" text-lg leading-[23px] font-bold mb-1">
                                                            Lorem, ipsum dolor.
                                                        </h2>
                                                        <p className="text-sm opacity-80">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Velit, iusto.
                                                        </p>
                                                    </div>
                                                </Link>
                                            </nav>
                                        </div>
                                        <div
                                            // onClickHandler={() =>
                                            //     setIsOpen(!isOpen)
                                            // }
                                            className="w-[30px] "
                                        >
                                            <CircleX
                                                onClick={() => setIsOpen(false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <></>
                        )}
                    </ul>

                    {/* Ham Icon */}
                    <div className="lg:hidden">
                        <div className="min-w-0 flex gap-4">
                            <button
                                onClick={() => setIsOpenHam(!isOpenHam)}
                                aria-label="Buka Menu Navigasi"
                                className="w-7 h-7 flex items-center justify-center"
                            >
                                <Menu
                                    className={`w-[17px] h-auto opacity-70 transition-opacity duration-300 ${
                                        isOpenHam
                                            ? "opacity-0 hidden"
                                            : "opacity-100 inline-block"
                                    }`}
                                    alt="Buka Menu Navigasi"
                                />

                                <CircleX
                                    className={`w-[17px] h-auto opacity-70 transition-opacity duration-300 ${
                                        isOpenHam
                                            ? "opacity-100 inline-block"
                                            : "opacity-0 hidden"
                                    }`}
                                    alt="Tutup Menu Navigasi"
                                />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Ham */}
                <div
                    className={`fixed top-12 left-0 right-0 bottom-0 z-50 bg-white lg:hidden
                    transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    ${
                        isOpenHam
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-1"
                    }
                    ${
                        isOpenHam
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                    }`}
                >
                    <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl h-full">
                        <div className="py-4 w-full h-full flex flex-col overflow-y-auto ">
                            <section className="min-w-0 flex flex-col  ">
                                <details className="py-4 text-gray-700 group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <Link href={"#"}>Profil</Link>
                                    </summary>
                                </details>
                                <details className="py-4 text-gray-700 group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <Link href={"#"}>Berita</Link>
                                    </summary>
                                </details>
                                <details className="py-4 text-gray-700 group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <Link href={"#"}>Informasi</Link>
                                    </summary>
                                </details>

                                <details className="py-4 text-gray-700 group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <h1>PPID</h1>
                                        <div className="h-6 w-6 flex items-center justify-center">
                                            <div className="flex justify-center items-center cursor-pointer transition-transform ease-in">
                                                <ChevronDown
                                                    className="group-open:rotate-180 transition-all ease-in duration-200"
                                                    alt={`Buka Menu Pop Up`}
                                                />
                                            </div>
                                        </div>
                                    </summary>
                                    <ul className="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-blue-500 opacity-80">
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                    </ul>
                                </details>
                                <details className="py-4 text-gray-700 group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <h1>Pengaduan</h1>
                                        <div className="h-6 w-6 flex items-center justify-center">
                                            <div className="flex justify-center items-center cursor-pointer transition-transform ease-in">
                                                <ChevronDown
                                                    className="group-open:rotate-180 transition-all ease-in duration-200"
                                                    alt={`Buka Menu Pop Up`}
                                                />
                                            </div>
                                        </div>
                                    </summary>
                                    <ul className="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-blue-500 opacity-80">
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                        <li>
                                            <Link>Menu</Link>
                                        </li>
                                    </ul>
                                </details>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
