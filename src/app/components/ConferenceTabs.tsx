"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ConferenceSessions() {
  const [activeSession, setActiveSession] = useState<string>("Oral Speakers");

  // Session content (no Day1/Day2 separation now)
  const sessions: Record<string, { images: string[]; description: string }> = {

    "Oral Speakers": {
      images: [
        "/images/gallery-event/oral-speakers/1.webp",
        "/images/gallery-event/oral-speakers/2.webp",
        "/images/gallery-event/oral-speakers/3.webp",
        "/images/gallery-event/oral-speakers/4.webp",
        "/images/gallery-event/oral-speakers/5.webp",
        "/images/gallery-event/oral-speakers/6.webp",
        "/images/gallery-event/oral-speakers/7.webp",
        "/images/gallery-event/oral-speakers/8.webp",
      ],
      description: "Oral presentations from selected speakers.",
    },
    "Keynotes": {
      images: [
        "/images/gallery-event/keynotes/1.webp",
        "/images/gallery-event/keynotes/2.webp",
        "/images/gallery-event/keynotes/3.webp",
        "/images/gallery-event/keynotes/4.webp",
        // "/images/gallery-event/keynotes/5.webp",
        // "/images/gallery-event/keynotes/6.webp",
        // "/images/gallery-event/keynotes/7.webp",
        // "/images/gallery-event/keynotes/8.webp",
      ],
      description: "Inspiring keynote sessions from industry leaders.",
    },
    "Panel Discussion": {
      images: [
        "/images/gallery-event/panel-discussion/1.webp",
        "/images/gallery-event/panel-discussion/2.webp",
        "/images/gallery-event/panel-discussion/3.webp",
        "/images/gallery-event/panel-discussion/4.webp",
        "/images/gallery-event/panel-discussion/5.webp",
        "/images/gallery-event/panel-discussion/6.webp",
        "/images/gallery-event/panel-discussion/7.webp",
        "/images/gallery-event/panel-discussion/8.webp",
      ],
      description: "Interactive panel discussions on emerging trends.",
    },
    "Certificate Presentation Ceremony": {
      images: [
        "/images/gallery-event/certificates/1.webp",
        "/images/gallery-event/certificates/2.webp",
        "/images/gallery-event/certificates/3.webp",
        "/images/gallery-event/certificates/4.webp",
        "/images/gallery-event/certificates/5.webp",
        // "/images/gallery-event/certificates/6.webp",
        // "/images/gallery-event/certificates/7.webp",
        // "/images/gallery-event/certificates/8.webp",
      ],
      description: "Interactive panel discussions on emerging trends.",
    },
    // "Posters": {
    //   images: [
    //     "/images/gallery-event/posters/1.webp",
    //     "/images/gallery-event/posters/2.webp",
    //     "/images/gallery-event/posters/3.webp",
    //     "/images/gallery-event/posters/4.webp",
    //     "/images/gallery-event/posters/5.webp",
    //     "/images/gallery-event/posters/6.webp",
    //     "/images/gallery-event/posters/7.webp",
    //     "/images/gallery-event/posters/8.webp",
    //   ],
    //   description: "Poster presentations showcasing innovative research.",
    // },
    "Coffee Break": {
      images: [
        "/images/gallery-event/coffee/1.webp",
        "/images/gallery-event/coffee/2.webp",
        "/images/gallery-event/coffee/3.webp",
        "/images/gallery-event/coffee/4.webp",
        // "/images/gallery-event/coffee/5.webp",
        // "/images/gallery-event/coffee/6.webp",
        // "/images/gallery-event/coffee/7.webp",
        // "/images/gallery-event/coffee/8.webp",
      ],
      description: "Networking and casual discussions over coffee.",
    },
    "Lunch Break": {
      images: [
        "/images/gallery-event/lunch/1.webp",
        "/images/gallery-event/lunch/2.webp",
      ],
      description: "Lunch networking session with delegates.",
    },
  };

  // Scroll to heading
  const scrollToHeading = () => {
    const heading = document.getElementById("session-heading");
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <section className="sessions-block">
        {/* <div className="tab-day-heading">
          <div className="auto-container">
            <h3 id="session-heading" className="day-heading-text">
              Conference Sessions & Highlights
            </h3>
          </div>
        </div> */}

        {/* Session buttons */}
        <div className="day-break-blocks mt-6">
          <div className="auto-container">
            <div className="custom-pill-buttons">
              {Object.keys(sessions).map((session) => (
                <button
                  key={session} title={session}
                  className={`pill-btn ${activeSession === session ? "active" : ""}`}
                  onClick={() => {
                    setActiveSession(session);
                    scrollToHeading();
                  }}
                >
                  {session}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic content */}
        <div className="days-content-block">
          <div className="auto-container">
            {/* <div className="days-main-para">
              <p>{sessions[activeSession].description}</p>
            </div> */}

            {/* Gallery */}
            <div className="gallery-grid">
              {sessions[activeSession].images.map((img, idx) => (
                <div key={idx} className="gallery-card wow fadeInUp"
                  data-wow-delay={`${idx * 150}ms`}
                  data-wow-duration="1000ms">
                  <Image
                    src={img}
                    alt={activeSession}
                    width={300}
                    height={400}
                    className="rounded-lg shadow-md"
                    title={activeSession}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      <div className="gallery-complete-block wow fadeInUp">
        <Link href="./gallery-of-event" className="gallery-complete-btn" title="View Complete Gallery">
          View Complete Gallery
        </Link>
      </div>
    </div>
  );
}
