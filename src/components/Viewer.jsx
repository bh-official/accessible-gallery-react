export default function Viewer({ image, isFading }) {
  return (
    <div>
      <img
        key={image.src}
        src={image.src}
        srcSet={image.srcset}
        alt={image.alt}
        className={`viewer-image ${isFading ? "fade-out" : "fade-in"}`}
      />

      <div className="gallery-caption">{image.caption}</div>
    </div>
  );
}
