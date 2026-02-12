export default function Viewer({ image }) {
  return (
    <div>
      <img src={image.src} srcSet={image.srcset} alt={image.alt} />

      <p>{image.caption}</p>
    </div>
  );
}
