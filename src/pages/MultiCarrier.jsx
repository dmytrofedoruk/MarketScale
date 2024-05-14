import React, { useEffect, useRef, useState } from "react";
import useBearStore from "../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  wirelessMultiCarrierProblems,
  wirelessMultiCarrierSolutions,
  neutralHostNetworkButtonText,
} from "../textData";
import { files, subtitleFiles } from "../utils/videoData";
import { findVideoIndex } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
// import gsap from "gsap";

const MultiCarrier = (props) => {
  const navigate = useNavigate();
  const {
    // selectedFiles,
    // setSelectedFiles,
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
  // const [activeVideoIndex, setActiveVideoIndex] = useState(1);

  // const setupSelectedFiles = () => {
    const selectedFiles = [
      "FROM_MultiCarrier.mp4", "Carri3r.mp4", "SpottyConnectivity_Infinite.mp4",
      "TO_DroppedCalls.mp4", "CallsDropped.mp4", "FROM_MultiCarrier.mp4",
      "TO_LimitedData.mp4", "DataAccess.mp4", "FROM_LimitedData.mp4",
      "TO_DeviceLatency.mp4", "LatencyDevice.mp4", "FROM_DeviceLatency.mp4",
      "TO_ReducedSecurity.mp4", "SecurityReduced.mp4", "FROM_ReducedSecurity.mp4",
      "TO_SlowIdentity.mp4", "IdentitySlow.mp4", "FROM_SlowIdentity.mp4",
      // "VerizonNeutralHost_Infinite.mp4", "VerizonNeutralHost.mp4",
      // "PrivateNetwork_Infinite.mp4", "PrivateNetwork.mp4",
    ];
    // videoRefs.current[1]?.load();
    // videoRefs.current[1]?.play();
    // setSelectedFiles(videoNames.map(name => files[findVideoIndex(name)]));
  // }; // prettier-ignore


  // const selectedFiles = [
  //   "FROM_MultiCarrier.mp4", "Carri3r.mp4", "SpottyConnectivity_Infinite.mp4",
  //   "TO_DroppedCalls.mp4", "CallsDropped.mp4", "FROM_MultiCarrier.mp4",
  //   "TO_LimitedData.mp4", "DataAccess.mp4", "FROM_LimitedData.mp4",
  //   "TO_DeviceLatency.mp4", "LatencyDevice.mp4", "FROM_DeviceLatency.mp4",
  //   "TO_ReducedSecurity.mp4", "SecurityReduced.mp4", "FROM_ReducedSecurity.mp4",
  //   "TO_SlowIdentity.mp4", "IdentitySlow.mp4", "FROM_SlowIdentity.mp4",
  //   "VerizonNeutralHost_Infinite", "VerizonNeutralHost.mp4",
  //   "PrivateNetwork_Infinite.mp4", "PrivateNetwork.mp4",
  // ];
  
  // useEffect(() => {
  //   // Preload and play the video immediately
  //   }, []);
  
    // Rest of your component code...

  // useEffect(() => {
  //   // setupSelectedFiles();
  //   setActiveVideoIndex(1);
  // }, []);
  console.log(" outside useeffect");
  videoRefs.current[1]?.play();
  
  useEffect(() => {
    // gsap.to(".business-outcome-buttons", {
    //   stagger: 0.1,
    //   opacity: 1,
    // });
    console.log(" multi care:",currentPage == "Multi-Carrier");
    if (currentPage == "Multi-Carrier") {
      console.log("currentPage multi care block:",currentPage);
      setActiveVideoIndex(1);
      videoRefs.current[1]?.play();
    }
  }, [currentPage]);


  // const playVideoSequence = (indices) => {
  //   let index = 0;

  //   const playNext = () => {
  //     if (index < indices.length) {
  //       const currentIndex = indices[index];
  //       setActiveVideoIndex(currentIndex);
  //       videoRefs.current[currentIndex].play();
  //       videoRefs.current[currentIndex].onended = () => {
  //         index++;
  //         playNext();
  //       };
  //     }
  //   };
  //   playNext();
  // };

  const playVideoSequence = (indices) => {
    let index = 0;
  
    const loopVideos = [2, 4, 7, 10, 13, 19, 21]; // Example: Video indices to loop
  
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
      case 1: playVideoSequence([2]); break;
      case 2: playVideoSequence([3, 4]); break;
      case 3: playVideoSequence([6, 7]); break;
      case 4: playVideoSequence([9, 10]); break;
      case 5: playVideoSequence([12, 13]); break;
      case 6: playVideoSequence([15, 16]); break;
      case 7: playVideoSequence([17]); break;
      case 8: playVideoSequence([18]); break;
      case 9: playVideoSequence([19]); break;
      case 10: playVideoSequence([20]); break;
      case 11: playVideoSequence([21]); break;
      default: break;
    }
  }; // prettier-ignore

  const backHandler = () => {
    const backMapping = {
      1: [0, 1], 2: [0, 5], 3: [0, 8], 4: [0, 11], 5: [0, 14], 
      6: [0, 17], 7: [0, 1, 18], 8: [0, 1, 19], 9: [0, 1, 20],
      10: [0, 1, 21], 11: [0, 1, 21],
    };
    const [resetIndex, videoIndex, pausedIndex] = backMapping[activeProblemIndex] || [0, 0];
    setActiveProblemIndex(resetIndex);
    setActiveVideoIndex(videoIndex);

    console.log("activeVideoIndex :", activeVideoIndex);
   
    if (pausedIndex) {
      videoRefs.current[pausedIndex].pause();
      videoRefs.current[pausedIndex].currentTime = 0;
    }

    if (activeVideoIndex !== null) {
      videoRefs.current[activeVideoIndex].pause();
      videoRefs.current[activeVideoIndex].currentTime = 0;
    }

    videoRefs.current[videoIndex].play();
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
    <div className="multiCarrier" style={{display: `${ currentPage == 'Multi-Carrier' ? "block" : "none" }`}}>
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
      {/* {props.someProp && ( */}
      <div className="initial-page" >
        <div className="initial-video-wrapper">
          {selectedFiles.map((video, index) => (
            <video
              key={index}
              preload="metadata"
              ref={(el) => (videoRefs.current[index] = el)}
              muted={isMuted}
              playsInline
              className={`initial-video initial-video-${index} ${
                index === activeVideoIndex && currentPage == 'Multi-Carrier' ? "visible" : "hidden"
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
            <div className="business-outcome-buttons third-demo">
              <div className="the-problem box">The Problem</div>
              {renderButtons(
                wirelessMultiCarrierProblems,
                1,
                activeProblemIndex
              )}
              {/* <div className="the-solution box">The Solution</div>
              {renderButtons(
                wirelessMultiCarrierSolutions,
                8,
                activeProblemIndex
              )} */}
            </div>
          )}

          {activeProblemIndex === 8 && (
            <div className="neutral-host-network">
              {/* <div className="neutral-host-network-box">
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
              </div> */}
              <button onClick={() => selectDemoHandler(9)}>
                {neutralHostNetworkButtonText}
              </button>
            </div>
          )}

          {activeProblemIndex === 10 && (
            <div
              onClick={() => selectDemoHandler(11)}
              className="private-network"
            />
          )}
        </div>
      </div>
      </div>
      {/* )} */}
    </>
  );
};

export default MultiCarrier;
