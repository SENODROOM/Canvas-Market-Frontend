// components/SellForm.jsx

export function SellForm({
  formData,
  selectedFile,
  isUploading,
  uploadSuccess,
  onInputChange,
  onFileChange,
  onUpload,
}) {
  return (
    <form>
      <div id="form">
        <h1 className="sell-formh1">Submit Your Artwork</h1>
        <p>"Showcase Your Talent"</p>

        <div className="sell-formdesign">
          <input
            type="text"
            name="fname"
            placeholder="Your Full Name"
            value={formData.fname}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="sell-formdesign">
          <input
            type="email"
            name="femail"
            placeholder="Your Email Address"
            value={formData.femail}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="sell-formdesign">
          <input
            type="text"
            name="fmsg"
            placeholder="Asking Price (e.g. $500)"
            value={formData.fmsg}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="Sell-img">
          <label htmlFor="fileInput" className="custom-file-upload">
            Choose
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          <button
            type="button"
            className="custom-file-upload"
            onClick={onUpload}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {uploadSuccess && (
          <span
            style={{
              color: "#00ff9d",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            ✓ Image uploaded
          </span>
        )}
      </div>
    </form>
  );
}
