// "use client"
// import React,{useState} from 'react'
// import Slider from 'react-slick';

// const WelcomeMessage = () => {

//    const [slider, setSlider] = useState(null);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 5000,
//   };

//   const handlePrevClick = () => slider?.slickPrev();
//   const handleNextClick = () => slider?.slickNext();

//   return (
//     <div className='welcome-message-latest'>
//       <div className="gradient-bg">
//         <div className="container-fluid">
//           <div className="row g-4 welcome-speak-block">
//             {/* Left Column */}
//             <div className="col-lg-6 welcome-card-gap">
//               <div className="welcome-card">
//                 <div className="index-page-video">
//                   <video
//                     controls
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="w-100 h-auto background-video-speakers"
//                     poster={pierre}
//                   >
//                     <source src="/videos/speakers_video.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="col-lg-6 latest-insight-conf">
//               <h4 className='our-speakers-head'>Our Speakers</h4>
//               <h3>Latest insights from our speakers</h3>

//               <div className="latest-speakerss-block-bg">
//                 <div className='latest-speakerss-block'>
//                   <Slider {...settings} ref={(sliderRef) => setSlider(sliderRef)}>

//                     {speakersData.map((speaker, index) => (
//                       <div className="each-spaker2-section" key={index}>
//                         <div className="latest-spakers-deialss">
//                           <Image src={speaker.image} alt={speaker.name} title={speaker.name} className="speaker-img" />
//                           <div className='speaker-img-content'>
//                             <h4>{speaker.name}</h4>
//                             <p className='speakers-latest-affilation'>{speaker.affiliation}</p>
//                             <p className='speakers-latest-affilation'>{speaker.country}</p>
//                           </div>
//                         </div>
//                         <h6>Title:</h6>
//                         <p className='speakers-latest-title'>"{speaker.title}"</p>
//                       </div>
//                     ))}

//                     {/* Add more slides here if needed */}
//                   </Slider>

//                   <div className="latest-spakers-navbtns-block">
//                     <button
//                       className="spakers-nav-button" onClick={handlePrevClick}>
//                       <i className="fa fa-chevron-left chevron-icon"></i>
//                     </button>
//                     <button
//                       className="spakers-nav-button" onClick={handleNextClick}>
//                       <i className="fa fa-chevron-right chevron-icon"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default WelcomeMessage