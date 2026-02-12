export default function Thumbnails({
  images,
  currentIndex,
  setCurrentIndex,
  showThumbnails,
  toggleThumbnails,
}) {
  return (
    <div className="thumbnails-wrapper">
      <button
        className="thumb-toggle-btn"
        onClick={toggleThumbnails}
        aria-label="Toggle thumbnails"
      >
        {showThumbnails ? "▾" : "▴"}
      </button>

      {showThumbnails && (
        <div className="gallery-thumbnails">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={index === currentIndex ? "active" : ""}
              aria-label={`View ${img.caption}`}
            >
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
