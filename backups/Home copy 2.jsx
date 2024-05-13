import React, { useEffect, useRef, useState, useCallback } from "react";
import useBearStore from "../src/context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";

// Components
import OutcomeButtons from "../src/components/OutcomeButtons";

// Data
import {
  centerNames,
  conventionCenterDemoButtons,
  wirelessMultiCarrierProblems,
  wirelessMultiCarrierSolutions,
} from "../src/textData";
import { files } from "../src/utils/videoData";

const Home = () => {
  const {
    isSequenceStarted,
    setIsSequenceStarted,
    isTransitionDone,
    setIsTransitionDone,
    showCaption,
    isMuted,
  } = useBearStore();

  const [activeProblemIndex, setActiveProblemIndex] = useState(0);

  const [activeVideoIndex, setActiveVideoIndex] = useState(28);
  const [nextVideoIndex, setNextVideoIndex] = useState(null);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const videoRefs = useRef([]); // Array of refs for all video elements

  const findVideoIndex = (videoName) => {
    return files.findIndex((video) => video.includes(videoName));
  };

  const renderTooltip = (className, tooltipText, videoIndex) => (
    <div className={className} onClick={() => setActiveVideoIndex(45)}>
      <span className={`${className}-tooltip`}>{tooltipText}</span>
    </div>
  );

  const nextVideoIndexHandler = (currentIndex, nextIndex) => {
    console.log("current: ", currentIndex, "next: ", nextIndex);
    if (currentIndex === null) {
      setActiveVideoIndex(nextIndex);
      videoRefs.current[nextIndex].play();
    } else if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].play();

      videoRefs.current[currentIndex].onended = () => {
        if (videoRefs.current[nextIndex]) {
          setActiveVideoIndex(nextIndex);
          videoRefs.current[nextIndex].play();
          setNextVideoIndex(null);
        }
      };
    }
  };

  useEffect(() => {
    if (activeVideoIndex === 45) {
      setIsSequenceStarted(true);
      videoRefs.current[45]?.play();

      videoRefs.current[45].onended = () => {
        setActiveVideoIndex(findVideoIndex("ConventionCenter_Building.mp4"));
      };
    } else if (nextVideoIndex !== null) {
      nextVideoIndexHandler(activeVideoIndex, nextVideoIndex);
    }
  }, [activeVideoIndex, nextVideoIndex]);

  // useEffect(() => {
  //   console.log(findVideoIndex("Carri3r.mp4"));
  // }, []);

  const backHandler = (FROM, TO_PLAY) => {
    const TO_INDEX = findVideoIndex(TO_PLAY);
    const FROM_INDEX = findVideoIndex(FROM);

    setActiveVideoIndex(FROM_INDEX);
    setNextVideoIndex(TO_INDEX);

    videoRefs.current[FROM_INDEX]?.play();

    videoRefs.current[FROM_INDEX].currentTime =
      videoRefs.current[FROM_INDEX].duration;
    videoRefs.current[FROM_INDEX].onended = () => {
      nextVideoIndexHandler(FROM_INDEX, TO_INDEX);
    };
  };

  const selectDemoHandler = (demoIndex) => {
    switch (demoIndex) {
      case 1:
        setActiveDemoIndex(1);
        setNextVideoIndex(findVideoIndex("Carri3r.mp4"));
        setActiveVideoIndex(findVideoIndex("TO_MultiCarrier.mp4"));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (activeVideoIndex === 28) {
      videoRefs.current[28].currentTime = 0;
      videoRefs.current[28].muted = isMuted;

      if (showCaption) {
        videoRefs.current[28].textTracks[0].mode = "showing";
      }
    }
  }, [isMuted]);

  return (
    <>
      <AnimatePresence>
        {isSequenceStarted && (
          <m.button
            onClick={() => {
              if (activeVideoIndex === 38) {
                backHandler("SpottyConnectivity_Infinite.mp4", "Carri3r.mp4");
                setActiveDemoIndex(1);
                setActiveProblemIndex(0);
              } else if (activeVideoIndex === 32) {
                console.log("hello");
                backHandler("Carri3r.mp4", "FROM_MultiCarrier.mp4");
                setTimeout(() => {
                  backHandler(
                    "FROM_MultiCarrier.mp4",
                    "ConventionCenter_Building.mp4"
                  );
                }, 1750);
                setActiveDemoIndex(0);
              } else if (activeVideoIndex === 22) {
                backHandler(
                  "FROM_MultiCarrier.mp4",
                  "ConventionCenter_Building.mp4"
                );
                setActiveDemoIndex(0);
              } else if (activeVideoIndex === 6) {
                setIsSequenceStarted(false);
                backHandler(
                  "ConventionCenter_Building.mp4",
                  "FROM_CONVENTION.mp4"
                );

                setTimeout(() => {
                  backHandler("FROM_CONVENTION.mp4", "InitialHome.mp4");

                  setIsTransitionDone(false);
                  setIsSequenceStarted(false);
                }, 2000);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="back-button"
          >
            Back
          </m.button>
        )}
      </AnimatePresence>

      <section className="initial-page">
        <div className="initial-video-wrapper">
          {files.map((video, index) => (
            <video
              autoPlay
              key={video}
              ref={(el) => (videoRefs.current[index] = el)} // Assign ref
              muted
              playsInline
              className={`initial-video initial-video-${index} ${
                index === activeVideoIndex ? "visible" : "hidden"
              }`}
            >
              <source src={`/videos/${video}`} type="video/mp4" />

              {showCaption && index === 28 && (
                <track
                  label="English"
                  kind="captions"
                  srcLang="en"
                  src="/subtitles/InitialHome.vtt"
                  default
                />
              )}
            </video>
          ))}

          <AnimatePresence>
            {!isSequenceStarted && <OutcomeButtons />}
          </AnimatePresence>

          {isSequenceStarted && activeDemoIndex !== 1 && (
            <div className="business-outcome-buttons second-demo">
              {conventionCenterDemoButtons.map((buttonText, index) => (
                <m.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.75 }}
                  key={index}
                  onClick={() => selectDemoHandler(index + 1)}
                  className={`business-outcome-button ${
                    index + 1 === activeDemoIndex ? "active" : ""
                  }`}
                >
                  {buttonText}
                </m.button>
              ))}
            </div>
          )}

          {isSequenceStarted &&
            activeDemoIndex === 1 &&
            activeProblemIndex === 0 && (
              <div className="business-outcome-buttons third-demo">
                <div className="the-problem box">The Problem</div>
                {wirelessMultiCarrierProblems.map((buttonText, index) => (
                  <m.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index}
                    onClick={() => {
                      setActiveProblemIndex(index + 1);
                      index === 0 &&
                        nextVideoIndexHandler(
                          null,
                          findVideoIndex("SpottyConnectivity_Infinite.mp4")
                        );
                    }}
                    className={`business-outcome-button ${
                      index + 1 === activeProblemIndex ? "active" : ""
                    }`}
                  >
                    {buttonText}
                  </m.button>
                ))}
                <div className="the-solution box">The Solution</div>
                {wirelessMultiCarrierSolutions.map((buttonText, index) => (
                  <m.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index}
                    onClick={() => selectDemoHandler(index + 7)}
                    className={`business-outcome-button ${
                      index + 7 === activeDemoIndex ? "active" : ""
                    }`}
                  >
                    {buttonText}
                  </m.button>
                ))}
              </div>
            )}

          <AnimatePresence>
            {!isSequenceStarted && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="building-tooltips"
              >
                {renderTooltip("convention-center", centerNames[0], 1)}
                {renderTooltip("corporate-office", centerNames[1], 2)}
                {renderTooltip("healthcare", centerNames[2], 3)}
                {renderTooltip("manufacturing", centerNames[3], 4)}
                {renderTooltip("ports", centerNames[4], 5)}
                {renderTooltip("retail", centerNames[5], 6)}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Home;
