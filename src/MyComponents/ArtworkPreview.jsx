// components/ArtworkPreview.jsx

export function ArtworkPreview({ paintingImg }) {
  return (
    <div className="preview">
      <div className="Painting">
        {paintingImg ? (
          <img
            src={paintingImg}
            alt="Artwork preview"
            className="painting-img"
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(0,230,255,0.65)",
              fontSize: "13px",
              padding: "30px",
              textAlign: "center",
              gap: "10px",
            }}
          >
            <div>Upload your artwork</div>
            <div style={{ fontSize: "11px", opacity: 0.55 }}>
              JPG • PNG • WebP
            </div>
          </div>
        )}
      </div>

      {paintingImg && (
        <div
          style={{
            color: "rgba(0,255,180,0.9)",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          ✓ Ready to list
        </div>
      )}
    </div>
  );
}
