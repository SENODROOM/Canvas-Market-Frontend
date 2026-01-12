
import { SellAndBuySection } from "../MyComponents/SellAndBuySection";
import { Sliders } from "../MyComponents/Slider";
import { Stats } from "../MyComponents/Stats";
import { Testimonials } from "../MyComponents/Testimonals";
function Homepage() {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="bahubali">
                <h1 className="mainheading">Where Art Finds Its Home</h1>
                <p className="subheading">
                    <i>
                        "Discover buy and sell original paintings from talented artists"
                    </i>
                </p>
                <p className="text">
                    Canvas Market connects art lovers with creators worldwide — explore unique artworks, support independent artists, and turn creativity into opportunity.
                </p>
            </section>

            <Sliders />
            <Stats />
            <SellAndBuySection />
            <Testimonials />
        </main>
    );
}

export default Homepage;
