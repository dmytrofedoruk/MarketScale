import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useBearStore from "../context/useStore";

const HelperNav = () => {
  const location = useLocation();
  const { isMuted, setIsMuted, isTransitionDone, showCaption, setShowCaption } =
    useBearStore();

  const [isSitemapActive, setIsSitemapActive] = useState(false);
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false);
  const [isArchitectureActive, setIsArchitectureActive] = useState(false);

  return (
    <nav className={`helper-nav ${showCaption ? "caption-on" : ""}`}>
      {location.pathname !== "/" && (
        <button onClick={() => setIsArchitectureActive(!isArchitectureActive)}>
          <img
            src={
              !isArchitectureActive
                ? "/icons/system-disabled.png"
                : "/icons/system-enabled.png"
            }
            alt=""
          />
        </button>
      )}

      <button onClick={() => setIsMuted(!isMuted)}>
        <img
          draggable="false"
          src={
            isMuted ? "/icons/audio-disabled.png" : "/icons/audio-enabled.png"
          }
          alt="Mute button"
        />
      </button>

      <button>
        <img
          draggable="false"
          onClick={() => setIsSitemapActive(!isSitemapActive)}
          src={
            isSitemapActive
              ? "/icons/sitemap-enabled.png"
              : "/icons/sitemap-disabled.png"
          }
          alt="Sitemap button"
        />
      </button>

      <button onClick={() => setIsGuidedTourActive(!isGuidedTourActive)}>
        <img
          draggable="false"
          src={
            isGuidedTourActive
              ? "/icons/guidedtour-stop.png"
              : "/icons/guidedtour-start.png"
          }
          alt="Guided Tour button"
        />
      </button>

      <button
        onClick={() => setShowCaption(!showCaption)}
        className={showCaption ? "subtitle-button active" : "subtitle-button"}
      >
        CC
      </button>
    </nav>
  );
};

export default HelperNav;
