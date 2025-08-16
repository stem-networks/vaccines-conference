"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ConferenceTabs() {
  const [activeTab, setActiveTab] = useState<"Day1" | "Day2">("Day1");
  // const [activeTab, setActiveTab] = useState<"Day1" | "Day2">("Day1");
  const [activeSession, setActiveSession] = useState<string>("Coffee Break");

  // Dummy content for sessions
  const sessionContent: Record<string, { images: string[]; description: string }> = {
    "Coffee Break": {
      images: ["/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Networking and casual discussions over coffee.",
    },
    "Keynotes": {
      images: ["/images/images/Ephraim_Suhir.jpg", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Ephraim_Suhir.jpg", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Inspiring keynote sessions from industry leaders.",
    },
    "Posters": {
      images: ["/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Poster presentations showcasing innovative research.",
    },
    "Oral speakers": {
      images: ["/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Oral presentations from selected speakers.",
    },
    "Lunch Break": {
      images: ["/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Lunch networking session with delegates.",
    },
    "Panel Discussion": {
      images: ["/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp", "/images/images/Debasish.webp"],
      description: "Interactive panel discussions on emerging trends.",
    },
  };
  return (
    <div>
      <section className="tabs-navigation-block">
        <section className="tab-view-days-block">
          <div className="auto-container text-center">
            {/* Tab Navigation */}
            <div className="nav nav-tabs custom-tabs justify-content-center" role="tablist">
              <button
                className={`nav-link ${activeTab === "Day1" ? "active" : ""}`}
                onClick={() => setActiveTab("Day1")}
                role="tab"
                aria-selected={activeTab === "Day1"}
                title="Day-1"
              >
                Day-1
              </button>
              <button
                className={`nav-link ${activeTab === "Day2" ? "active" : ""}`}
                onClick={() => setActiveTab("Day2")}
                role="tab"
                aria-selected={activeTab === "Day2"}
                title="Day-2"
              >
                Day-2
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content mt-5">
            {activeTab === "Day1" && (
              <div className="tab-pane active" role="tabpanel">
                <div className="day1-main-block">
                  <div className="tab-day-heading">
                    <h3 className="day-heading-text">
                      Day 1: Insightful Discussions & Groundbreaking Ideas
                    </h3>
                  </div>

                  {/* Dynamic content based on selected session */}
                  <div className="days-content-block">
                    <div className="auto-container">
                      <div className="days-main-para">
                        {/* <p>{sessionContent[activeSession].description}</p> */}
                        <p>
                          The event commenced with an inspiring opening ceremony
                          that highlighted the significance of{" "}
                          <span>collaborative efforts in nursing innovation</span>.
                          The introduction set the tone for an engaging and
                          knowledge-driven conference, emphasizing the{" "}
                          <span>
                            critical role of research, patient care advancements,
                            and interdisciplinary cooperation.
                          </span>
                        </p>
                      </div>

                      {/* Gallery */}
                      <div className="gallery-grid">
                        {sessionContent[activeSession].images.map((img, idx) => (
                          <div key={idx} className="gallery-card">
                            <Image
                              src={img}
                              alt={activeSession}
                              width={300}
                              height={400}
                              className="rounded-lg shadow-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Session buttons */}
                  <div className="day-break-blocks mt-6">
                    <div className="auto-container">
                      <div className="custom-pill-buttons">
                        {Object.keys(sessionContent).map((session) => (
                          <button
                            key={session}
                            className={`pill-btn ${activeSession === session ? "active" : ""}`}
                            onClick={() => setActiveSession(session)}
                          >
                            {session}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Day2" && (
              <div className="tab-pane active" role="tabpanel">
                <div className="day2-main-block">
                  <div className="tab-day-heading">
                    <h3 className="day-heading-text">
                      Day 2: Recognizing Excellence & Expanding Global Insights
                    </h3>
                  </div>

                  <div className="days-content-block">
                    <p>Day 2 content goes here...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </section>

      <div className="gallery-complete-block">
        <Link href="./gallery-of-event" className="gallery-complete-btn">Gallery of Complete Event</Link>
      </div>
    </div>
  );
}
