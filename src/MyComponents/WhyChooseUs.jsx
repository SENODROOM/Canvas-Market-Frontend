import React, { useState } from 'react';



import {
  FaPalette,
  FaGlobe,
  FaHeart,
  FaCertificate,
  FaUsers,
  FaStar,
  FaBolt
} from "react-icons/fa";

const features = [
  {
    icon: <FaPalette />,
    title: "Curated Art",
    desc: "Handpicked & original works",
    longDesc:
      "Each artwork is carefully selected to ensure originality, artistic depth, and emotional value—no mass-produced pieces."
  },
  {
    icon: <FaGlobe />,
    title: "Global Artists",
    desc: "Supporting independent creators",
    longDesc:
      "We connect artists worldwide with collectors, helping creators gain visibility and grow their artistic journey."
  },
  {
    icon: <FaHeart />,
    title: "Emotional Connection",
    desc: "Art that moves & inspires",
    longDesc:
      "Our platform celebrates artwork that tells stories, sparks emotion, and forms deep personal connections."
  },
  {
    icon: <FaCertificate />,
    title: "Authentic Originals",
    desc: "Every canvas tells a story",
    longDesc:
      "All artworks are verified originals, ensuring collectors receive unique, one-of-a-kind creations."
  },
  {
    icon: <FaUsers />,
    title: "Community Driven",
    desc: "Artists & collectors together",
    longDesc:
      "Canvas Market thrives on collaboration where artists and art lovers interact and inspire each other."
  },
  {
    icon: <FaStar />,
    title: "Premium Quality",
    desc: "Museum-grade visuals",
    longDesc:
      "We maintain premium quality standards for both digital previews and physical artwork."
  },
  {
    icon: <FaBolt />,
    title: "Instant Discovery",
    desc: "Find art that fits your vibe",
    longDesc:
      "Smart categorization and seamless browsing help users instantly discover art they love."
  }
];

 export const WhyChooseUs = () => {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
   <div>
     
      <section className="why-choose-us">
        <h2 className="section-title">Why Choose Us</h2>

        <div className={`features-grid ${expanded ? "expanded" : ""}`}>
          {features.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`feature-box ${!expanded && index > 2 ? "hidden" : ""
                  }`}
              >
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                {isOpen && (
                  <p className={`feature-more ${isOpen ? "open" : ""}`}>
                    {item.longDesc}
                  </p>
                )}

                <button
                  className="feature-more-btn"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  {isOpen ? "Show Less" : "More"}
                </button>
              </div>
            );
          })}
        </div>

        <button
          className="explore-btn"
          onClick={() => {
            setExpanded(!expanded);
            setOpenIndex(null);
          }}
        >
          {expanded ? "Go Back" : "Explore More"}
        </button>
      </section>

 </div>
  );
};

