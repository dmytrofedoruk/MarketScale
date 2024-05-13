import React, { useState, useEffect, useRef } from "react";
import useBearStore from "../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";

// Data
import { businessOutcomeButtons } from "../textData";
import { businessOutcomeImages } from "../utils/imageData";

const OutcomeButtons = ({ isSequenceStarted }) => {
  const { setOutcomeImage } = useBearStore();
  const [activeIndex, setActiveIndex] = useState(null);
  const prevIndexRef = useRef(null);

  const outcomeButtonClick = (imageUrl, index) => {
    setActiveIndex(index);
    setOutcomeImage(imageUrl);
  };

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    // Preload images
    businessOutcomeImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <>
      <div className="business-outcome-buttons">
        <m.div
          exit={{ opacity: 0 }}
          className={
            activeIndex !== null
              ? "cityofthefuture-box"
              : "cityofthefuture-box hide"
          }
        >
          <img draggable="false" src="/images/future-box.png" alt="" />
        </m.div>
        {businessOutcomeButtons.map((buttonText, index) => (
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() =>
              outcomeButtonClick(businessOutcomeImages[index], index)
            }
            key={index}
            className={`business-outcome-button ${
              index === activeIndex ? "active" : ""
            }`}
          >
            {buttonText}
          </m.button>
        ))}
      </div>

      {prevIndexRef.current !== null &&
        prevIndexRef.current !== activeIndex && (
          <m.img
            exit={{ opacity: 0 }}
            key={`image-${prevIndexRef.current}`}
            transition={{ duration: 0.3 }}
            src={businessOutcomeImages[prevIndexRef.current]}
            alt="Previous Business Outcome"
            className="business-outcome-image previous"
          />
        )}

      {activeIndex !== null && (
        <m.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={`image-${activeIndex}`}
          src={businessOutcomeImages[activeIndex]}
          alt="Current Business Outcome"
          className="business-outcome-image"
        />
      )}
    </>
  );
};

export default OutcomeButtons;
