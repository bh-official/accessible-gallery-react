export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search images..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Search images"
    />
  );
}
