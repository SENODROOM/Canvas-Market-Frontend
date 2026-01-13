// Sell.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Sell() {
  const [latestElementContent, setLatestElementContent] = useState("Not available");
  const [paintingImg, setPaintingImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    femail: "",
    fmsg: "",
    fimg: "",
  });

  // WebSocket – latest uploaded image
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1000");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.latestElement) {
          const filename = data.latestElement.filename;
          setLatestElementContent(filename);
          setFormData((prev) => ({ ...prev, fimg: filename }));

          import(`../Images/UploadedImages/${filename}`)
            .then((img) => setPaintingImg(img.default))
            .catch((err) => console.error("Cannot load image:", err));
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    return () => ws.close();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPaintingImg(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("image", selectedFile);

      await axios.post("http://localhost:1000/sell", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fname || !formData.femail || !formData.fmsg || !formData.fimg) {
      alert("Please complete all fields and upload an image");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/Products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Artwork listed successfully!");
        setFormData({ fname: "", femail: "", fmsg: "", fimg: "" });
        setSelectedFile(null);
        setPaintingImg(null);
      } else {
        alert("Failed to list artwork");
      }
    } catch (err) {
      console.error(err);
      alert("Submission error");
    }
  };

  const isFormValid = formData.fname && formData.femail && formData.fmsg && paintingImg;

  return (
    <main>
      <div className="bahubali">
        <div className="about-mainheading">Sell Your Masterpiece</div>
        <div className="about-subheading">"Turn Your Art Into Opportunity"</div>
      </div>

      <div className="contact-main">
       
        <div className="sell-formdiv">

        
          {/* Form column */}
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
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="sell-formdesign">
                <input
                  type="email"
                  name="femail"
                  placeholder="Your Email Address"
                  value={formData.femail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="sell-formdesign">
                <input
                  type="text"
                  name="fmsg"
                  placeholder="Asking Price (e.g. $500)"
                  value={formData.fmsg}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="Sell-img">
                <label
                  htmlFor="fileInput"
                  className="custom-file-upload"
                >
                  Choose
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  className="custom-file-upload"
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              {uploadSuccess && (
                <span style={{ color: "#00ff9d", fontSize: "13px", textAlign: "center" }}>
                  ✓ Image uploaded
                </span>
              )}
            </div>
          </form>

          {/* Preview column – smaller */}
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

          {/* Centered List Artwork button – full premium style */}
          <div className="center-submit-wrapper">
            <button
              type="button"
              className="contact-but"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              List Artwork
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Sell;