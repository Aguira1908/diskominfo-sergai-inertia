import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleX, Menu, Info } from "lucide-react";
import axios from "axios";
import Logo from "/public/images/diskominfosergei.avif";
import { usePage } from "@inertiajs/react";

const Header = () => {
    const { url } = usePage();
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [menu, setMenu] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenHam, setIsOpenHam] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [whoActive, setWhoActive] = useState(null);
    const firstSlug = url.split("/")[1];

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, [isOpen]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("/api/menu");
                setMenu(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMenu();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setActiveMenu(null);
            }
        };

        if (activeMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup saat komponen dibongkar atau activeMenu berubah
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMenu]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         setTimeout(() => {
    //             if (
    //                 dropdownRef.current &&
    //                 !dropdownRef.current.contains(event.target) &&
    //                 buttonRef.current &&
    //                 !buttonRef.current.contains(event.target)
    //             ) {
    //                 setActiveMenu(null);
    //             }
    //         }, 10); // 10ms delay untuk beri waktu click dalam komponen
    //     };

    //     if (activeMenu) {
    //         document.addEventListener("mousedown", handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [activeMenu]);

    return (
        <header className="pembungkus-header  flex items-center w-screen h-16 fixed top-0 z-20 bg-white sm:h-16 lg:h-20">
            <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
                <nav className="flex items-center">
                    <Link
                        href={"/"}
                        className="mr-auto h-full  md:h-10 nuxt-link-exact-active nuxt-link-active"
                    >
                        <img src={Logo} alt="Logo" className=" w-32 auto" />
                    </Link>
                    <ul className="items-center gap-4 text-white hidden lg:flex lg:gap-[16px]">
                        {menu?.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.submenus.length === 0 ? (
                                        <Link
                                            href={`/${item.url_slug}`}
                                            onClick={() => {
                                                setActiveMenu(null);
                                            }}
                                            className={`mr-auto w-8 py-3 px-6 h-8 lg:w-[38px] lg:h-[38px] xl:w-[228px] xl:h-[38px] rounded-2xl hover:bg-blue-100/70 transition-colors duration-400 ${
                                                firstSlug === item.url_slug
                                                    ? "bg-blue-100 border-2 border-blue-300 "
                                                    : "bg-none"
                                            }`}
                                        >
                                            <span className=" font-[400] leading-7 text-gray-700  ">
                                                {item.title}
                                            </span>
                                        </Link>
                                    ) : (
                                        <button
                                            ref={buttonRef}
                                            onClick={() => {
                                                if (
                                                    activeMenu?.id === item.id
                                                ) {
                                                    setActiveMenu(null);
                                                    setIsOpen(false);
                                                } else {
                                                    setActiveMenu(item);
                                                    setIsOpen(true);
                                                }
                                            }}
                                            className={`flex items-center gap-4 cursor-pointer px-5 py-2 rounded-2xl hover:bg-blue-100 transition-colors duration-400 ${
                                                firstSlug === item.url_slug
                                                    ? "bg-blue-100 border-2 border-blue-300 "
                                                    : "bg-none"
                                            }`}
                                        >
                                            <span className=" font-[400] font-roboto leading-7 text-gray-900 ">
                                                {item.title}
                                            </span>
                                            <ChevronDown color="#161618" />
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                        {/*Drop Down Menu */}
                        {activeMenu && (
                            <section
                                ref={dropdownRef}
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
                                                {activeMenu.title}
                                            </h1>
                                            <nav className="grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-10">
                                                {activeMenu.submenus.map(
                                                    (submenu, index) => (
                                                        <Link
                                                            onClick={() => {
                                                                setActiveMenu(
                                                                    null
                                                                );
                                                            }}
                                                            key={index}
                                                            href={`/${activeMenu.url_slug}/${submenu.url_slug}`}
                                                            className="  flex flex-col items-start text-gray-800 group hover:bg-gray-100 p-5 rounded-xl "
                                                        >
                                                            {/* <Info */}
                                                            {/* className="w-[40px] p-1 text-blue-500 bg-blue-200/40 rounded-xl stroke-3 h-auto mt-1.5" */}
                                                            {/* alt="Informasi" */}
                                                            {/* /> */}
                                                            <h2 className="group-hover:underline   text-lg leading-[23px] font-bold mb-1">
                                                                {submenu.title}
                                                            </h2>
                                                            <p className="text-sm opacity-80">
                                                                {
                                                                    submenu.excerpt
                                                                }
                                                            </p>
                                                        </Link>
                                                    )
                                                )}
                                            </nav>
                                        </div>
                                        <div
                                            className="w-[30px]"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <CircleX className="cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </section>
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
                                    className={`w-[17px] cursor-pointer h-auto opacity-70 transition-opacity duration-300 ${
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
                                {menu?.map((item, index) => {
                                    return (
                                        <details
                                            key={index}
                                            className="py-4 text-gray-700 group"
                                        >
                                            <summary className="flex justify-between items-center cursor-pointer">
                                                {item.submenus.length === 0 ? (
                                                    <Link
                                                        href={`/${item.url_slug}`}
                                                        onClick={() => {
                                                            setIsOpenHam(false);
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <h1>{item.title}</h1>
                                                        <div className="h-6 w-6 flex items-center justify-center">
                                                            <div className="flex justify-center items-center cursor-pointer transition-transform ease-in">
                                                                <ChevronDown
                                                                    className="group-open:rotate-180 transition-all ease-in duration-200"
                                                                    alt={`Buka Menu Pop Up`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </summary>
                                            {item.submenus.length > 0 && (
                                                <ul className="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-blue-500 opacity-80">
                                                    {item.submenus.map(
                                                        (submenu, index) => (
                                                            <li key={index}>
                                                                <Link
                                                                    href={`/${item.url_slug}/${submenu.url_slug}`}
                                                                    onClick={() => {
                                                                        setIsOpenHam(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        submenu.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </details>
                                    );
                                })}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
