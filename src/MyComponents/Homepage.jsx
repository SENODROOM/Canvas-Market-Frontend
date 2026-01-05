import { useEffect } from "react";
import mobile from '../Images/mobile.jpg';
import sources from '../Images/sources.jpg';
import cards from '../Images/cards.jpg';

function Homepage() {

    // ================= STATS ANIMATION =================
   useEffect(() => {
    const section = document.querySelector(".mid");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(section); // 👑 run once only
                }
            });
        },
        {
            threshold: 0.4, // 40% visible = trigger
        }
    );

    if (section) observer.observe(section);
}, []);


   const animateStats = () => {
    const metricValues = document.querySelectorAll(
        ".metric-value[data-target]"
    );

    metricValues.forEach((el, index) => {
        setTimeout(() => {
            const target = parseFloat(el.dataset.target);
            let current = 0;

            // 🔍 detect decimal places automatically
            const decimals = (el.dataset.target.split(".")[1] || "").length;

            const duration = 1200; // total animation time (ms)
            const steps = 40;
            const increment = target / steps;
            const interval = duration / steps;

            const timer = setInterval(() => {
                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                // ✨ format number properly
                el.textContent =
                    decimals > 0
                        ? current.toFixed(decimals)
                        : Math.round(current).toLocaleString();
            }, interval);
        }, index * 200);
    });
};


    return (
        <main>

            {/* ================= HERO SECTION ================= */}
            <section className="bahubali">
                <h1 className="mainheading">Designers' Secret Source</h1>
                <p className="subheading">
                    The best design inspiration – expertly curated for you.
                </p>
                <p className="text">
                    Muzli is a new-tab browser extension that instantly delivers
                    relevant design stories and inspiration to keep you in the loop.
                </p>
            </section>

            {/* ================= IMAGE SLIDER ================= */}
           

            {/* ================= MID SECTION (STATS) ================= */}
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

            {/* ================= MOBILE PREVIEW ================= */}
            <section id="chuchu">
                <img id="ia" src={mobile} alt="mobile preview" />
            </section>

            {/* ================= HERO CONTENT ================= */}
            <section className="hero">

                <div className="herotext">
                    <h1 className="heroh1">
                        Be the first to know <br /> the latest design trends
                    </h1>

                    <p id="para1">
                        Staying current is crucial to improve yourself and stay
                        prepared for future trends in design & technology.
                        Learn new skills and get inspired every day.
                    </p>

                    <img id="himg2" src={sources} alt="sources" />
                </div>

                <div className="heroimg">
                    <img id="himg" src={cards} alt="cards preview" />

                    <div className="p2">
                        <h1 id="he1">
                            Customizable & <br /> personalized
                        </h1>

                        <p id="para1">
                            Muzli curates the latest content from hundreds of
                            design, tech & news sources.
                        </p>
                    </div>
                </div>

            </section>

        </main>
    );
}

export default Homepage;
