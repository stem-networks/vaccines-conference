import React from 'react'
import Link from 'next/link'
import GalleryEvent from '../components/GalleryEvent'

const page = () => {
    return (
        <div>
            {/* Breadcrumb */}
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/">Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Gallery of Complete Event</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                Gallery of Complete Event
            </h2>

            {/* <!-- All Images  --> */}
            <GalleryEvent />
        </div>
    )
}

export default page