import React from 'react'
import { ApiResponse } from '@/types';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Metadata } from 'next';
import Link from 'next/link';
import GalleryEvent from '../components/GalleryEvent';
// import Image from 'next/image';

async function fetchGeneralData(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch general data");
    return res.json();
}

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
        const meta = generalData?.pages?.previous_conference?.[0] || {
            title: "Previous Conference",
            content: "Explore the Previous Conference of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/previous-conference"; // hardcode since we know this is sessions page
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
        console.error("Metadata generation error Previous Conference:", error);
        return {
            title: "Previous Conference",
            description: "Explore the Previous Conference of the conference.",
            keywords: "",
        };
    }
}

const PreviousConference = async () => {

    const general = await fetchGeneralData();
    // const general_info = general?.data || {};

    return (
        <div>
            {/* Breadcrumb */}
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1000ms">
                            <Link href="/">Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Previous Conference</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                Previous Conferences Gallery
            </h2>

            <GalleryEvent general={general} />
        </div>
    )
}

export default PreviousConference