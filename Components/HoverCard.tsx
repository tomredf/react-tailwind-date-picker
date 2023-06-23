import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'

type HoverCardProps = {
    hoverCardDelay?: number;
    hoverCardLeaveDelay?: number;
};

const HoverCard: React.FC<HoverCardProps> = ({
                                                 hoverCardDelay = 600,
                                                 hoverCardLeaveDelay = 500,
                                             }) => {
    const [hoverCardHovered, setHoverCardHovered] = useState(false);
    let hoverCardTimeout: NodeJS.Timeout | null = null;
    let hoverCardLeaveTimeout: NodeJS.Timeout | null = null;

    const hoverCardEnter = () => {
        if (hoverCardLeaveTimeout) clearTimeout(hoverCardLeaveTimeout);
        if (hoverCardHovered) return;
        if (hoverCardTimeout) clearTimeout(hoverCardTimeout);
        hoverCardTimeout = setTimeout(() => {
            setHoverCardHovered(true);
        }, hoverCardDelay);
    };

    const hoverCardLeave = () => {
        if (hoverCardTimeout) clearTimeout(hoverCardTimeout);
        if (!hoverCardHovered) return;
        if (hoverCardLeaveTimeout) clearTimeout(hoverCardLeaveTimeout);
        hoverCardLeaveTimeout = setTimeout(() => {
            setHoverCardHovered(false);
        }, hoverCardLeaveDelay);
    };

    useEffect(() => {
        return () => {
            if (hoverCardTimeout) clearTimeout(hoverCardTimeout);
            if (hoverCardLeaveTimeout) clearTimeout(hoverCardLeaveTimeout);
        };
    }, []);

    return (
        <div className="relative"
             onMouseOver={hoverCardEnter}
             onMouseLeave={hoverCardLeave}>

            <a href="#_" className="hover:underline">@thedevdojo</a>

            {hoverCardHovered &&
                <div className="absolute top-0 w-[365px] max-w-lg mt-5 z-30 -translate-x-1/2 translate-y-3 left-1/2">
                    <div className="w-[full] h-auto bg-white space-x-3 p-5 flex items-start rounded-md shadow-sm border border-neutral-200/70">
                        <img src="https://cdn.devdojo.com/users/June2022/devdojo.jpg" alt="devdojo image" className="rounded-full w-14 h-14" />

                        <div className="relative">
                            <p className="mb-1 font-bold">@thedevdojo</p>
                            <p className="mb-1 text-sm text-gray-600">The creative platform for developers. Community, tools, products, and more</p>
                            <p className="flex items-center space-x-1 text-xs text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                <span>Joined June 2020</span>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default HoverCard;
