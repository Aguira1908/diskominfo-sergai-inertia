import { CalendarX2 } from "lucide-react";

const NoEvent = () => {
    return (
        <div className="h-[470px] md:h-[380px] xl:h-[470px] bg-white flex flex-col items-center justify-center overflow-hidden ml-5 mr-4">
            <div className="px-4">
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 pb-5">
                    <CalendarX2 className="w-[100px]  " />
                    <div className="w-full leading-6 text-center">
                        <p className="text-base font-bold text-blue-gray-500 max-w-[20ch] mx-auto mb-2">
                            Tidak ada kegiatan/event di hari ini
                        </p>
                        <p className="text-xs  text-gray-500">
                            Silahkan Lihat tanggal sebelum atau selanjutnya
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoEvent;
