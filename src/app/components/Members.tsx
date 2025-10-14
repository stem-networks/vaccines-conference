'use client';

import Image from "next/image";
import Link from "next/link";

interface Speaker {
  id: number;
  image: string;
  name: string;
  institution: string;
  country: string;
  altText: string;
}

const membersData: Speaker[] = [
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
];


const Members = () => {
  return (
    <div className="speakers-sections members-main-block">
      <div className="import_wrap import-wrapping">
        <div className="auto-container clearfix">
          <div className="row test-imp-row">
            <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="200ms"
              data-wow-duration="1000ms">
              <h2>Our <span>Planning Committee 2025</span></h2>

            </div>
          </div>

          <section className="blog">
            {/* <!-- container Start--> */}
            <div className="row aos-init aos-animate" data-aos="fade-up" data-aos-duration="400">
              <div className="col-md-12 col-12">
                <div className="grid-main-members-gap">
                  {membersData.map((member, index) => (
                    <div
                      key={index}
                      className={`each-member-gap ${index >= 3 ? 'member-row-gap' : ''}`}
                    >
                      <div className="grid-res-gap member-resp-gap">
                        <div className="grid-res-item">
                          <Image
                            src={member.image}
                            alt={member.name}
                            title={member.name}
                            width={200}
                            height={200}
                            className="rounded-circle img-fluid"
                          />
                        </div>
                        <div className="inner-content">
                          <h3>{member.name}</h3>
                          <p className="members-p1 member-country">{member.country}</p>
                          <p className="members-p1">{member.institution}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          <div className='members-view-all-btn-block'>
            <Link href='/committee' title="View All" className="view-more-speakers-btn">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
