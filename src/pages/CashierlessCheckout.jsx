import React, { useEffect, useRef, useState } from "react";
import useBearStore from "../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  cashierlessCheckoutProblems,
  cashierlessCheckoutSolutions,
  cashierlessCheckouthowItWorks,
  neutralHostNetworkButtonText,
} from "../textData";
import { files, subtitleFiles } from "../utils/videoData";
import { findVideoIndex } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const CashierlessCheckout = () => {
  const navigate = useNavigate();
  const {
    // selectedFiles,
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
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);

  const selectedFiles = [
    "FROM_Cashierless.mp4", "Cashierless.mp4",
    "TO_LongQueues.mp4", "LongQueues.mp4", "FROM_LongQueues.mp4", 
    "VerizonCashierlessSolution.mp4", "VerizonCashierlessSolution.mp4", "VerizonCashierlessSolution.mp4",
    "TO_Authentication.mp4", "Authentication.mp4", "FROM_Authentication.mp4",
    "TO_ItemTracking.mp4", "ItemTracking.mp4", "FROM_ItemTracking.mp4",
    "TO_CashierlessOut.mp4", "CashierlessOut.mp4", "FROM_CashierlessOut.mp4",
    "TO_CashierlessSecurity.mp4", "CashierlessSecurity.mp4", "FROM_CashierlessSecurity.mp4",
  ];

  // const setupSelectedFiles = () => {
  //   const videoNames = [
  //     "FROM_Cashierless.mp4", "Cashierless.mp4",
  //     "TO_LongQueues.mp4", "LongQueues.mp4", "FROM_LongQueues.mp4", 
  //     "VerizonCashierlessSolution.mp4", "VerizonCashierlessSolution.mp4", "VerizonCashierlessSolution.mp4",
  //     "TO_Authentication.mp4", "Authentication.mp4", "FROM_Authentication.mp4",
  //     "TO_ItemTracking.mp4", "ItemTracking.mp4", "FROM_ItemTracking.mp4",
  //     "TO_CashierlessOut.mp4", "CashierlessOut.mp4", "FROM_CashierlessOut.mp4",
  //     "TO_CashierlessSecurity.mp4", "CashierlessSecurity.mp4", "FROM_CashierlessSecurity.mp4",
  //   ];
  //   setSelectedFiles(videoNames.map(name => files[findVideoIndex(name)]));
  // };  

  // useEffect(() => {
  //   setupSelectedFiles();
  //   setActiveVideoIndex(1);
  // }, []);

  videoRefs.current[1]?.play();

  // useEffect(() => {
  //   if (selectedFiles.length > 0) {
  //     videoRefs.current[1]?.play();
  //   }
  // }, [selectedFiles]);

  useEffect(() => {
    gsap.to(".business-outcome-buttons", {
      stagger: 0.1,
      opacity: 1,
    });
    if (currentPage == "Cashierless-Checkout") {
      setActiveVideoIndex(1);
      videoRefs.current[1]?.play();
    }
  }, [currentPage]);

  const playVideoSequence = (indices) => {
    let index = 0;
  
    const loopVideos = [3,6,9,12,15,18]; // Example: Video indices to loop
  
    const playNext = () => {
      if (index < indices.length) {
        const currentIndex = indices[index];
        setActiveVideoIndex(currentIndex);
        videoRefs.current[currentIndex].play();
        
  
        console.log("activeVideoIndex :", activeVideoIndex);
        const shouldLoop = loopVideos.includes(currentIndex);
  
        videoRefs.current[currentIndex].onended = () => {
          index++;
          if (shouldLoop) {
            videoRefs.current[currentIndex].currentTime = 0; // Rewind the video
            videoRefs.current[currentIndex].play(); // Play the video again
          } else {
            playNext(); // Proceed to the next video
          }
        };
      }
    };
  
    playNext();
  };

  const selectDemoHandler = (index) => {
    console.log("index", index);
    setActiveProblemIndex(index);

    switch (index) {
      case 1: playVideoSequence([2, 3]); break;
      case 2: playVideoSequence([5, 6]); break;
      case 3: playVideoSequence([8, 9]); break;
      case 4: playVideoSequence([11, 12]); break;
      case 5: playVideoSequence([14, 15]); break;
      case 6: playVideoSequence([17, 18]); break;
      default: break;
    }
  }; // prettier-ignore

  const backHandler = () => {
    const backMapping = {
      1: [0, 4], 2: [0, 1], 3: [0, 10], 4: [0, 13], 5: [0, 16], 
      6: [0, 19],
    };
    console.log("activeProblemIndex :",activeProblemIndex);
    const [resetIndex, videoIndex, pausedIndex] = backMapping[activeProblemIndex] || [0, 0];
    console.log("resetIndex :",resetIndex);

    setActiveVideoIndex(videoIndex);
   
    if (pausedIndex) {
      videoRefs.current[pausedIndex].pause();
      videoRefs.current[pausedIndex].currentTime = 0;
    }
    
    if (activeVideoIndex !== null) {
      videoRefs.current[activeVideoIndex].pause();
      videoRefs.current[activeVideoIndex].currentTime = 0;
    }

    videoRefs.current[videoIndex].play();
    setActiveProblemIndex(resetIndex);
    videoRefs.current[videoIndex].onended = () => {
      setActiveVideoIndex(1);
      videoRefs.current[1]?.play();
    };
    if (videoIndex === 0) {
      videoRefs.current[0].addEventListener("ended", () => {
        // setSelectedFiles([]);
        setCurrentPage('convention');
      });
    }
  }; // prettier-ignore

  const renderButtons = (texts, offset, activeIndex) =>
    texts.map((text, index) => (
      <m.button
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => {
          if (index + offset + 1 === 10) {
            selectDemoHandler(11);
            return;
          }
          selectDemoHandler(
            index + offset === activeIndex ? offset : index + offset
          );
        }}
        className={`business-outcome-button ${
          index + offset === activeIndex ? "active" : ""
        }`}
      >
        {text}
      </m.button>
    ));

  return (
    <>
        <div className="Cashierless-Checkout" style={{display: `${ currentPage == 'Cashierless-Checkout' ? "block" : "none" }`}}>
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

      <div className="initial-page">
        <div className="initial-video-wrapper">
          {selectedFiles.map((video, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              muted={isMuted}
              playsInline
              className={`initial-video initial-video-${index} ${
                index === activeVideoIndex && currentPage == 'Cashierless-Checkout' ? "visible" : "hidden"
              }`}
            >
              <source src={`/videos/${video}`} type="video/mp4" />
              {subtitleFiles
                .filter((subtitle) => subtitle.startsWith(video.split(".")[0]))
                .map(
                  (subtitle, subtitleIndex) =>
                    showCaption && (
                      <track
                        key={subtitleIndex}
                        src={`/subtitles/${subtitle}`}
                        kind="captions"
                        srcLang="en"
                        default={subtitle.endsWith(".vtt")}
                      />
                    )
                )}
              Your browser does not support the video tag.
            </video>
          ))}

          {activeProblemIndex === 0 && (
            <div className="business-outcome-buttons-left third-demo">
              <div className="the-problem box">The Problem</div>
              {renderButtons(
                cashierlessCheckoutProblems,
                1,
                activeProblemIndex
              )}
              <div className="the-solution box">Solution</div>
              {renderButtons(
                cashierlessCheckoutSolutions,
                2,
                activeProblemIndex
              )}
              <div className="the-solution box">How it works</div>
              {renderButtons(
                cashierlessCheckouthowItWorks,
                3,
                activeProblemIndex
              )}
            </div>
          )}

          {/* {activeProblemIndex === 1 && (
            <div className="tradition-checkout">
              <div className="neutral-host-network-box">
                <p>Tradional Checkout</p>
                <p>
                  Long queues at concession stands due to slow checkout processes.
                </p>
              </div>
            </div>
          )} */}

          {/* {activeProblemIndex === 8 && (
            <div className="neutral-host-network">
              <div className="neutral-host-network-box">
                <p>Neutral Host Network</p>
                <p>
                  Ensures seamless universal access for attendees and
                  exhibitors.
                </p>
                <p>
                  Enhances user experience and supports efficient business
                  operation.
                </p>
                <p>
                  Sets a new standard for digital excellence in event spaces.
                </p>
              </div>
              <button onClick={() => selectDemoHandler(9)}>
                {neutralHostNetworkButtonText}
              </button>
            </div>
          )} */}

          {/* {activeProblemIndex === 10 && (
            <div
              onClick={() => selectDemoHandler(11)}
              className="private-network"
            />
          )} */}
        </div>
      </div>
      </div>
    </>
  );
};

export default CashierlessCheckout;
