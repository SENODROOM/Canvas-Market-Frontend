// Sell.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { SellHeader } from "../MyComponents/SellHeader";
import { SellForm } from "../MyComponents/SellForm";
import { ArtworkPreview } from "../MyComponents/ArtworkPreview";

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
      console.log(latestElementContent);
    } catch (err) {
      console.error(err);
      alert("Submission error");
    }
  };

  const isFormValid = formData.fname && formData.femail && formData.fmsg && paintingImg;

  return (
    <main>
      <SellHeader />

      <div className="contact-main">
        <div className="sell-formdiv">
          <div className="main-sell">
            <SellForm
              formData={formData}
              selectedFile={selectedFile}
              isUploading={isUploading}
              uploadSuccess={uploadSuccess}
              onInputChange={handleInputChange}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
            />

            <ArtworkPreview paintingImg={paintingImg} />
          </div>

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