import { useEffect, useState } from "react";
import Viewer from "./Viewer";
import Thumbnails from "./Thumbnails";
import SearchBar from "./SearchBar";
import "../gallery.css";

export default function Gallery({
  images,
  searchTerm,
  setSearchTerm,
  isLoading,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showThumbnails, setShowThumbnails] = useState(true);

  function toggleThumbnails() {
    setShowThumbnails((prev) => !prev);
  }

  // Keyboard navigation (Accessibility)
  useEffect(() => {
    function handleKey(e) {
      if (!images.length) return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length]);

  //   if (!images.length && !isLoading) {
  //     return <p className="p-4">No images found.</p>;
  //   }

  const currentImage = images.length > 0 ? images[currentIndex] : null;

  function handleNext() {
    setCurrentIndex((i) => (i + 1) % images.length);
  }

  function handlePrev() {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  return (
    <div className="gallery-container">
      <div className="gallery-viewer">
        {!images.length && !isLoading && (
          <div className="empty-state">
            <p>No images found. Try another search.</p>

            <button className="reset-btn" onClick={() => setSearchTerm("")}>
              Back to Gallery
            </button>
          </div>
        )}

        {currentImage && <Viewer image={currentImage} />}

        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <button
          className="nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          ◂
        </button>

        <button
          className="nav-btn next"
          onClick={handleNext}
          aria-label="Next image"
        >
          ▸
        </button>

        <div className="gallery-search-overlay">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {images.length > 0 && (
        <div className={`gallery-toggle ${showThumbnails ? "open" : "closed"}`}>
          <button
            className="thumb-toggle-btn"
            onClick={toggleThumbnails}
            aria-label="Toggle thumbnails"
          >
            {showThumbnails ? "▾" : "▴"}
          </button>
        </div>
      )}

      {images.length > 0 && (
        <Thumbnails
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          showThumbnails={showThumbnails}
          toggleThumbnails={toggleThumbnails}
        />
      )}
    </div>
  );
}
