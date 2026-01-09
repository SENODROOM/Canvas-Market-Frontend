import React from 'react';
import Section from '../MyComponents/SectionDropDown';
import { ChangesToThisPrivacyPolicy, ContactUs, CookiesAndSimilarTechnologies, HowWeUseYourInformation, InformationWeCollect, Security, ThirdPartyLinks, YourChoices } from '../Data/PrivacyPolicy';

const PrivacyPolicy = () => {

  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-header">
        MD Pharmacy Privacy Policy
      </h1>
      <p>
        We are committed to protecting your privacy and ensuring the security of
        your personal information. This Privacy Policy outlines the types of
        information we collect, how we use it, and your choices regarding the
        collection and use of your data.
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

