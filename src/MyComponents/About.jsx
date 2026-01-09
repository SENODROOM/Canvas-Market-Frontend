import React from 'react';
import Section from '../MyComponents/SectionDropDown';
import { ChangesToThisPrivacyPolicy, ContactUs, CookiesAndSimilarTechnologies, HowWeUseYourInformation, InformationWeCollect, Security, ThirdPartyLinks, YourChoices } from '../Data/PrivacyPolicy';

const PrivacyPolicy = () => {

  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-header">
        About Us
      </h1>
      <p className='privacy-policy-header-p'>
        Canvas Market is a digital marketplace designed to connect artists and art lovers.
        We provide a trusted platform for buying and selling original artwork.
        Our mission is to make art accessible while empowering creators worldwide.
      </p>

      <Section id="1" heading="Information We Collect" data={InformationWeCollect} />
      <Section id="2" heading="How We Use Your Information" data={HowWeUseYourInformation} />
      <Section id="3" heading="Cookies and Similar Technologies" data={CookiesAndSimilarTechnologies} />
      <Section id="4" heading="Third-Party Links" data={ThirdPartyLinks} />
      <Section id="5" heading="Security" data={Security} />
      <Section id="6" heading="Your Choices" data={YourChoices} />
      <Section id="7" heading="Changes to this Privacy Policy" data={ChangesToThisPrivacyPolicy} />
      <Section id="8" heading="Contact Us" data={ContactUs} />

    </div>
  );
};

export default PrivacyPolicy;

