import { useState, useEffect } from "react";
import Gallery from "./components/Gallery.jsx";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images.json");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        Loading Gallery...
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-neutral-900 text-white">
      <Gallery images={images} />
    </div>
  );
}
