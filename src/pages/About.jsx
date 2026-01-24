
import { PrivacyAndPolicy } from "../MyComponents/PrivacyAndPolicy";
import { WhyChooseUs } from "../MyComponents/WhyChooseUs";
import { TitleAndRectangularImage } from "../MyComponents/TitleAndRectangularImage";

function About() {


  return (
    <main>

      {/* ABOUT HEADING */}
      <section className="about-heading">
        <h1 className="about-title">About Us</h1>
        <p className="about-tagline">
          A creative space built to celebrate art, empower artists,
          and connect people through meaningful visuals.
        </p>
      </section>


      <TitleAndRectangularImage />

      <WhyChooseUs />

      <PrivacyAndPolicy />

    </main>
  );
};
export default About;

