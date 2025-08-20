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
                        <h2 className="overview-heading">Previous Conference Report</h2>
                        {/* <h3 className="overview-subhead">A Journey of Innovation, Collaboration, and Excellence</h3> */}
                        <p><span>{general_info?.clname} ({general_info?.csname}-2025)</span> was successfully organized on <span>August 06–07, 2025, in Singapore,</span> bringing together global leaders, researchers, academicians, and industry experts for two days of knowledge-sharing and collaboration.</p>

                    </div>
                    <div className="auto-container">
                        <div className="content1">

                            <div className="heading Poster-heading">Highlights of the Conference</div>
                            <ul>
                                <li>
                                    <span>Global Participation:</span> Speakers and delegates from multiple countries joined the events, representing universities, research institutions, healthcare organizations, and industries.
                                </li>
                                <li>
                                    <span>Distinguished Speakers:</span> Our keynote speakers delivered insightful presentations on cutting-edge topics in catalysis, chemical engineering, green chemistry, nanotechnology, and materials science.
                                </li>
                                <li>
                                    <span>Interactive Sessions:</span> {general_info?.clname} ({general_info?.csname}-2025) featured a mix of keynote lectures, plenary talks, oral presentations, poster sessions, and panel discussions, ensuring lively interactions and meaningful academic exchange.
                                </li>

                                <li>
                                    <span>Networking Opportunities:</span> The joint gatherings created an ideal platform for participants to build collaborations, share research findings, and explore potential partnerships.
                                </li>

                                <li>
                                    <span>Poster & Young Researcher Forum:</span> Emerging scientists and students actively participated in poster competitions and young researcher forums, showcasing innovative projects and receiving valuable feedback.
                                </li>

                            </ul>

                            <div className="heading Poster-heading">Key Outcomes</div>
                            <ul>
                                <li>
                                    Strengthened international collaborations across academia and industry.
                                </li>
                                <li>
                                    Exchange of new ideas and research breakthroughs in <span>materials science, nanotechnology, nanomaterials, chemistry and chemical engineering</span>
                                </li>
                                <li>
                                    Recognition of outstanding contributions through speaker awards and best poster awards.
                                </li>
                            </ul>

                            <div className="heading Poster-heading">Acknowledgment</div>
                            <p>We extend our sincere gratitude to the <span>distinguished speakers, session chairs, delegates, sponsors, and organizing committee members</span> for their invaluable contributions to the success of {general_info?.clname} ({general_info?.csname}-2025).</p>

                            <div className="heading Poster-heading">Looking Ahead</div>
                            <p>Building on this success, we are excited to announce that the next editions of <span>{general_info?.clname}</span> will continue to provide a premier platform for advancing scientific innovation and fostering global collaboration. Details of upcoming conferences will be shared soon.</p>
                        </div>
                    </div>
                    {/* </div> */}
                </section>

                <ConferenceTabs />
            </div>
        </div>
    )
}

export default PreviousConference