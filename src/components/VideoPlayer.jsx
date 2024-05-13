import React, { useState, useEffect, useRef } from "react";

function VideoPlayer({ videoSequence }) {
  const [phase, setPhase] = useState("TO");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef(videoSequence.map(() => React.createRef()));

  useEffect(() => {
    if (phase === "TO") {
      setActiveVideoIndex(0);
    } else if (phase === "ON") {
      setActiveVideoIndex(1);
    } else if (phase === "FROM") {
      setActiveVideoIndex(2);
    }
    videoRefs.current[activeVideoIndex].current.play();
  }, [phase, videoSequence, activeVideoIndex]);

  const handleVideoEnd = () => {
    if (phase === "TO") {
      setPhase("ON");
    } else if (phase === "ON") {
      videoRefs.current[1].current.play();
    } else if (phase === "FROM") {
      // Optionally, transition to another sequence or handle the end
    }
  };

  return (
    <div>
      {videoSequence.map((video, index) => (
        <video
          key={index}
          ref={videoRefs.current[index]}
          width="600"
          controls
          onEnded={handleVideoEnd}
          style={{ display: index === activeVideoIndex ? "block" : "none" }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      <div>
        <button onClick={() => setPhase("TO")}>Start Sequence</button>
        <button onClick={() => setPhase("FROM")}>End Sequence</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
