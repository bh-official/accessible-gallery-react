import { useState, useEffect } from "react";
import Gallery from "./components/Gallery.jsx";

export default function App() {
  const [images, setImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchDefaultImages() {
      const res = await fetch("/api/images.json");
      const data = await res.json();

      setImages(data);
      setDefaultImages(data);
      setIsInitialLoading(false);
    }
    fetchDefaultImages();
  }, []);

  // Fetch Unsplash when searching
  useEffect(() => {
    async function fetchUnsplash() {
      if (!debouncedSearch.trim()) {
        setImages(defaultImages);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${debouncedSearch}&per_page=12&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        );

        const data = await res.json();

        const formatted = data.results.map((img) => ({
          id: img.id,
          src: `${img.urls.raw}&w=1600&fit=max`,
          srcset: `
  ${img.urls.raw}&w=800&&fit=max 800w,
  ${img.urls.raw}&w=1600&fit=max 1600w
`,

          alt: img.alt_description || "Unsplash image",
          caption: img.description || img.alt_description || "Untitled image",
        }));

        setImages(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUnsplash();
  }, [debouncedSearch, defaultImages]);

  if (isInitialLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <Gallery
      images={images}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      isLoading={isLoading}
    />
  );
}
