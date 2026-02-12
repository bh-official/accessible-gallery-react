export default function Thumbnails({
  images,
  currentIndex,
  setCurrentIndex,
  showThumbnails,
}) {
  return (
    <div className={`gallery-thumbnails ${showThumbnails ? "open" : "closed"}`}>
      {images.map((img, index) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(index)}
          className={index === currentIndex ? "active" : ""}
        >
          <img src={img.src} alt={img.alt} />
        </button>
      ))}
    </div>
  );
}
