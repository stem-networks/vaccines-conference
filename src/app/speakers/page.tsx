import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { getBaseUrl } from '@/lib/getBaseUrl';
import { ApiResponse } from '@/types';
import { Metadata } from 'next';

interface Speaker {
    id: number;
    image: string;
    name: string;
    institution: string;
    country: string;
    altText: string;
}

const speakersData: Speaker[] = [
    {
        id: 1,
        image: "/images/committee-2025/pierre.png",
        name: "Pierre A. Morgon",
        institution: "CEO MRGN Advisors",
        country: "Switzerland",
        altText: "Pierre A. Morgon",
    },
    {
        id: 2,
        image: "/images/committee-2025/rafei_moutih.webp",
        name: "Rafei Moutih",
        institution: "University of Montreal",
        country: "Canada",
        altText: "Rafei Moutih",
    },
    {
        id: 3,
        image: "/images/committee-2025/tashikalmah.jpg",
        name: "Tashikalmah Hallah",
        institution: "Federal Ministry of Health and Social Welfare",
        country: "Nigeria",
        altText: "Tashikalmah Hallah",
    },
    {
        id: 4,
        image: "/images/committee-2025/nuhu_Diraso_Gapsiso.jpg",
        name: "Nuhu Diraso Gapsiso",
        institution: "University of Maiduguri",
        country: "Nigeria",
        altText: "Nuhu Diraso Gapsiso",
    },
    {
        id: 5,
        image: "/images/committee-2025/sima_Rafati.png",
        name: "Sima Rafati",
        institution: "Pasteur Institute of Iran",
        country: "Iran",
        altText: "Sima Rafati",
    },
    {
        id: 6,
        image: "/images/committee-2025/mohammad.png",
        name: "Mohammad Hossein Yazdi",
        institution: "Tehran University of Medical Sciences",
        country: "Iran",
        altText: "Mohammad Hossein Yazdi",
    },
    {
        id: 7,
        image: "/images/committee-2025/bocharova.jpg",
        name: "O.A. Bocharova",
        institution: "Russian Academy of Medical Sciences",
        country: "Russia",
        altText: "O.A. Bocharova",
    },
    {
        id: 8,
        image: "/images/committee-2025/Mya_Myat_Ngwe_Tun.jpg",
        name: "Mya Myat Ngwe Tun",
        institution: "Nagasaki University",
        country: "Japan",
        altText: "Mya Myat Ngwe Tun",
    },
    {
        id: 9,
        image: "/images/committee-2025/Ahmad_Salman.jpg",
        name: "Ahmad Salman",
        institution: "Department of Physics",
        country: "Israel",
        altText: "Ahmad Salman",
    },
    {
        id: 10,
        image: "/images/committee-2025/Sabrina_Ottolini.webp",
        name: "Sabrina Ottolini",
        institution: "University of Pavia, Department of Molecular Medicine, Pavia",
        country: "Italy",
        altText: "Sabrina Ottolini",
    },
    {
        id: 11,
        image: "/images/committee-2025/kati_theme.jpg",
        name: "Kati Thieme",
        institution: "Medical Psychology, Philipps-University Marburg",
        country: "Germany",
        altText: "Kati Thieme",
    },
    {
        id: 12,
        image: "/images/committee-2025/Paco_Pino.jpg",
        name: "Paco Pino",
        institution: "ExcellGene SA, 1870 Monthey",
        country: "Switzerland",
        altText: "Paco Pino",
    },
    {
        id: 13,
        image: "/images/committee-2025/Gabriela_Hrckova.jpg",
        name: "Gabriela Hrckova",
        institution: "Slovak Academy of Sciences",
        country: "Slovakia",
        altText: "Gabriela Hrckova",
    },
    {
        id: 14,
        image: "/images/committee-2025/Marianoi_Votta.jpg",
        name: "Mariano Votta",
        institution: "Active Citizenship Network",
        country: "Italy",
        altText: "Mariano Votta",
    },
];




async function fetchGeneralDataStatic(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch general data statically");
    return res.json();
}

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
    try {
        const generalData = await fetchGeneralDataStatic();
        const meta = generalData?.pages?.speakers?.[0] || {
            title: "Speakers",
            content: "Explore the Speakers of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/speakers"; // hardcode since we know this is sessions page
        const canonicalURL = `${getBaseUrl()}${canonicalPath}`;

        return {
            title: meta.title,
            description: meta.content,
            keywords: meta.meta_keywords,
            metadataBase: new URL(getBaseUrl()),
            alternates: {
                canonical: canonicalURL,
            },
        };
    } catch (error) {
        console.error("Metadata generation error Speakers:", error);
        return {
            title: "Speakers",
            description: "Explore the Speakers of the conference.",
            keywords: "",
        };
    }
}

const speakers = () => {
    return (
        <div>

            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Speakers</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">Our Speakers 2025</h2>

            <div className="speakers-section first-design">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'>

                                    <div className="">
                                        <div className='members-card-block committee-spacing'>
                                            <div className="row-member row">
                                                {speakersData.map((speaker, index) => (
                                                    <div
                                                        className={`col-lg-3 col-md-6 col-sm-6 mb-4 ${index < 4 ? 'members-specific-space' : 'member-spacing'
                                                            }`}
                                                        key={index}
                                                    >
                                                        <div className="card text-center p-3 border">
                                                            <div className="custom-border-wrapper">
                                                                <div className="image-wrapper mb-3">
                                                                    <Image
                                                                        src={speaker.image}
                                                                        alt={speaker.name}
                                                                        title={speaker.name}
                                                                        width={200}
                                                                        height={200}
                                                                        className="rounded-circle img-fluid"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="speaker-details normal-design">
                                                                <h3>{speaker.name}</h3>
                                                                <p>{speaker.institution}</p>
                                                                <p>{speaker.country}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default speakers