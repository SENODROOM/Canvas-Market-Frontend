import { useState } from "react";
import { Link } from "react-router-dom";
import CircularGauge from "./Circular Image";

export function SellAndBuySection() {
  const [active, setActive] = useState("sell");

  return (
    <>
      {/* Top Buttons */}
      <div className="kutti-button">
        <div
          className={`buttonss ${active === "sell" ? "active" : ""}`}
          onClick={() => setActive("sell")}
        >
          SELL
        </div>

        <div
          className={`buttonss ${active === "buy" ? "active" : ""}`}
          onClick={() => setActive("buy")}
        >
          BUY
        </div>
      </div>

      <section id="kutti">
        {/* SELL SECTION */}
        {active === "sell" && (
          <div className="left show slide-up">
            <h1>Monetize Your Art</h1>
            <p>
             Turn your creativity into cash! Showcase your artwork, reach art lovers, and start selling your pieces effortlessly. Whether it’s digital designs, paintings, or handmade crafts, our platform helps you connect with buyers and get paid for your passion. Start turning your talent into a thriving art business today!c
            </p>
            <Link to="/Sell" className="link-sell">
              <div className="button">Sell Now</div>
            </Link>
          </div>
        )}

        {/* BUY SECTION */}
        {active === "buy" && (
          <div className="left show2 slide-up">
            <h1>Acquire Art That Inspires</h1>
            <p>
              Discover unique artworks created by talented artists and bring creativity into your space. Whether you’re looking for a statement piece or something subtle and meaningful, each artwork is crafted with passion and originality. Acquiring art is not just about ownership—it’s about connecting with creativity, supporting artists, and adding character to your surroundings.
            </p>
            <Link to="/Get" className="link-sell">
              <div className="button">Buy Now</div>
            </Link>
          </div>
        )}

        <CircularGauge />
      </section>
    </>
  );
}
