// useCoverCropper.js
import { useState, useCallback } from "react";
import getCroppedImg from "../helpers/getCroppedImg";

const useCropper = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async (coverPicture) => {
    try {
      const img = await getCroppedImg(coverPicture, croppedAreaPixels);
      return img;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to crop image.");
    }
  }, [croppedAreaPixels]);

  return { crop, setCrop, zoom, setZoom, croppedAreaPixels, onCropComplete, getCroppedImage };
};

export default useCropper;
