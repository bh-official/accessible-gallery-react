export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search images"
      />

      {searchTerm && (
        <button
          className="clear-btn"
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
