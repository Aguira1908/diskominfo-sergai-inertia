import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
const SeeMore = ({
    isOpen,
    setIsOpen,
    seeNumber,
    setSeeNumber,
    seeMore,
    totalPages,
    currentPage,
    setCurrentPage,
}) => {
    // Fungsi untuk mengatur current page agar tidak melebihi total pages
    const handlePageChange = (page) => {
        // Pastikan curPage tidak lebih dari totalPages
        if (page < 1) {
            setCurrentPage(1);
        } else if (page > totalPages) {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-between py-2">
            <div className="relative inline-flex w-full md:w-1/2">
                <div className="inline-flex divide-x  divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
                    <span className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative">
                        Tampilkan Lebih Banyak
                    </span>
                    <p className="flex px-3 py-2">{seeNumber || 5}</p>
                    <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
                        aria-label="Menu"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-12 z-10 w-56 rounded border border-gray-300 bg-white shadow-sm"
                    >
                        {seeMore.map((see, index) => (
                            <button
                                key={index}
                                className="block w-full px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                role="menuitem"
                                onClick={() => {
                                    setSeeNumber(see.number);
                                    setIsOpen(false);
                                }}
                            >
                                {see.number}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="block w-full px-3 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                            onClick={() => {
                                setSeeNumber(5);
                                setIsOpen(false);
                            }}
                        >
                            Default
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center w-full md:w-1/2 mt-2 md:mt-0">
                <span className="flex flex-col sm:flex-row overflow-hidden bg-white">
                    <div className="flex">
                        <p className="flex px-3 py-2 text-md font-medium text-gray-700">
                            <span>Halaman </span>
                            <span className="px-5">{currentPage}</span>
                        </p>
                        <p className="flex px-3 py-2 text-md font-medium text-gray-700">
                            <span>dari </span>
                            <span className="px-5">{totalPages}</span>
                        </p>
                    </div>
                    <div className="flex w-full gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 cursor-pointer py-2 text-sm font-medium text-gray-700"
                        >
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 cursor-pointer py-2 text-sm font-medium text-gray-700"
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </span>
            </div>
        </div>
    );
};
export default SeeMore;
