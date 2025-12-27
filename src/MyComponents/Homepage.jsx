import mobile from '../Images/mobile.jpg';
import sources from '../Images/sources.jpg';
import cards from '../Images/cards.jpg';

function Homepage() {

    // Dynamic image arrays using Picsum (works 100%)
    const artImages = Array.from({ length: 6 }, (_, i) =>
        `https://picsum.photos/600/600?random=${i + 1}`
    );
    const designImages = Array.from({ length: 6 }, (_, i) =>
        `https://picsum.photos/600/600?random=${i + 100}`
    );

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
                    <a href="#"> More about AU</a>
                </p>
            </section>

            {/* ================= IMAGE SLIDER ================= */}
            <section className="home-images">
                <div className="home-images-slider">

                    <div className="a">
                        {artImages.map((img, i) => (
                            <img key={i} src={img} alt="art inspiration" loading="lazy" />
                        ))}
                    </div>

                    <div className="b">
                        {designImages.map((img, i) => (
                            <img key={i} src={img} alt="design inspiration" loading="lazy" />
                        ))}
                    </div>

                    <div className="a">
                        {artImages.map((img, i) => (
                            <img key={i + 10} src={`${img}&sig=${i + 10}`} alt="art inspiration" loading="lazy" />
                        ))}
                    </div>

                    <div className="b">
                        {designImages.map((img, i) => (
                            <img key={i + 20} src={`${img}&sig=${i + 20}`} alt="design inspiration" loading="lazy" />
                        ))}
                    </div>

                </div>
            </section>

            {/* ================= MID SECTION ================= */}
            <section className="mid">
                <h1 className="sechead">Hand picked inspiration</h1>
                <p className="para">
                    Join over <b>700K designers</b>, product managers & developers
                    to get your daily dose of professionally curated content from
                    graphic design, tech, art, typography, photography, architecture
                    and fashion.
                </p>
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
                            design, tech & news sources. Choose what interests
                            you and we will bring the best content together
                            in one place.
                        </p>
                    </div>
                </div>

            </section>

            {/* ================= BACKGROUND SECTION ================= */}
            <section className="backimg">
                <h1 className="backh1">Infinite World of Inspiration</h1>
                <p className="backp">
                    Loved by hundreds of thousands of designers worldwide,
                    Muzli is the leading go-to browser extension for creative professionals.
                </p>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="lh1">
                <h1 id="lh">Join top world creatives who enjoy AU</h1>
            </section>

            <section className="ldiv">
                <div className="ldiv2">
                    <p>
                        "I LOVE this app. It makes my mornings productive
                        with amazing design inspiration."
                    </p>
                    <a className="la1" href="#">Waqas Karim</a>

                    <p>
                        "The best replacement for Chrome new tab.
                        Clean, fast and no annoying ads."
                    </p>
                    <a className="la1" href="#">Hafsa Amin</a>
                </div>

                <div className="ldiv2">
                    <p>
                        "Hi AU, your teamwork is very inspirational for designers,
                        every morning starts with Muzli!"
                    </p>
                    <a className="la1" href="#">Hina Altaf</a>

                    <p>
                        "The best replacement for Chrome new tab.
                        Keeps me up-to-date with latest design feeds."
                    </p>
                    <a className="la1" href="#">Amina Zafar</a>
                </div>
            </section>

        </main>
    );
}

export default Homepage;
