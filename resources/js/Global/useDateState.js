import { create } from "zustand";
import { startOfWeek, addDays, format } from "date-fns";
import { id } from "date-fns/locale";

const GenerateWeekDays = (date, events) => {
    const startMonday = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => {
        const day = addDays(startMonday, i);
        const fullDate = format(day, "yyyy-MM-dd");

        const hasEvent = events.some((event) => event.date === fullDate);

        return {
            abbreviation: format(day, "EEE", { locale: id }),
            date: day.getDate(),
            fullDate,
            hasEvent,
        };
    });
};

export const useDateStore = create((set, get) => ({
    currentDate: new Date(),
    events: [],
    selectedDate: format(new Date(), "yyyy-MM-dd"),
    selectedDateHasEvent: false,
    monthName: format(new Date(), "MMMM", { locale: id }),
    year: format(new Date(), "yyyy"),
    weekNumber: format(new Date(), "w"),

    // Getter untuk currentWeek
    getCurrentWeek: () => GenerateWeekDays(get().currentDate, get().events),

    setDate: (newDate) => {
        const events = get().events;
        const newWeek = GenerateWeekDays(newDate, events);
        const selectedDate = format(newDate, "yyyy-MM-dd");
        const selectedDateHasEvent = events.some(
            (event) => event.date === selectedDate
        );

        set({
            currentDate: newDate,
            selectedDate,
            selectedDateHasEvent,
            monthName: format(newDate, "MMMM", { locale: id }),
            year: format(newDate, "yyyy"),
            weekNumber: format(newDate, "w"),
        });
    },

    setSelectedDate: (date) => {
        const events = get().events;
        set({
            selectedDate: date,
            selectedDateHasEvent: events.some((event) => event.date === date),
        });
    },

    setEvents: (newEvents) => {
        const currentDate = get().currentDate;
        const selectedDate = get().selectedDate;

        set({
            events: newEvents,
            selectedDateHasEvent: newEvents.some(
                (event) => event.date === selectedDate
            ),
        });
    },
}));
