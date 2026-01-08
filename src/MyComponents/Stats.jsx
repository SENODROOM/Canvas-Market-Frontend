import { useEffect  } from "react";


export function Stats() {

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


  return (
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
  );
}
