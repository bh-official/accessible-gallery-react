import { useEffect, useState } from "react";
import Viewer from "./Viewer";
import Thumbnails from "./Thumbnails";
import SearchBar from "./SearchBar";
import "../gallery.css";

export default function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showThumbnails, setShowThumbnails] = useState(true);

  function toggleThumbnails() {
    setShowThumbnails((prev) => !prev);
  }

  const filteredImages = images.filter((img) =>
    img.caption.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!filteredImages.length) {
    return <p className="p-4">No images found.</p>;
  }

  const currentImage = filteredImages[currentIndex];

  // Keyboard navigation (Accessibility)
  useEffect(() => {
    function handleKey(e) {
      if (!filteredImages.length) return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % filteredImages.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredImages]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [searchTerm]);

  return (
    <div className="gallery-container">
      <div className="gallery-viewer">
        <Viewer image={currentImage} />

        <div className="gallery-search-overlay">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="gallery-caption">{currentImage.caption}</div>
      </div>

      <div className="thumbnail-toggle-wrapper">
        <button
          className="thumb-toggle-btn"
          onClick={toggleThumbnails}
          aria-label="Toggle thumbnails"
        >
          {showThumbnails ? "Hide" : "Show"}
        </button>
      </div>

      {showThumbnails && (
        <Thumbnails
          images={filteredImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
