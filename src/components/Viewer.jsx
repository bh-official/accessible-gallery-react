import { useState } from "react";

export default function Viewer({ image, isFading }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="viewer-wrapper">
      {!loaded && <div className="image-loader">Loading image...</div>}

      <img
        src={image.src}
        srcSet={image.srcset}
        alt={image.alt}
        onLoad={() => setLoaded(true)}
        className={`viewer-image ${loaded ? "visible" : "hidden"} ${
          isFading ? "fade-out" : "fade-in"
        }`}
      />

      <div className="gallery-caption">{image.caption}</div>
    </div>
  );
}
