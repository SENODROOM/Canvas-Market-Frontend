import { useEffect, useRef, useState } from "react";
import mobile from "../Images/image1.jpg";
import sources from "../Images/image2.jpg";
import cards from "../Images/image3.jpg";
import imago from "../Images/image5.jpg";
import tango from "../Images/image6.jpg";
import sango from "../Images/image7.jpg";
import mango from "../Images/image8.jpg";

export function Sliders() {

  const portfolioData = [
    { id: 1, title: "Whispers of Nature", description: "-Muhammad Hassan", image: mobile, tech: ["Nature", "Illustration", "Minimal"] },
    { id: 2, title: "Echoes of the Highlands", description: "-Ayesha Aqeel", image: sources, tech: ["Nature", "Serene", "Landscape Art"] },
    { id: 3, title: "Textured Silence", description: "-Seemal Rubab", image: cards, tech: ["Abstract Art", "Modern", "Texture"] },
    { id: 4, title: "Fading Petals", description: "-Khydija Fatima", image: tango, tech: ["Floral", "Calm Aesthetic", "Minimal Art"] },
    { id: 5, title: "Masks of Emotion", description: "-Hafsa Amin", image: imago, tech: ["Expressionism", "Theatre Masks", "Abstract Art"] },
    { id: 6, title: "City After Dusk", description: "-Javeria Yasin", image: sango, tech: ["Urban Canvas", "Fine Art", "Moody"] },
    { id: 7, title: "Silent Majesty", description: "-Muhammad Saad Amin", image: mango, tech: ["Concept Art", "Portrait", "Canvas"] }
  ];

  const carouselRef = useRef(null);
  const indicatorsRef = useRef(null);
  const itemsRef = useRef([]);
  const heroRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const indicatorsContainer = indicatorsRef.current;
    if (!carousel || !indicatorsContainer) return;

    carousel.innerHTML = "";
    indicatorsContainer.innerHTML = "";
    itemsRef.current = [];

    portfolioData.forEach((data, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item";

      const techBadges = data.tech
        .map(tech => `<span class="tech-badge">${tech}</span>`)
        .join("");

      item.innerHTML = `
        <div class="card">
          <div class="card-image">
            <img src="${data.image}" alt="${data.title}" />
          </div>
          <h3 class="card-title">${data.title}</h3>
          <p class="card-description">${data.description}</p>
          <div class="card-tech">${techBadges}</div>
          <button class="card-cta">Explore</button>
        </div>
      `;

      item.style.transition =
        "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease";

      carousel.appendChild(item);
      itemsRef.current.push(item);

      const indicator = document.createElement("div");
      indicator.className = "indicator";
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => setCurrentIndex(index));
      indicatorsContainer.appendChild(indicator);
    });

    updateCarouselStyles();

    const handleResize = () => updateCarouselStyles();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCarouselStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const updateCarouselStyles = () => {
    const items = itemsRef.current;
    if (!items.length) return;

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    let spacing1 = 400, spacing2 = 600, spacing3 = 750;
    if (isMobile) {
      spacing1 = 280; spacing2 = 420; spacing3 = 550;
    } else if (isTablet) {
      spacing1 = 340; spacing2 = 520; spacing3 = 650;
    }

    items.forEach((item, index) => {
      let offset = index - currentIndex;
      if (offset > items.length / 2) offset -= items.length;
      if (offset < -items.length / 2) offset += items.length;

      const abs = Math.abs(offset);
      const sign = offset < 0 ? -1 : 1;

      if (abs === 0) {
        item.style.transform = "translate(-50%, -50%) scale(1)";
        item.style.opacity = "1";
        item.style.zIndex = "10";
      } else if (abs === 1) {
        item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing1}px) rotateY(${-sign * 30}deg) scale(0.85)`;
        item.style.opacity = "0.85";
        item.style.zIndex = "5";
      } else if (abs === 2) {
        item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing2}px) rotateY(${-sign * 40}deg) scale(0.7)`;
        item.style.opacity = "0.5";
        item.style.zIndex = "3";
      } else {
        item.style.opacity = "0";
        item.style.zIndex = "1";
      }
    });

    indicatorsRef.current
      ?.querySelectorAll(".indicator")
      .forEach((el, i) => el.classList.toggle("active", i === currentIndex));
  };

  return (
    <div className="parent-slider">
      <section className="hero" id="home">
        <div className="carousel-container" ref={heroRef}>
          <div className="carousel" ref={carouselRef}></div>
          <div className="carousel-indicators" ref={indicatorsRef}></div>
        </div>
      </section>
    </div>
  );
}
