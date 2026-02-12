export default function Viewer({ image }) {
  return (
    <div>
      <img src={image.src} srcSet={image.srcset} alt={image.alt} />

      <div className="gallery-caption">{image.caption}</div>
    </div>
  );
}
