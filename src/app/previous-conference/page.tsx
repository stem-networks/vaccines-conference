import React from 'react'
import { ApiResponse } from '@/types';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ConferenceTabs from '../components/ConferenceTabs';

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
        const meta = generalData?.pages?.scientific_program?.[0] || {
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
    const general_info = general?.data || {};

    return (
        <div>
            {/* Breadcrumb */}
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/">Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Previous Conference</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                Previous Conference 2025
            </h2>

            <div className='past-conference-page'>
                <section className="about-conf-section">
                    {/* <div className="auto-container"> */}
                    <div className="overview-image-block">
                        <Image src="/images/images/group_image.webp" width={1200} height={500} alt={general_info?.clname} title={general_info?.clname} className="overview-img" />
                    </div>
                    <div className="overview-content-block">
                        <h2 className="overview-heading">{general_info?.csname}-{general_info?.year}</h2>
                        <h3 className="overview-subhead">A Journey of Innovation, Collaboration, and Excellence</h3>
                        <p><span>Catalysis, Chemical Engineering, and Green Chemistry (CCGC 2025)</span> and the<span>[Materials, Nanotechnology, and Nanoscience Conference (MNNC 2025)]</span> were successfully organized on<span>August 06–07, 2025, in Singapore,</span> bringing together global leaders, researchers, academicians, and industry experts for two days of knowledge-sharing and collaboration.</p>

                        {/* <p>Let’s walk through the <span>unforgettable journey of {general_info?.csname}-{general_info?.year}</span>, capturing its highlights, achievements, and defining moments.</p> */}
                    </div>
                    {/* </div> */}
                </section>

                <ConferenceTabs />
            </div>
        </div>
    )
}

export default PreviousConference