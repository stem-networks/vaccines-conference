// import TermsConditions from '../components/TermsConditions'
import { getBaseUrl } from '@/lib/getBaseUrl';
import { ApiResponse } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';

// Fetch common content
// async function fetchCommonData(): Promise<CommonContent> {
//     const baseUrl = getBaseUrl();
//     const res = await fetch(`${baseUrl}/api/common-content`, {
//         method: "POST",
//         cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch common content");
//     return res.json();
// }

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
        const meta = generalData?.pages?.terms?.[0] || {
            title: "Terms of Use",
            content: "Explore the Terms of Use Content of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/terms-of-use"; // hardcode since we know this is sessions page
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
        console.error("Metadata generation error Terms of Use:", error);
        return {
            title: "Terms of Use",
            description: "Explore the Terms of Use Content of the conference.",
            keywords: "",
        };
    }
}

const TermsOfUse = async () => {

    // const commonContent = await fetchCommonData();
    // const termsConditionContentMain = commonContent?.data?.terms;
    // const termsConditionContent = termsConditionContentMain?.content ?? "";

    const generalFetch = await fetchGeneralData();
    const general = generalFetch?.data || {};

    return (
        <div>
            {/* <TermsConditions TermsConditionContent={termsConditionContent} />  */}

            {/* Breadcrumb Section */}
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title="Navigate to Homepage">Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Terms of Use</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <h2 className="abs_wrap5 wow fadeInUp animated" data-wow-delay="400ms" data-wow-duration="1000ms">
                Terms of Use
            </h2>
            <div className="auto-container">
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 mar_center">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 wow fadeInUp animated" data-wow-delay="400ms" data-wow-duration="1000ms">
                                <div className="content1">

                                    <p>By registering for STEM Network Conferences, you agree to comply with the following terms and conditions:</p>

                                    <ul>
                                        <li>The organization reserves the right to make changes to the program, date, or venue at any time without prior notice.</li>

                                        <li>While we strive to adhere to the published schedule, unforeseen circumstances may necessitate alterations.</li>

                                        <li>At its sole discretion, the organization reserves the right to cancel any conference due to unavoidable and unforeseeable circumstances. In such cases, the {general.clname ? general.clname : ""} will have no further liability to the registrant.</li>

                                        <li>If a conference is postponed due to circumstances beyond the organizer’s control, registrations will remain valid for the rescheduled event or future editions. In these instances, our refund policy does not apply.</li>

                                        <li>In the event of cancellation, the conference organizers will endeavour to inform attendees through reasonable means, such as posting the cancellation notice on the event website.</li>

                                        <li>It is the responsibility of the delegates to check for updates regarding the event.</li>

                                        <li>Delegates are advised to check the website for updates about the conference regularly.</li>

                                        <li>We will not accept liability for personal injuries or loss or damage to personal property occurring during or as a result of the conference.</li>
                                    </ul>

                                    <p>By attending our events, you acknowledge and agree to these terms.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TermsOfUse