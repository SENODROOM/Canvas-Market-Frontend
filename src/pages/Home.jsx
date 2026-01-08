
import { MonetizeSection } from "../MyComponents/MonetizeSection";
import { Sliders } from "../MyComponents/Slider";
import { Stats } from "../MyComponents/Stats";
import { Testimonials } from "../MyComponents/Testimonals";
function Homepage() {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="bahubali">
                <h1 className="mainheading">Designers' Secret Source</h1>
                <p className="subheading">The best design inspiration – expertly curated for you.</p>
                <p className="text">Muzli is a new-tab browser extension that instantly delivers relevant design stories and inspiration to keep you in the loop.</p>
            </section>
            <Sliders />
            <Stats />
            <MonetizeSection />
            <Testimonials />
        </main>
    );
}

export default Homepage;
