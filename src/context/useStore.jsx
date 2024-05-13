import { create } from "zustand";

const useBearStore = create((set) => ({
  showStart: true,
  setShowStart: (showStart) => set({ showStart }),

  // Volume control
  isMuted: true,
  setIsMuted: (isMuted) => set({ isMuted }),

  // Outcome images
  outcomeImage: "",
  setOutcomeImage: (outcomeImage) => set({ outcomeImage }),

  isSequenceStarted: false,
  setIsSequenceStarted: (isSequenceStarted) => set({ isSequenceStarted }),

  isTransitionDone: false,
  setIsTransitionDone: (isTransitionDone) => set({ isTransitionDone }),

  // Convention Center
  conventionCenterDemo: null,
  setConventionCenterDemo: (conventionCenterDemo) =>
    set({ conventionCenterDemo }),

  // Captions
  showCaption: false,
  setShowCaption: (showCaption) => set({ showCaption }),

  // Selected files
  selectedFiles: [],
  setSelectedFiles: (selectedFiles) => set({ selectedFiles }),

  // Active video index
  activeVideoIndex: 0,
  setActiveVideoIndex: (activeVideoIndex) => set({ activeVideoIndex }),

  // Active demo index
  activeDemoIndex: 0,
  setActiveDemoIndex: (activeDemoIndex) => set({ activeDemoIndex }),

  // currentPage
	currentPage: 'home',
	setCurrentPage: currentPage => set({ currentPage }),
}));

export default useBearStore;
