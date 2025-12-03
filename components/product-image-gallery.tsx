"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import Image from "next/image";

interface ProductImageGalleryProps {
  mainImage: string;
  gallery: string[];
  productName: string;
}

export default function ProductImageGallery({
  mainImage,
  gallery = [],
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const allImages = [mainImage, ...gallery].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          <img
            src={selectedImage}
            alt={productName}
            className={`w-full h-full object-contain p-4 transition-transform duration-300 cursor-${
              isZoomed ? "zoom-out" : "zoom-in"
            } ${isZoomed ? "scale-150" : "scale-100"}`}
            onClick={toggleZoom}
          />
        </div>

        <button
          onClick={toggleZoom}
          className="absolute top-4 right-4 bg-white/80 rounded-full p-2 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {allImages.length > 1 && (
        <div className="px-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            More Views
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {allImages.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(img)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
                  selectedImage === img
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-primary"
                }`}
                aria-label={`View ${productName} image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
