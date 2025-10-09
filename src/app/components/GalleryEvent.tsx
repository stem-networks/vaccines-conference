// // components/GalleryEvent.js

"use client"
import Image from "next/image";
import React, { useEffect, useState, useRef, useMemo, ReactNode } from "react";
import { ApiResponse } from "@/types";

type GalleryData = {
    [folderName: string]: string[];
};

const galleryData: GalleryData = {
    allPhotos: [
        "28.webp", "2.webp", "3.webp", "5.webp",
        "6.webp", "7.webp", "4.webp", "9.webp",
        "12.webp", "14.webp", "15.webp",
        "19.webp", "20.webp",
        "21.webp", "22.webp", "25.webp",
        "26.webp", "27.webp", "30.webp",
        "34.webp", "35.webp", "1.webp",
        "36.webp", "37.webp", "38.webp", "39.webp", "48.webp", "49.webp", "50.webp",
        "51.webp", "53.webp", "54.webp", "55.webp",
        "56.webp", "59.webp", "60.webp",
        "64.webp", "65.webp",
        "66.webp", "67.webp", "70.webp",
        "75.webp", "31.webp",
        "77.webp", "78.webp", "79.webp",
        "82.webp", "83.webp", "84.webp", "87.webp", "88.webp", "90.webp",
        "91.webp", "92.webp", "93.webp", "94.webp", "95.webp",
        "96.webp", "97.webp", "99.webp",
        "101.webp", "103.webp", "104.webp",
        "134.webp", "113.webp", "114.webp", "115.webp", "116.webp", "119.webp",
        "120.webp", "127.webp", "129.webp",
        "133.webp", "136.webp", "137.webp", "138.webp", "139.webp", "107.webp",
        "141.webp", "142.webp", "143.webp", "144.webp", "145.webp", "146.webp", "147.webp",
        "150.webp", "153.webp","55.webp",
        "160.webp", "161.webp", "162.webp", "164.webp", "165.webp", "167.webp",
        "170.webp", "171.webp", "172.webp", "135.webp", "173.webp", "174.webp", "175.webp", "176.webp",
        "180.webp", "184.webp", "185.webp", "186.webp", "187.webp", "13.webp", "7.webp", "104.webp","95.webp"
    ],
    allDay2: [], // empty array, OK
};


interface GalleryEventProps {
    general: ApiResponse;
}

export default function GalleryEvent({ general }: GalleryEventProps) {
    const [columns, setColumns] = useState<ReactNode[][]>([[], [], [], []]);
    const [loading, setLoading] = useState(true);
    const loadedSetRef = useRef<Set<string>>(new Set());
    const colCount = 4;

    const generalData = general?.data || {};

    // build flat list of image URLs
    const allImageUrls = useMemo(() => {
        const urls: string[] = [];
        Object.keys(galleryData).forEach((folder) => {
            galleryData[folder].forEach((imageName: string) => {
                urls.push(`/images/gallery-event/${folder}/${imageName}`);
            });
        });
        return urls;
    }, []);

    const totalImages = allImageUrls.length;

    useEffect(() => {
        let imgIndex = 0;
        const colArrays: ReactNode[][] = Array.from({ length: colCount }, () => []);

        Object.keys(galleryData).forEach((folder) => {
            galleryData[folder].forEach((imageName: string) => {
                const imgPath = `/images/gallery-event/${folder}/${imageName}`;

                const imageWrapper = (
                    <div key={`${folder}-${imageName}`} className="image-wrapper relative mb-4">
                        <Image
                            src={imgPath}
                            alt={generalData?.clname || "Gallery"}
                            title={generalData?.clname}
                            width={400}
                            height={400}
                            className="w-100 h-auto rounded shadow-sm"
                            loading="lazy"
                            onLoad={() => {
                                if (!loadedSetRef.current.has(imgPath)) {
                                    loadedSetRef.current.add(imgPath);
                                    if (loadedSetRef.current.size === totalImages) {
                                        setLoading(false);
                                    }
                                }
                            }}
                            onError={() => {
                                if (!loadedSetRef.current.has(imgPath)) {
                                    loadedSetRef.current.add(imgPath);
                                    if (loadedSetRef.current.size === totalImages) {
                                        setLoading(false);
                                    }
                                }
                            }}
                        />
                    </div>
                );

                colArrays[imgIndex % colCount].push(imageWrapper);
                imgIndex++;
            });
        });

        setColumns(colArrays);
    }, [generalData, totalImages]);

    return (
        <div className="gallery-complete-page">
            <div className="gallery-event-block">
                <div className="auto-container relative">
                    {/* Images grid */}
                    <div className="gallery-images-block">
                        {columns.map((col, i) => (
                            <div key={i} className="each-indiv-images-block">
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* Overlay spinner */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20">
                            <div className="loader-block">
                                <span className="loader"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
