// components/GalleryGrid.jsx
import { PaintingCard } from "./PaintingCard";
import { NoResults } from "./NoResults";

export function GalleryGrid({ loading, filteredData, animateCards, onExplore, onResetFilters }) {
  return (
    <section className="gallery-section">
      <div className="container">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading artworks...</p>
          </div>
        ) : (
          <div className={`gallery-grid ${animateCards ? 'animate' : ''}`}>
            {filteredData.length > 0 ? (
              filteredData.map((painting, index) => (
                <PaintingCard
                  key={painting._id || painting.id}
                  painting={painting}
                  index={index}
                  onExplore={onExplore}
                />
              ))
            ) : (
              <NoResults onResetFilters={onResetFilters} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
