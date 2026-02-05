// components/NoResults.jsx

export function NoResults({ onResetFilters }) {
  return (
    <div className="no-results">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <h3>No artworks found</h3>
      <p>Try adjusting your search or filter criteria</p>
      <button onClick={onResetFilters} className="reset-btn">
        Reset Filters
      </button>
    </div>
  );
}
