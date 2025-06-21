import React, { useEffect, useState } from "react";
import { ScreenShare } from "lucide-react";

import Modal from "./Modal";

const EventList = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
        if (selectedEvent) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [selectedEvent]);
    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="h-[470px] md:h-[380px] xl:h-[470px] bg-white flex flex-col    overflow-hidden ml-5 mr-4">
            <div className=" w-full">
                <div className=" h-full flex flex-col items-center justify-center gap-4 pb-5">
                    <ul className="w-full ">
                        {events.map((event, index) => {
                            return (
                                <li
                                    onClick={() => setSelectedEvent(event)}
                                    key={index}
                                    className="group cursor-pointer mb-3 p-3 w-full rounded-xl hover:bg-gray-200 text-slate-800 transition-colors duration-500"
                                >
                                    <h2 className="flex line-clamp-2 font-medium leading-7 group-hover:text-blue-700">
                                        {event.title}
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs ">
                                            <span>{event.date}</span>
                                            <span> | </span>
                                            <span>{event.location}</span>
                                        </div>
                                        <ScreenShare
                                            className="w-[13px] h-auto hidden group-hover:block text-blue-700 transition-colors duration-500"
                                            alt="Buka Berita"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {selectedEvent && (
                <Modal
                    isOpen={!!selectedEvent}
                    onClose={handleCloseModal}
                    event={selectedEvent}
                />
            )}
        </div>
    );
};

export default EventList;
