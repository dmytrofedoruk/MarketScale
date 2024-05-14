import React, { useEffect, useRef, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import useBearStore from "../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
// import gsap from "gsap";s
import MultiCarrier from "./MultiCarrier";
import CashierlessCheckout from "./CashierlessCheckout";
import AcceleratedAccess from "./AcceleratedAccess";

// Data
import { conventionCenterDemoButtons } from "../textData";
import { files } from "../utils/videoData";
import { findVideoIndex } from "../utils/helpers";

// const MultiCarrierLazy = lazy(() => import("./MultiCarrier"));

const ConventionCenter = (props) => {
  const navigate = useNavigate();
  const {
    selectedFiles,
    setSelectedFiles,
    activeVideoIndex,
    setActiveVideoIndex,
    activeDemoIndex,
    setActiveDemoIndex,
    isMuted,
    showCaption,
    currentPage,
    setCurrentPage
  } = useBearStore();

  const videoRefs = useRef([]);
  const [nextCom, setNextCom] = useState(true);
  const [isSequenceStarted, setIsSequenceStarted] = useState(false);
  const [isShowMultiCarrier, setShowMultiCarrier] = useState(false);
  // const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const selectedFiless = [
    files[findVideoIndex("FROM_CONVENTION.mp4")],
    files[findVideoIndex("ConventionCenter_Building.mp4")],
    files[findVideoIndex("TO_MultiCarrier.mp4")],
    files[findVideoIndex("TO_Cashierless.mp4")],
    files[findVideoIndex("TO_AcceleratedAccess.mp4")],
  ];

  useEffect(() => {
    console.log("*********************");
    console.log("hello", activeVideoIndex, isMuted, showCaption)    
    if (activeVideoIndex === 1 && !isMuted  && currentPage == 'convention') {
      console.log(" inside isMuted conventation center")
      videoRefs.current[1].currentTime = 0;
      videoRefs.current[1].play();
    }
  }, [isMuted, showCaption, currentPage]);

  useEffect(() => {
    console.log("CurrentPage", currentPage)
    if(currentPage == "convention"){
      setActiveVideoIndex(1);
      // gsap.to([".business-outcome-buttons"], {
      //   opacity: 1,
      // });
    }
    // MultiCarrierLazy.preload();
    // setSelectedFiles([
    //   files[findVideoIndex("FROM_CONVENTION.mp4")],
    //   files[findVideoIndex("ConventionCenter_Building.mp4")],
    //   files[findVideoIndex("TO_MultiCarrier.mp4")],
    //   files[findVideoIndex("TO_Cashierless.mp4")],
    //   files[findVideoIndex("TO_AcceleratedAccess.mp4")],
    // ]);
    // console.log("pre-load- conventation");
    // gsap.from(".business-outcome-button", {
    //   stagger: 0.1,
    //   opacity: 1,
    // });
  }, [currentPage]);


  const backHandler = () => {
    // gsap.to(".business-outcome-buttons", {
    //   stagger: 0.1,
    //   opacity: 0,
    // });
    videoRefs.current[activeVideoIndex].pause();
    setActiveVideoIndex(0);

    videoRefs.current[0].play();
    videoRefs.current[0].addEventListener("ended", () => {
      setCurrentPage('home');
      setSelectedFiles([]);
      // navigate("/");
      // setIsSequenceStarted(true);
    });
  };

  const demoSelectionHandler = (title, index) => {
    const currentVideoIndex = index + 2;
    console.log('currentVideoIndex :', currentVideoIndex);
    setActiveVideoIndex(currentVideoIndex)
    videoRefs.current[currentVideoIndex].play()

    // gsap.to('.business-outcome-buttons', {
    //   stagger: 0.1,
    //   opacity: 0,
    // })

    videoRefs.current[currentVideoIndex].addEventListener('ended', () => {
      setSelectedFiles([])
      setCurrentPage(title);
      // navigate(link);
      // setShowMultiCarrier(true);
    })
}

  return (
    <>
    <div className={`${ props.showComponent ? "visible" : "hidden" }`} style={{display: `${ currentPage == 'convention' ? "block" : "none" }`}}>
      <AnimatePresence>
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="back-button"
          onClick={backHandler}
        >
          Back
        </m.button>
      </AnimatePresence>
      {!isSequenceStarted && (
      <div className="initial-page">
        <div className="initial-video-wrapper">
          {selectedFiless.map((video, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              muted={isMuted}
              autoPlay={index === 1 ? true : false}
              playsInline
              className={`initial-video initial-video-${index} ${
                index === activeVideoIndex ? "visible" : "hidden"
              }`}
            >
              <source src={`/videos/${video}`} type="video/mp4" />
              {showCaption && (
                <track
                  default
                  kind="captions"
                  srcLang="en"
                  src="/subtitles/ConventionCenter_Building.vtt"
                />
              )}
            </video>
          ))}

          <div className="business-outcome-buttons second-demo">
          {conventionCenterDemoButtons.map((buttonData, index) => (
									<button
										onClick={() => demoSelectionHandler(buttonData.title, index)}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										key={index}
										className={`business-outcome-button ${
											index + 1 === activeDemoIndex ? 'active' : ''
										}`}
									>
										{buttonData.title}
									</button>
								))}
          </div>
        </div>
      </div>
         )}
         {/* {currentPage == "convention" && ( */}
          {/* <div> */}
          {/* </div> */}
        {/* )} */}
      </div>
            <MultiCarrier/>
            {/* <CashierlessCheckout/> */}
            {/* <AcceleratedAccess/> */}
    </>
  );
};

export default ConventionCenter;
