import React, { useEffect, useState, useRef } from "react";
import useBearStore from "../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import gsap from "gsap";

// Scenes
import ConventionCenter from "./ConventionCenter";

// Components
import OutcomeButtons from "../components/OutcomeButtons";

// Helpers
import { findVideoIndex } from "../utils/helpers";

// Data
import { centerNames, conventionCenterDemoButtons } from "../textData";
import { files } from "../utils/videoData";

const Home = () => {
  const navigate = useNavigate();
  const {
    isMuted,
    // selectedFiles,
    // setSelectedFiles,
    activeVideoIndex,
    setActiveVideoIndex,
    showCaption,
    currentPage,
    setCurrentPage,
  } = useBearStore();

  const videoRefs = useRef([]);

  const [isSequenceStarted, setIsSequenceStarted] = useState(false);
  const [rendercomponent, setrendercomponent] = useState(false);
  // const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const [activeScene, setActiveScene] = useState("Initial-Convention");
  const [selectedFiless, setSelectedFiles] = useState([
		files[findVideoIndex('InitialHome.mp4')],
		files[findVideoIndex('TO_CONVENTION.mp4')],
	])


  useEffect(() => {
    console.log("*********************");
    console.log("isMuted home", isMuted, activeVideoIndex)
    if (activeVideoIndex === 0 && !isMuted && currentPage == 'home') {
      console.log("inside isMuted home");
      videoRefs.current[0].currentTime = 0;
      videoRefs.current[0].play();
    }
  }, [isMuted, showCaption, currentPage]);

  // useEffect(() => {
  //   setActiveVideoIndex(0);
  //   setSelectedFiles([
  //     files[findVideoIndex("InitialHome.mp4")],
  //     files[findVideoIndex("TO_CONVENTION.mp4")],
  //   ]);
  // }, []);

  useEffect(() => {
    console.log("CurrentPage home", currentPage)
    if(currentPage == 'home'){
      setActiveVideoIndex(0);
      // gsap.to([".building-tooltips", ".business-outcome-buttons"], {
      //   stagger: 0.1,
      //   opacity: 1,
      // });
    }
  }, [currentPage]);

  const nextVideoIndexHandler = (index) => {
    // gsap.to([".building-tooltips", ".business-outcome-buttons", ".business-outcome-image"], {
    //   stagger: 0.1,
    //   opacity: 0,
    // });
    
    // setIsSequenceStarted(false);
    console.log('activeVideoIndex :',activeVideoIndex);
    console.log('index :',index);

    videoRefs.current[activeVideoIndex].pause();

    setActiveVideoIndex(index);
    // setTimeout(() => {
      videoRefs.current[index].currentTime = 0;
      videoRefs.current[index].play();

      videoRefs.current[index].addEventListener("ended", () => {
        // setSelectedFiles([]);
        // setActiveVideoIndex(null);
        // setrendercomponent(true);
        setCurrentPage('convention');
        // navigate("/convention");
      });
    // }, 250);
  };

  const renderTooltip = (className, tooltipText, videoIndex) => (
    <div className={className}>
      <span className={`${className}-tooltip`}>{tooltipText}</span>
    </div>
  );

  return (
    <>
      <section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        className="initial-page hello"
        style={{display: `${ currentPage == 'home' ? "block" : "none" }`}}
      >
        <div className="initial-video-wrapper">
          {selectedFiless.map((video, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)} // Assign ref
              playsInline
              muted={isMuted}
              autoPlay={index === 0 ? true : false}
              className={`initial-video initial-video-${index} ${
                index === activeVideoIndex &&  currentPage == 'home' ? "visible" : "hidden"
              }`}
            >
              <source src={`/videos/${video}`} type="video/mp4" />
              {showCaption && (
                <track
                  default
                  kind="captions"
                  srcLang="en"
                  src="/subtitles/InitialHome.vtt"
                />
              )}
            </video>
          ))}

          {!isSequenceStarted && (
          <AnimatePresence>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // transition={{ delay: 0.25 }}
                className="building-tooltips"
              >
                <div
                  onClick={() => nextVideoIndexHandler(1)}
                  className="convention-center"
                >
                  <span className={`convention-center-tooltip`}>
                    {centerNames[0]}
                  </span>
                </div>
                {renderTooltip("corporate-office", centerNames[1])}
                {renderTooltip("healthcare", centerNames[2])}
                {renderTooltip("manufacturing", centerNames[3])}
                {renderTooltip("ports", centerNames[4])}
                {renderTooltip("retail", centerNames[5])}
              </m.div>
          </AnimatePresence>
            )}

          <AnimatePresence>
            {!isSequenceStarted && <OutcomeButtons />}
          </AnimatePresence>
        </div>
      </section>
      <ConventionCenter showComponent={rendercomponent}/>
    </>
  );
};

export default Home;
