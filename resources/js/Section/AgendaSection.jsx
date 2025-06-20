import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Facebook,
    ScreenShare,
    Calendar,
    PenLine,
    ArrowRight,
    ArrowLeft,
    CalendarX2,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import {
    EffectFade,
    Autoplay,
    Mousewheel,
    Navigation,
    Pagination,
    Grid,
} from "swiper/modules";

import { Link } from "@inertiajs/react";
import axios from "axios";

import { useDateStore } from "../Global/useDateState";
import NoEvent from "../Modules/NoEvent";
import EventList from "../Modules/EventList";
const AgendaSection = () => {
    const [agendas, setAgendas] = useState([]);
    const {
        currentDate,
        setEvents,
        getCurrentWeek,
        selectedDate,
        selectedDateHasEvent,
        setSelectedDate,
        monthName,
        year,
        weekNumber,
    } = useDateStore();
    const currentWeek = getCurrentWeek();

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const response = await axios.get("/api/events");
                const apiData = response?.data || [];
                setAgendas(apiData);
                setEvents(apiData);
            } catch (error) {
                console.log("Failed to Fetch Agenda", error);
            }
        };

        fetchAgenda();
    }, []);

    const filteredEvents = useMemo(
        () => agendas.filter((event) => event.date === selectedDate),
        [agendas, selectedDate]
    );

    return (
        <div className="rounded-br-md rounded-bl-md pt-3 flex-grow bg-white border border-blue-gray-50 overflow-hidden">
            <div className=" flex flex-col gap-6">
                <div className="px-4 text-slate-600 ">
                    <p className="font-bold text-sm mb-1">{monthName}</p>
                    <p className="text-xs text-gray-500">
                        Minggu Ke {weekNumber}
                    </p>
                </div>
                <div className="relative w-full h-fit">
                    <div className="flex w-full relative  flex-row items-center">
                        <Swiper
                            className="mySwiper  w-[70%]"
                            slidesPerView={4}
                            slidesPerGroup={4}
                            speed={1000}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev", // Gunakan class kustom
                            }}
                            modules={[Navigation, Mousewheel]}
                        >
                            {currentWeek.map((day, index) => {
                                const today =
                                    currentDate.toISOString().split("T")[0] ===
                                    day.fullDate;

                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            onClick={() =>
                                                setSelectedDate(day.fullDate)
                                            }
                                            className={`
                                                ${
                                                    today
                                                        ? "bg-blue-500 text-white hover:bg-blue-700  "
                                                        : "hover:bg-blue-100 "
                                                }
                                                ${
                                                    selectedDate ===
                                                    day.fullDate
                                                        ? "border border-blue-400"
                                                        : ""
                                                }
                                            group cursor-pointer flex flex-col justify-center items-center py-2 px-3 w-fit  rounded transition-colors ease-in-out duration-250 `}
                                        >
                                            <div className="uppercase text-[10px]  ">
                                                {day.abbreviation}
                                            </div>
                                            <div className="font-medium text-sm ">
                                                {day.date}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}

                            {/* <SwiperSlide>
                                <div className="group cursor-pointer flex flex-col justify-center items-center py-2 px-2 w-fit  rounded transition-colors ease-in-out duration-250 ">
                                    <div className="uppercase text-[10px]  ">
                                        hari
                                    </div>
                                    <div className="font-medium text-sm ">
                                        tanggal
                                    </div>
                                </div>
                            </SwiperSlide> */}
                        </Swiper>
                        <div className="custom-prev   absolute left-2 top-1/2 -translate-y-1/2 z-10 ">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {selectedDateHasEvent ? (
                    <EventList events={filteredEvents} />
                ) : (
                    <NoEvent />
                )}
            </div>
        </div>
    );
};

export default AgendaSection;
