import { files } from "../utils/videoData";

export const transition = { duration: 1, ease: [0.6, 0.01, 0.05, 0.9] };

export const findVideoIndex = (videoName) => {
  return files.findIndex((video) => video.includes(videoName));
};
