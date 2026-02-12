import { useEffect, useState } from "react";
import Viewer from "./Viewer";
import Thumbnails from "./Thumbnails";
import SearchBar from "./SearchBar";
import "../gallery.css";

export default function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images.filter((img) =>
    img.caption.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentImage = filteredImages[currentIndex];

  // Keyboard navigation (Accessibility)
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % filteredImages.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredImages.length]);

  if (!currentImage) {
    return <p className="p-4">No images found.</p>;
  }

  return (
    <div className="gallery-container">
      <div className="gallery-viewer">
        <Viewer image={currentImage} />

        <div className="gallery-search-overlay">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="gallery-caption">{currentImage.caption}</div>
      </div>

      <Thumbnails
        images={filteredImages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
