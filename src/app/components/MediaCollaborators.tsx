'use client';

import React, { useEffect, useRef } from "react";
import Link from 'next/link'
import Image from 'next/image'

const MediaCollaborators = () => {
    const sliderRef = useRef<HTMLUListElement | null>(null);
    const animationFrameId = useRef<number | null>(null);
    let scrollPosition = 0;

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const slideElement = slider.querySelector('.slideimg') as HTMLElement;
        if (!slideElement) return;

        // const slideWidth = slideElement.offsetWidth; 

        // Clone slides for seamless loop
        slider.innerHTML += slider.innerHTML;

        // Auto-slide functionality
        const autoSlide = () => {
            scrollPosition -= 1;

            if (Math.abs(scrollPosition) >= slider.scrollWidth / 2) {
                scrollPosition = 0;
            }

            slider.style.transform = `translateX(${scrollPosition}px)`;
            animationFrameId.current = requestAnimationFrame(autoSlide);
        };

        autoSlide(); // Start auto-slide

        const handleMouseEnter = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };

        const handleMouseLeave = () => {
            autoSlide();
        };

        slider.addEventListener("mouseenter", handleMouseEnter);
        slider.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup on unmount
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            slider.removeEventListener("mouseenter", handleMouseEnter);
            slider.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="media-collaborators-block">
            <div className="pnc-partners">
                {/* <h2>Partnered Content Networks</h2> */}
                <div className="faq_wrap">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div
                                className="col-md-12 session_wrap_style1 wow fadeInUp"
                                data-wow-delay="200ms"
                                data-wow-duration="1000ms"
                            >
                                <h3 className="bot_wrap157 mty155">
                                    Media <span className="org_wrap">and Collaborators</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-container">
                    <ul className="slider" ref={sliderRef}>
                        {/* Original Image Slides (without duplication) */}
                        <li className="slideimg">
                            <Link href="https://allconferencealert.net/" title="All Conference Alert" target="_blank">
                                <Image src="/images/media-collaborators/all_conf_alert.webp" alt="All Conference Alert" title="All Conference Alert" width={180} height={100} />
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://kindcongress.com/event/vgs-2025/" title="Kind Congress" target="_blank">
                                <Image src="/images/media-collaborators/kind_cong.webp" alt="Kind Congress" title="Kind Congress" width={180} height={100}/>
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://internationalconferencealerts.com/" title="International Conference Alerts" target="_blank">
                                <Image src="/images/media-collaborators/intern_conf_alerts.webp" alt="International Conference Alerts" title="International Conference Alerts" width={180} height={100}/>
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://eventsnotification.com/event/42269" title="Events Notification" target="_blank">
                                <Image src="/images/media-collaborators/events_notification.webp" alt="Events Notification" title="Events Notification" width={180} height={100}/>
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://www.clocate.com/vaccine-global-summit-vgs/105044/" title="Conference Locate" target="_blank">
                                <Image src="/images/media-collaborators/conference_locate.webp" alt="Conference Locate" title="Conference Locate" width={180} height={100}/>
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://www.conferencelists.org/event/vaccine-global-summit/" title="Conference List" target="_blank">
                                <Image src="/images/media-collaborators/conference_list.webp" alt="Conference List" title="Conference List" width={180} height={100}/>
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://www.conference2go.com/event/vaccines-global-summit/" title="Conference2go" target="_blank">
                                <Image src="/images/media-collaborators/conference2go.webp" alt="Conference2go" title="Conference2go" width={180} height={100}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MediaCollaborators