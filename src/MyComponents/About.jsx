import React, { useState } from 'react';
import Section from '../MyComponents/SectionDropDown';
import {
  ChangesToThisPrivacyPolicy,
  ContactUs,
  CookiesAndSimilarTechnologies,
  HowWeUseYourInformation,
  InformationWeCollect,
  Security,
  ThirdPartyLinks,
  YourChoices
} from '../Data/PrivacyPolicy';

import image from '../Images/about.jpg';

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

const PrivacyPolicy = () => {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main>

      {/* ABOUT HEADING */}
      <section className="about-heading">
        <h1 className="about-title">About Us</h1>
        <p className="about-tagline">
          A creative space built to celebrate art, empower artists,
          and connect people through meaningful visuals.
        </p>
      </section>

      {/* ABOUT DESCRIPTION */}
      <div className="about-description">
        <div className="about-left">
          <h1>The Art Behind Canvas Market</h1>
          <p>
            Canvas Market connects talented artists with art lovers who value
            creativity and originality. We believe art is more than decoration—
            it’s expression, emotion, and identity.
          </p>
        </div>

        <div className="about-image">
          <img src={image} alt="painting" />
        </div>
      </div>

      {/* WHY CHOOSE US */}
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

      {/* PRIVACY POLICY */}
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-header">Privacy And Policy</h1>

        <Section id="1" heading="Information We Collect" data={InformationWeCollect} />
        <Section id="2" heading="How We Use Your Information" data={HowWeUseYourInformation} />
        <Section id="3" heading="Cookies and Similar Technologies" data={CookiesAndSimilarTechnologies} />
        <Section id="4" heading="Third-Party Links" data={ThirdPartyLinks} />
        <Section id="5" heading="Security" data={Security} />
        <Section id="6" heading="Your Choices" data={YourChoices} />
        <Section id="7" heading="Changes to this Privacy Policy" data={ChangesToThisPrivacyPolicy} />
        <Section id="8" heading="Contact Us" data={ContactUs} />
      </div>

    </main>
  );
};

export default PrivacyPolicy;
