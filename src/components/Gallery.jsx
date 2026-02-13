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
  const [isFading, setIsFading] = useState(false);

  function toggleThumbnails() {
    setShowThumbnails((prev) => !prev);
  }

  function handleNext() {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
      setIsFading(false);
    }, 200);
  }

  function handlePrev() {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      setIsFading(false);
    }, 200);
  }

  // Keyboard navigation (Accessibility)
  useEffect(() => {
    function handleKey(e) {
      if (!images.length) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();

        handleNext();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        handlePrev();
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

  const currentImage = images.length > 0 ? images[currentIndex] : null;

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

        {currentImage && <Viewer image={currentImage} isFading={isFading} />}

        {images.length > 0 && (
          <>
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
          </>
        )}

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
