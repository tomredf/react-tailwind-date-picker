// based on the amazing Pines UI Date Picker by DevDojo https://devdojo.com/pines/docs/date-picker

import React, { useState, useEffect, useRef, FC, MouseEvent } from 'react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
interface IDatePickerProps {} // replace with your props if any

const DatePicker: FC<IDatePickerProps> = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [blankDays, setBlankDays] = useState<number[]>([]);
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    const datePickerInput = useRef<HTMLDivElement>(null);

    useEffect(() => {
        calculateDays();
    }, [date]);

    const calculateDays = () => {
        let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let dayOfWeek = new Date(date.getFullYear(), date.getMonth()).getDay();
        let blankdaysArray: number[] = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }
        let daysArray: number[] = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        setBlankDays(blankdaysArray);
        setDaysInMonth(daysArray);
    }

    const isToday = (day: number): boolean => {
        const today = new Date();
        const d = new Date(date.getFullYear(), date.getMonth(), day);
        return today.toDateString() === d.toDateString();
    }

    const isSelectedDate = (day: number) => {
        const d = new Date(date.getFullYear(), date.getMonth(), day);
        return date.toDateString() === d.toDateString();
    }

    const dayClicked = (day: number) => {
        setDate(new Date(date.getFullYear(), date.getMonth(), day));
        setIsOpen(false);
    }

    const nextMonth = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    }

    const previousMonth = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    }

    return (
        <div className="container py-2 mx-auto md:py-10">
            <div className="w-full">
                <label htmlFor="datepicker" className="block mb-1 text-sm font-medium text-neutral-500">Select Date</label>
                <div className="relative w-[17rem]">
                    <input type="text"
                        // @ts-ignore
                           ref={datePickerInput}
                           onClick={() => { setIsOpen(!isOpen)}}
                           value={date.toLocaleDateString()}
                           readOnly
                           className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md text-neutral-600 border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                           placeholder="Select date" />

                    <div className="absolute top-0 right-0 px-3 py-2 cursor-pointer text-neutral-400 hover:text-neutral-500"
                         onClick={() => { setIsOpen(!isOpen); datePickerInput.current?.focus()}}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>

                    {isOpen && (
                        <div className="absolute top-0 left-0 z-40 max-w-lg p-4 mt-12 antialiased bg-white border rounded-lg shadow w-[17rem] border-neutral-200/70">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-lg font-bold text-gray-800">{monthNames[date.getMonth()]}</span>
                                    <span className="ml-1 text-lg font-normal text-gray-600">{date.getFullYear()}</span>
                                </div>
                                <div>
                                    <button type="button" onClick={previousMonth}>
                                        <svg className="inline-flex w-6 h-6 text-gray-400" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 19l-7-7 7-7"/>
                                        </svg>
                                    </button>
                                    <button type="button" onClick={nextMonth}>
                                        <svg className="inline-flex w-6 h-6 text-gray-400" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 mb-3">
                                {days.map((day, index) =>
                                    <div key={index} className="px-0.5">
                                        <div className="text-xs font-medium text-center text-gray-800">{day}</div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-7">
                                {blankDays.map((blankDay, index) =>
                                    <div key={index} className="p-1 text-sm text-center border border-transparent"></div>
                                )}
                                {daysInMonth.map((day, dayIndex) =>
                                    <div key={dayIndex} className="px-0.5 mb-1 aspect-square">
                                        <div
                                            className={`flex items-center justify-center text-sm leading-none text-center rounded-full cursor-pointer h-7 w-7
                                            ${isToday(day) ? "bg-neutral-200" : ""}
                                            ${isSelectedDate(day) ? "bg-neutral-800 text-white hover:bg-opacity-75" : "text-gray-600 hover:bg-neutral-200"}`}
                                            onClick={() => { dayClicked(day) }}>
                                            {day}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}
export default DatePicker;
