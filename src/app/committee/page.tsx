import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

interface Member {
    id: number;
    image: string;
    name: string;
    country: string;
    institution: string;
    altText: string;
}

const committee = () => {

    const members: Member[] = [
        {
            id: 1,
            image: "/images/committee-2025/Wucherpfennig.webp",
            name: "Kai Wucherpfennig",
            country: "United States",
            institution: "Dana Farber Cancer Institute",
            altText: "Kai Wucherpfennig",
        },
        {
            id: 2,
            image: "/images/committee-2025/Nakhasi.webp",
            name: "Hira L. Nakhasi",
            country: "United States",
            institution: "Center for Biologics Evaluation and Research (CBER) of FDA",
            altText: "Hira L. Nakhasi",
        },
        {
            id: 3,
            image: "/images/committee-2025/pierre.png",
            name: "Pierre A. Morgon",
            country: "Switzerland",
            institution: "CEO MRGN Advisors",
            altText: "Pierre A. Morgon",
        },
        {
            id: 4,
            image: "/images/committee-2025/diego.webp",
            name: "Diego Tomassone",
            country: "Italy",
            institution: "Holos Medica Clinical and Research",
            altText: "Diego Tomassone",
        },
        {
            id: 5,
            image: "/images/committee-2025/shokoh_parham.webp",
            name: "Shokoh Parham",
            country: "United Kingdom",
            institution: "University of Technology Malaysia",
            altText: "Shokoh Parham",
        },
        {
            id: 6,
            image: "/images/committee-2025/ahmed_hegazi.webp",
            name: "Ahmed G. Hegazi",
            country: "Egypt",
            institution: "National Research Center",
            altText: "Ahmed G. Hegazi",
        },
        {
            id: 7,
            image: "/images/committee-2025/elymar_pascual.webp",
            name: "Elymar A. Pascual",
            country: "Philippines",
            institution: "Talangan Integrated Nation High School",
            altText: "Elymar A. Pascual",
        },
        {
            id: 8,
            image: "/images/committee-2025/siniaia.webp",
            name: "Sinisa Franjic",
            country: "Croatia",
            institution: "Independent Research Croatia",
            altText: "Sinisa Franjic",
        },
        {
            id: 9,
            image: "/images/committee-2025/claude.webp",
            name: "Claude R Joiris",
            country: "Belgium",
            institution: "University Brussels",
            altText: "Claude R Joiris",
        },
        {
            id: 10,
            image: "/images/committee-2025/Sergey.webp",
            name: "Sergey Suchkov",
            country: "Russia",
            institution: "Sechenov University, Moscow",
            altText: "Sergey Suchkov",
        },
        {
            id: 11,
            image: "/images/committee-2025/rafei_moutih.webp",
            name: "Rafei Moutih",
            country: "Canada",
            institution: "University of Montreal",
            altText: "Rafei Moutih",
        },
        {
            id: 12,
            image: "/images/committee-2025/yehuda_shoenfeld.webp",
            name: "Yehuda Shoenfeld",
            country: "Israel",
            institution: "Sheba Medical Center",
            altText: "Yehuda Shoenfeld",
        },
    ];


    // Split members into rows of 3 for better layout control
    const memberRows = [];
    for (let i = 0; i < members.length; i += 3) {
        memberRows.push(members.slice(i, i + 3));
    }

    return (
        <div>
            {/* <Head>
                <title>{planning_committee ? planning_committee[0]?.title : ''}</title>
                <meta name="description" content={planning_committee ? planning_committee[0]?.content : ''} />
                <meta name="keywords" content={planning_committee ? planning_committee[0]?.meta_keywords : ''} />
                <link rel="canonical" href={canonicalUrl} />
            </Head> */}
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Committee</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">Our Planning Committee 2025</h2>
            <div className="speakers-sections members-main-block">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'>

                                    <section className="blog">
                                        <div className="row aos-init aos-animate"
                                            data-aos="fade-up"
                                            data-aos-duration="400">
                                            <div className="col-md-12 col-12">
                                                {memberRows.map((row, rowIndex) => (
                                                    <div key={`row-${rowIndex}`} className="grid-main-members-gap">
                                                        {row.map((member) => (
                                                            <div key={member.id} className={`each-member-gap ${rowIndex > 0 ? 'member-row-gap' : ''}`}>
                                                                <div className="grid-res-gap member-resp-gap">
                                                                    <div className="grid-res-item">
                                                                        <Image
                                                                            src={member.image}
                                                                            alt={member.altText}
                                                                            title={member.name}
                                                                            width={200}
                                                                            height={200}
                                                                            className="rounded-circle img-fluid"
                                                                            priority={rowIndex === 0} // Priority for first row only
                                                                        />
                                                                    </div>
                                                                    <div className="inner-content">
                                                                        <h3>{member.name}</h3>
                                                                        <p className='members-p1 member-country'>{member.country}</p>
                                                                        <p className='members-p1'>{member.institution}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
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

export default committee