import React, { useState, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css";
import "./ImageGallery.css";
import "./reset.css";

// 画像を動的にインポート
const imageModules = import.meta.glob("../../assets/images/g-image (*.png)", { eager: true });

const ImageGallery = () => {
  const [images] = useState(() =>
    Object.keys(imageModules)
      .sort()
      .map((path) => ({
        src: imageModules[path].default,
      }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    const timers = images.map((_, index) =>
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const breakpointColumnsObj = {
    default: 6,
    1280: 4,
    1024: 3,
    768: 2,
    0: 2,
  };

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-wrapper ${visibleImages.includes(index) ? "visible" : ""}`}
          >
            <img
              src={image.src}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(image)}
              style={{ cursor: "pointer" }}
              onError={(e) => console.log(`Failed to load image ${index}:`, image.src)}
            />
          </div>
        ))}
      </Masonry>

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Expanded" className="modal-image" />
            <button className="modal-close-button" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;