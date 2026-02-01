import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    // S M T W T F S in French -> L M M J V S D
    const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <div className="w-40 h-40 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-[22px] p-4 flex flex-col shadow-2xl text-white select-none cursor-default font-sans">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase text-red-500 tracking-wide">
                    {format(currentDate, 'MMM', { locale: fr }).toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                    {format(currentDate, 'd')}
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 text-[9px] text-center h-full content-center">
                {/* Days Header */}
                {dayNames.map((day, i) => (
                    <div key={i} className="font-bold text-gray-400 mb-1">{day}</div>
                ))}

                {/* Days */}
                {calendarDays.map((day, idx) => {
                    const isToday = isSameDay(day, currentDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);

                    return (
                        <div
                            key={idx}
                            className={`
                                flex items-center justify-center rounded-full w-4 h-4
                                ${!isCurrentMonth ? 'text-gray-600' : 'text-white'}
                                ${isToday ? 'bg-red-500 text-white font-bold' : ''}
                            `}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarWidget;
