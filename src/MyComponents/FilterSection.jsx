// components/FilterSection.jsx

export function FilterSection({
  searchTerm,
  onSearchChange,
  categories,
  selectedFilter,
  onFilterChange,
  resultsCount
}) {
  return (
    <section className="filter-section">
      <div className="container">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, artist, or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => onSearchChange('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
              onClick={() => onFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="results-info">
          <p>Showing {resultsCount} {resultsCount === 1 ? 'artwork' : 'artworks'}</p>
        </div>
      </div>
    </section>
  );
}
