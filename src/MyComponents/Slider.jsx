import { useEffect, useRef, useState } from "react";
import mobile from '../Images/image1.jpg';
import sources from '../Images/image2.jpg';
import cards from '../Images/image3.jpg';
import imago from '../Images/image5.jpg';
import tango from '../Images/image6.jpg';
import sango from '../Images/image7.jpg';
import mango from '../Images/image8.jpg';
import { Link } from 'react-router-dom';
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
  const itemsRef = useRef([]); // store created DOM nodes
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create items & indicators once
  useEffect(() => {
    const carousel = carouselRef.current;
    const indicatorsContainer = indicatorsRef.current;
    if (!carousel || !indicatorsContainer) return;

    // ensure empty initially
    carousel.innerHTML = "";
    indicatorsContainer.innerHTML = "";
    itemsRef.current = [];

    portfolioData.forEach((data, index) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.dataset.index = index;

      const techBadges = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');

      item.innerHTML = `
        <div class="card">
          <div class="card-image"><img src="${data.image}" alt="${data.title}" /></div>
          <h3 class="card-title">${data.title}</h3>
          <p class="card-description">${data.description}</p>
          <div class="card-tech">${techBadges}</div>
          <button class="card-cta">Explore</button>
        </div>
      `;

      // base transition style so transforms animate
      item.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, z-index 0s';

      carousel.appendChild(item);
      itemsRef.current.push(item);

      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.index = index;
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });

    // initial layout
    updateCarouselStyles();

    // resize listener (debounce lightly)
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCarouselStyles, 120);
    };
    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update styles whenever index changes
  useEffect(() => {
    updateCarouselStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // helper functions
  const goToSlide = (index) => {
    setCurrentIndex(((index % portfolioData.length) + portfolioData.length) % portfolioData.length);
  };
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % portfolioData.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + portfolioData.length) % portfolioData.length);

  // central function that only mutates styles of existing nodes
  const updateCarouselStyles = () => {
    const items = itemsRef.current;
    const totalItems = items.length;
    if (!items || totalItems === 0) return;

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
      if (offset > totalItems / 2) offset -= totalItems;
      if (offset < -totalItems / 2) offset += totalItems;
      const absOffset = Math.abs(offset);
      const sign = offset < 0 ? -1 : 1;

      item.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';

      if (absOffset === 0) {
        item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
        item.style.opacity = '1';
        item.style.zIndex = '10';
      } else if (absOffset === 1) {
        const translateX = sign * spacing1;
        const rotation = isMobile ? 25 : 30;
        const scale = isMobile ? 0.88 : 0.85;
        item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
        item.style.opacity = '0.85';
        item.style.zIndex = '5';
      } else if (absOffset === 2) {
        const translateX = sign * spacing2;
        const rotation = isMobile ? 35 : 40;
        const scale = isMobile ? 0.75 : 0.7;
        item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
        item.style.opacity = '0.5';
        item.style.zIndex = '3';
      } else if (absOffset === 3) {
        const translateX = sign * spacing3;
        const rotation = isMobile ? 40 : 45;
        const scale = isMobile ? 0.65 : 0.6;
        item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
        item.style.opacity = '0.3';
        item.style.zIndex = '2';
      } else {
        item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
        item.style.opacity = '0';
        item.style.zIndex = '1';
      }
    });

    // update indicators active state
    const indicators = indicatorsRef.current?.querySelectorAll('.indicator') || [];
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));

  }
  const heroRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) heroRef.current.style.transform = ``;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div className="parent-slider">
        {/* CAROUSEL */}
        <section className="hero" id="home">
          <div className="carousel-container" ref={heroRef}>
            <div className="carousel" id="carousel" ref={carouselRef}></div>
            <div className="carousel-indicators" id="indicators" ref={indicatorsRef}></div>
          </div>
        </section>
      </div>
    </>
  )
}
