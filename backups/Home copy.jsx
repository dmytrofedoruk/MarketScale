import React, { useEffect, useRef, useState } from "react";
import useBearStore from "../src/context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";

// Components
import OutcomeButtons from "../src/components/OutcomeButtons";
import SecondDemoButtons from "../components/SecondDemoButtons";

// Data
import { centerNames } from "../src/textData";
import {
  conventionCenter,
  conventionCenterDemos,
} from "../src/utils/videoData";

const Home = () => {
  const initialVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const thirdVideoRef = useRef(null);
  const fromConventionVideoRef = useRef(null);

  const conventionDemoRef = useRef(null);
  const multiCarrierDemoRef = useRef(null);
  const conventionDemoRef2 = useRef(null);

  const [isDemoSelected, setIsDemoSelected] = useState(false);

  const {
    showStart,
    isMuted,
    isSequenceStarted, setIsSequenceStarted,
    isTransitionDone,setIsTransitionDone,
    conventionCenterDemo, setConventionCenterDemo,
  } = useBearStore(); // prettier-ignore

  useEffect(() => {
    if (!showStart && initialVideoRef.current) {
      setTimeout(() => {
        initialVideoRef.current.play();
      }, 500);
    }
  }, [showStart]);

  useEffect(() => {
    [
      initialVideoRef,
      secondVideoRef,
      thirdVideoRef,
      fromConventionVideoRef,
    ].forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
      }
    });
  }, [isMuted]);

  const handleTransition = () => {
    if (isSequenceStarted) return;

    setIsSequenceStarted(true);
    initialVideoRef.current.pause();
    initialVideoRef.current.currentTime = 0;

    setTimeout(() => {
      secondVideoRef.current.play();
    }, 500);

    secondVideoRef.current.onended = () => {
      setIsTransitionDone(true);
      thirdVideoRef.current.play();
    };
  };

  const resetVideoRefs = () => {
    [
      initialVideoRef,
      secondVideoRef,
      thirdVideoRef,
      fromConventionVideoRef,
    ].forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    });
  };

  const backHandler = () => {
    resetVideoRefs();
    setIsDemoSelected(false);
    setIsTransitionDone(false);
    setIsSequenceStarted(false);
    thirdVideoRef.current.pause();

    fromConventionVideoRef.current.className = "fourth-video start";
    fromConventionVideoRef.current.play();

    fromConventionVideoRef.current.onended = () => {
      initialVideoRef.current.muted = true;
      initialVideoRef.current.play();
      fromConventionVideoRef.current.className = "fourth-video";
    };
  };

  const renderTooltip = (className, tooltipText, onClickHandler = null) => (
    <div className={className} onClick={onClickHandler}>
      <span className={`${className}-tooltip`}>{tooltipText}</span>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isTransitionDone && (
          <m.button
            onClick={backHandler}
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
          <video
            muted
            ref={initialVideoRef}
            playsInline
            autoPlay
            className={`initial-video ${!isSequenceStarted ? "start" : ""}`}
          >
            <source src="/videos/InitialHome.mp4" type="video/mp4" />
          </video>

          <video
            muted
            ref={secondVideoRef}
            playsInline
            className={`initial-video-second ${
              isSequenceStarted ? "start" : ""
            }`}
          >
            <source src={conventionCenter[0]} type="video/mp4" />
          </video>

          {isSequenceStarted && (
            <video
              muted
              ref={thirdVideoRef}
              playsInline
              className={`third-video ${isTransitionDone ? "start" : ""}`}
            >
              <source src={conventionCenter[1]} type="video/mp4" />
            </video>
          )}

          <video
            muted
            ref={fromConventionVideoRef}
            playsInline
            className="fourth-video"
          >
            <source src={conventionCenter[2]} type="video/mp4" />
          </video>

          {isTransitionDone && (
            <video
              muted
              ref={conventionDemoRef}
              playsInline
              className={`fourth-video ${
                conventionCenterDemo === 0 ? "start" : ""
              }`}
            >
              <source src={conventionCenterDemos[0]} type="video/mp4" />
            </video>
          )}

          {conventionCenterDemo === 0 && (
            <video
              muted
              ref={multiCarrierDemoRef}
              playsInline
              className={`fourth-video ${
                conventionCenterDemo === 0 && isDemoSelected ? "start" : ""
              }`}
            >
              <source src={conventionCenterDemos[1]} type="video/mp4" />
            </video>
          )}

          <AnimatePresence>
            {!isSequenceStarted && <OutcomeButtons />}
          </AnimatePresence>

          <AnimatePresence>
            {isTransitionDone && <SecondDemoButtons />}
          </AnimatePresence>

          <AnimatePresence>
            {!isSequenceStarted && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="building-tooltips"
              >
                {renderTooltip(
                  "convention-center",
                  centerNames[0],
                  handleTransition
                )}
                {renderTooltip("corporate-office", centerNames[1])}
                {renderTooltip("healthcare", centerNames[2])}
                {renderTooltip("manifacturing", centerNames[3])}
                {renderTooltip("ports", centerNames[4])}
                {renderTooltip("retail", centerNames[5])}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Home;
