export default function Thumbnails({ images, currentIndex, setCurrentIndex }) {
  return (
    <div className="gallery-thumbnails">
      {images.map((img, index) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(index)}
          className={index === currentIndex ? "active" : ""}
          aria-label={`View ${img.caption}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-20 w-28 object-cover rounded"
          />
        </button>
      ))}
    </div>
  );
}
