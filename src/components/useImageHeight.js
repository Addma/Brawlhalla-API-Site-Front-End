import { useState, useRef, useEffect, useLayoutEffect } from "react";

function useImageHeight() {
  const [height, setHeight] = useState(null);
  const imgRef = useRef(null);

  const updateHeight = () => {
    if (imgRef.current) {
      setHeight(imgRef.current.offsetHeight);
    }
  };

  useLayoutEffect(() => {
    const imgElement = imgRef.current;

    if (imgElement) {
      if (imgElement.complete) {
        updateHeight(); // Image already loaded
      } else {
        // Add load event listener if the image is not yet loaded
        imgElement.addEventListener("load", updateHeight);
      }

      window.addEventListener("resize", updateHeight);
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("load", updateHeight);
      }
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Additional fallback for dynamically set images
  useEffect(() => {
    updateHeight();
  }, [imgRef.current?.src]); // Re-trigger if the image src changes

  return { height, imgRef, updateHeight};
}

export default useImageHeight;