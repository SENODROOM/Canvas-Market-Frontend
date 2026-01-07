import { useEffect, useRef, useState } from "react";
import mobile from '../Images/image1.jpg';
import sources from '../Images/image2.jpg';
import cards from '../Images/image3.jpg';
import { Link } from 'react-router-dom';
import { CircularImage, MonetizeSection } from "./MonetizeSection";
const portfolioData = [
    { id: 1, title: "Project One", description: "Description for project one.", image: mobile, tech: ["React", "CSS", "JS"] },
    { id: 2, title: "Project Two", description: "Description for project two.", image: sources, tech: ["HTML", "CSS", "JS"] },
    { id: 3, title: "Project Three", description: "Description for project three.", image: cards, tech: ["React", "Tailwind", "JS"] },
    { id: 4, title: "Project Three", description: "Description for project three.", image: cards, tech: ["React", "Tailwind", "JS"] },
    { id: 5, title: "Project Three", description: "Description for project three.", image: cards, tech: ["React", "Tailwind", "JS"] },
    { id: 6, title: "Project Three", description: "Description for project three.", image: cards, tech: ["React", "Tailwind", "JS"] },
    { id: 7, title: "Project Three", description: "Description for project three.", image: cards, tech: ["React", "Tailwind", "JS"] }
];

function Homepage() {
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
    };

    // ========== STATS ANIMATION (kept same) ==========
    useEffect(() => {
        const section = document.querySelector(".mid");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(section);
                    }
                });
            },
            { threshold: 0.4 }
        );

        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const animateStats = () => {
        const metricValues = document.querySelectorAll(".metric-value[data-target]");
        metricValues.forEach((el, index) => {
            setTimeout(() => {
                const target = parseFloat(el.dataset.target);
                let current = 0;
                const decimals = (el.dataset.target.split(".")[1] || "").length;
                const duration = 1200;
                const steps = 40;
                const increment = target / steps;
                const interval = duration / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
                }, interval);
            }, index * 200);
        });
    };

    // parallax kept
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
        <main>
            {/* HERO SECTION */}
            <section className="bahubali">
                <h1 className="mainheading">Designers' Secret Source</h1>
                <p className="subheading">The best design inspiration – expertly curated for you.</p>
                <p className="text">Muzli is a new-tab browser extension that instantly delivers relevant design stories and inspiration to keep you in the loop.</p>
            </section>
            <div className="parent-slider">
                {/* CAROUSEL */}
                <section className="hero" id="home">

                    <div className="carousel-container" ref={heroRef}>
                        <div className="carousel" id="carousel" ref={carouselRef}></div>
                        <div className="carousel-indicators" id="indicators" ref={indicatorsRef}></div>
                    </div>
                </section>
            </div>

            {/* STATS SECTION */}
            <section className="mid">
                <div className="intro-metrics">
                    <div className="metric-item">
                        <span className="metric-value" data-target="1000">0</span>
                        <span className="metric-suffix">+</span>
                        <span className="metric-label">Sellers</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                        <span className="metric-value" data-target="2000">0</span>
                        <span className="metric-suffix">+</span>
                        <span className="metric-label">Paintings</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                        <span className="metric-value" data-target="2.3">0.0</span>
                        <span className="metric-suffix">M +</span>
                        <span className="metric-label">Reviews</span>
                    </div>
                </div>
            </section>

            <MonetizeSection/>
            

            {/* HERO CONTENT */}
            <section className="hero">
                <div className="herotext">
                    <h1 className="heroh1">Be the first to know <br /> the latest design trends</h1>
                    <p id="para1">Staying current is crucial to improve yourself and stay prepared for future trends in design & technology. Learn new skills and get inspired every day.</p>
                    <img id="himg2" src={sources} alt="sources" />
                </div>

                <div className="heroimg">
                    <img id="himg" src={cards} alt="cards preview" />
                    <div className="p2">
                        <h1 id="he1">Customizable & <br /> personalized</h1>
                        <p id="para1">Muzli curates the latest content from hundreds of design, tech & news sources.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Homepage;
