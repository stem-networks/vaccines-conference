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
];

const Speakers = () => {
  return (
    <div className="speakers-section first-design">
      <div className="import_wrap">
        <div className="auto-container clearfix">
          <div className="row test-imp-row">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <h2>
                Our <span>Speakers 2025</span>
              </h2>
            </div>
          </div>

          <div className="">
            <div className="members-card-block">
              <div className="row-member row">
                {speakersData.map((speaker, index) => (
                  <div
                    className={`col-lg-3 col-md-6 col-sm-6 mb-4 ${index < 4
                      ? 'members-specific-space'
                      : 'member-spacing'
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

          <div className="members-view-all-btn-block">
            <Link
              href="/speakers"
              title="View All"
              className="view-more-speakers-btn"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
