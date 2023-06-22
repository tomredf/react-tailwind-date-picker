import React, { useState, useEffect, useRef, FC } from 'react';
import { Photo } from '@/types';

type PhotoGalleryProps = {
    photos: Photo[];
};

const PhotoGallery: FC<PhotoGalleryProps> = ({ photos }) => {
    const [isGalleryOpened, setIsGalleryOpened] = useState(false);
    const [activeUrl, setActiveUrl] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const galleryRef = useRef(null);

    const openGallery = (event: React.MouseEvent<HTMLImageElement>, index: number) => {
        // @ts-ignore
        setActiveIndex(index);
        // @ts-ignore
        setActiveUrl(event.currentTarget.src);
        setIsGalleryOpened(true);
    }

    const closeGallery = () => {
        setIsGalleryOpened(false);
        setTimeout(() => {
            setActiveUrl(null);
        }, 300);
    };

    const nextImage = () => {
        if (activeIndex === photos.length - 1) {
            // @ts-ignore
            setActiveIndex(0);
        } else {
            // @ts-ignore
            setActiveIndex(activeIndex + 1);
        }
        // @ts-ignore
        setActiveUrl(photos[activeIndex].url);
    };

    const prevImage = () => {
        if (activeIndex === 0) {
            // @ts-ignore
            setActiveIndex(photos.length - 1);
        } else {
            // @ts-ignore
            setActiveIndex(activeIndex - 1);
        }
        // @ts-ignore
        setActiveUrl(photos[activeIndex].url);
    };

    useEffect(() => {
        const handleKeyup = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        };
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [activeIndex]);


    return (
        <div className="w-full h-full select-none">
            <div className="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" style={{ translate: "none", rotate: "none", scale: "none", opacity: 1, transform: 'translate(0px, 0px)' }}>
                <ul ref={galleryRef} id="gallery" className="grid grid-cols-2 gap-5 lg:grid-cols-5">
                    {photos.map((photo, index) => (
                        <li key={index}>
                            <img onClick={(event) => openGallery(event, index)} src={photo.url} className="object-cover select-none w-full h-auto bg-gray-200 rounded-lg cursor-zoom-in aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]" alt={`photo gallery image ${photo.alt}`} />
                        </li>
                    ))}
                </ul>
            </div>
            {isGalleryOpened && (
                <div
                    onClick={closeGallery}
                    className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 select-none cursor-zoom-out">
                    <div
                        onClick={e => e.stopPropagation()}
                        className="relative flex items-center justify-center w-11/12 xl:w-4/5 h-11/12">
                        <button onClick={closeGallery} className="absolute right-0 top-0 m-4 text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <div onClick={prevImage} className="absolute left-0 flex items-center justify-center text-white translate-x-10 rounded-full cursor-pointer xl:-translate-x-24 2xl:-translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </div>
                        <img className="object-contain object-center w-full h-full select-none cursor-zoom-out rounded-lg"
                            // @ts-ignore
                             src={activeUrl} alt="" />
                        <div onClick={nextImage} className="absolute right-0 flex items-center justify-center text-white -translate-x-10 rounded-full cursor-pointer xl:translate-x-24 2xl:translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
