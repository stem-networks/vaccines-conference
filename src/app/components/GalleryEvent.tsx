// // components/Gallery.tsx
// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { BsDownload } from "react-icons/bs";

// type GalleryData = {
//     [key: string]: string[];
// };

// const galleryData: GalleryData = {
//     allDay1: [
//         "134.webp", "135.webp", "136.webp", "137.webp", "138.webp", "139.webp", "140.webp",
//         "141.webp", "142.webp", "143.webp", "144.webp", "145.webp", "146.webp", "147.webp",
//         "148.webp", "149.webp", "150.webp", "151.webp", "152.webp", "153.webp", "154.webp",
//         "155.webp", "156.webp", "157.webp", "158.webp", "159.webp", "160.webp", "161.webp",
//         "162.webp", "163.webp", "164.jpg", "165.webp", "166.webp", "167.webp", "168.webp",
//         "169.webp", "170.webp", "171.webp", "172.webp", "173.webp", "174.webp", "175.webp",
//         "176.webp", "177.webp", "178.webp", "179.webp", "180.webp", "181.webp", "182.webp",
//         "183.webp", "184.webp", "185.webp", "186.webp", "187.webp", "188.webp", "189.webp",
//         "190.webp", "191.webp", "192.webp", "193.webp", "194.webp", "195.webp", "196.webp",
//         "197.webp", "198.webp", "199.webp",
//         "1100.webp", "1101.webp", "1102.webp", "1103.webp", "1104.webp", "1105.webp", "1106.webp",
//         "1107.webp", "1108.webp", "1109.webp", "1110.webp", "1111.webp", "1112.webp", "1113.webp",
//         "1114.webp", "1115.webp", "1116.webp", "1117.webp", "1118.webp", "1119.webp",


//     ],
//     allDay2: [
//         // "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp",
//         // "8.webp", "90.webp", "10.webp", "91.webp", "12.webp", "13.webp",
//         // // ...rest of your images
//         // "107.webp",
//     ],
// };

// export default function GalleryEvent() {
//     const [columns, setColumns] = useState<JSX.Element[][]>([[], [], [], []]);
//     const colCount = 4;

//     useEffect(() => {
//         let imgIndex = 0;
//         const colArrays: JSX.Element[][] = Array.from({ length: colCount }, () => []);

//         Object.keys(galleryData).forEach((folder) => {
//             galleryData[folder].forEach((imageName) => {
//                 const imgPath = `/images/gallery-event/${folder}/${imageName}`;

//                 const imageWrapper = (
//                     <div key={`${folder}-${imageName}`} className="image-wrapper relative mb-4">
//                         <Image
//                             src={imgPath}
//                             alt="Gallery Image"
//                             width={400}
//                             height={400}
//                             className="w-100 h-auto rounded shadow-sm"
//                             loading="lazy"
//                         />
//                         <a
//                             href={imgPath}
//                             download
//                             className="download-icon absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
//                         >
//                             <BsDownload className="text-xl text-gray-700" />
//                         </a>
//                     </div>
//                 );

//                 colArrays[imgIndex % colCount].push(imageWrapper);
//                 imgIndex++;
//             });
//         });

//         setColumns(colArrays);
//     }, []);

//     return (
//         <div className="gallery-complete-page">
//             <div className="gallery-event-block">
//                 <div className="auto-container">
//                     <div className="row gallery-images-block">
//                         {columns.map((col, i) => (
//                             <div
//                                 key={i}
//                                 className="col-lg-3 col-md-4 col-sm-4 col-6 each-indiv-images-block"
//                             >
//                                 {col}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/GalleryEvent.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";

type GalleryData = {
    [key: string]: string[];
};

const galleryData: GalleryData = {
    allDay1: [
        "134.webp", "135.webp", "136.webp", "137.webp", "138.webp", "139.webp", "140.webp",
        "141.webp", "142.webp", "143.webp", "144.webp", "145.webp", "146.webp", "147.webp",
        "148.webp", "149.webp", "150.webp", "151.webp", "152.webp", "153.webp", "154.webp",
        "155.webp", "156.webp", "157.webp", "158.webp", "159.webp", "160.webp", "161.webp",
        "162.webp", "163.webp", "164.jpg", "165.webp", "166.webp", "167.webp", "168.webp",
        "169.webp", "170.webp", "171.webp", "172.webp", "173.webp", "174.webp", "175.webp",
        "176.webp", "177.webp", "178.webp", "179.webp", "180.webp", "181.webp", "182.webp",
        "183.webp", "184.webp", "185.webp", "186.webp", "187.webp", "188.webp", "189.webp",
        "190.webp", "191.webp", "192.webp", "193.webp", "194.webp", "195.webp", "196.webp",
        "197.webp", "198.webp", "199.webp",
        "1100.webp", "1101.webp", "1102.webp", "1103.webp", "1104.webp", "1105.webp", "1106.webp",
        "1107.webp", "1108.webp", "1109.webp", "1110.webp", "1111.webp", "1112.webp", "1113.webp",
        "1114.webp", "1115.webp", "1116.webp", "1117.webp", "1118.webp", "1119.webp",
    ],
    allDay2: [],
};

export default function GalleryEvent() {
    const [columns, setColumns] = useState<React.ReactNode[][]>([[], [], [], []]);
    const colCount = 4;

    useEffect(() => {
        let imgIndex = 0;
        const colArrays: React.ReactNode[][] = Array.from({ length: colCount }, () => []);

        Object.keys(galleryData).forEach((folder) => {
            galleryData[folder].forEach((imageName) => {
                const imgPath = `/images/gallery-event/${folder}/${imageName}`;

                const imageWrapper = (
                    <div key={`${folder}-${imageName}`} className="image-wrapper relative mb-4">
                        <Image
                            src={imgPath}
                            alt="Gallery Image"
                            width={400}
                            height={400}
                            className="w-100 h-auto rounded shadow-sm"
                            loading="lazy"
                        />
                        <a
                            href={imgPath}
                            download
                            className="download-icon absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
                        >
                            <BsDownload className="text-xl text-gray-700" />
                        </a>
                    </div>
                );

                colArrays[imgIndex % colCount].push(imageWrapper);
                imgIndex++;
            });
        });

        setColumns(colArrays);
    }, []);

    return (
        <div className="gallery-complete-page">
            <div className="gallery-event-block">
                <div className="auto-container">
                    <div className="row gallery-images-block">
                        {columns.map((col, i) => (
                            <div
                                key={i}
                                className="col-lg-3 col-md-4 col-sm-4 col-6 each-indiv-images-block"
                            >
                                {col}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
