import { Link } from "react-router-dom";
import CircularGauge from "./Circular Image";
export function MonetizeSection() {
    return (
        <>
            <section id="kutti">
                <div className="left">
                    <h1>Monetize Your Art</h1>
                    <p>Turn your creativity into cash! Showcase your artwork, reach art lovers, and start selling your pieces effortlessly. Whether it’s digital designs, paintings, or handmade crafts, our platform helps you connect with buyers and get paid for your passion. Start turning your talent into a thriving art business today!</p>
                    <Link to="/Sell" className="link-sell"><div className="button"> Sell</div></Link>
                </div>
                <CircularGauge />

            </section>
        </>
    )
}