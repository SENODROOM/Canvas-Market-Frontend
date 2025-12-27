// import ContactCSS from '../assets/css/contact.css'
// import ContactCSS2 from '../assets/css/formstyle.css'
import facebooklogo from "../Images/facebook.png";
import twitterlogo from "../Images/twitter.png";
import instalogo from "../Images/insta.png";
import linklogo from "../Images/link.png";
import mediumlogo from "../Images/medium.png";
import pinlogo from "../Images/pin.png";
import axios from "axios";
import { useEffect, useState } from "react";
// import readimg from "../assets/js/readimg";


// const [latestElementContent, setLatestElementContent] = useState("Not available");

// useEffect(() => {
//   // Establish a WebSocket connection
//   const ws = new WebSocket('ws://localhost:1000');

//   // Handle WebSocket messages
//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     setLatestElementContent(data.latestElement ? data.latestElement.filename : 'Not available');
//   };

//   // Clean up the WebSocket connection on component unmount
//   return () => {
//     ws.close();
//   };
// }, []);

// import paintingImg from `../Images/${laZZZ}`;

function Sell() {
  const [latestElementContent, setLatestElementContent] = useState("Not available");
  const [paintingImg, setPaintingImg] = useState(null);

  useEffect(() => {
    // Establish a WebSocket connection
    const ws = new WebSocket('ws://localhost:1000');

    // Handle WebSocket messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLatestElementContent(data.latestElement ? data.latestElement.filename : 'Not available');

      // Dynamically import the image based on the latest element
      import(`../Images/UploadedImages/${data.latestElement ? data.latestElement.filename : 'defaultImage.png'}`)
        .then(image => setPaintingImg(image.default))
        .catch(error => console.error('Error loading image:', error));
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    setProducts((prevProducts) => ({ ...prevProducts, fimg: latestElementContent }));
  }, [latestElementContent]);
  

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      await axios.post("http://localhost:1000/sell", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success, e.g., show a success message or update the UI
      // This function will be executed after 2000 milliseconds (2 seconds)
      setTimeout(() => {
        // Your code to be executed after the delay
        console.log("This code executes after 2 seconds");
      }, 2000);

      console.log(`Image uploaded successfully!`);
    } catch (error) {
      // Handle error, e.g., show an error message or log the error
      console.error("Error uploading image:", error.message);
    }
  };

  // usestate
  const form = document.getElementById("form");
  const form2 = document.getElementById("form2");
  const main = document.getElementsByTagName("main")[0];
  const [Products, setProducts] = useState({
    fname: "",
    femail: "",
    fmsg: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({ ...prevProducts, [name]: value }));
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { fname, femail, fmsg } = Products;
    const res = await fetch("http://localhost:5001/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: fname,
        femail: femail,
        fmsg: fmsg,
        fimg: latestElementContent,
      }),
    });
  };

  return (
    <main>
      <div className="bahubali">
        <div className="about-mainheading mainheading">Sell Paintings</div>
        <div className="about-subheading subheading" id="sub">
          <p>"Turn Your Art into Opportunity"</p>
        </div>
      </div>
      <div className="contact-main">
        <div className="sell-formdiv">
          <form method="POST">
            <h1 className="sell-formh1">Sell Paintings</h1>
            <div id="form">
              <p className="sell-formh1">"Turn Your Art into Opportunity"</p>
              <div className="sell-formdesign" id="name">
                <input
                  type="text"
                  name="fname"
                  required
                  placeholder="Your Name"
                  className="place"
                  onChange={handleInputs}
                />
                <b>
                  <span className="formerror"></span>
                </b>
              </div>
              <div className="sell-formdesign" id="email">
                <input
                  type="email"
                  name="femail"
                  required
                  placeholder="Email"
                  className="place"
                  onChange={handleInputs}
                />{" "}
                <b>
                  <span className="formerror"></span>
                </b>
              </div>
              <div className="sell-formdesign" id="msg">
                <input
                  type="message"
                  name="fmsg"
                  required
                  placeholder="Prize"
                  className="place"
                  onChange={handleInputs}
                />{" "}
                <b>
                  <span className="formerror"></span>
                </b>
              </div>
              <div className="Sell-img">
                <label htmlFor="fileInput" className="custom-file-upload">
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <button id="sell-btn" onClick={handleUpload}>Upload</button>
                <label htmlFor="sell-btn" className="custom-file-upload">
                  Upload
                </label>
              </div>
              <button
                className="contact-but but"
                type="submit"
                value="Send Message"
                onClick={PostData}
              >
                Sell
              </button>
            </div>
            <div className="formh1" id="form2">
              Let us know how we can help you and our team will be in touch as
              soon as possible!
            </div>
          </form>
          <div className="preview">
            <h1 className="sell-formh1">Preview</h1>
            {/* <h1>{latestElementContent}</h1> */}
            <div className="Painting">
              <img src={paintingImg} alt=""  className="painting-img"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sell;
