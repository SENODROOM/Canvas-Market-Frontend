import Section from '../MyComponents/SectionDropDown';
import {
  ChangesToThisPrivacyPolicy,
  ContactUs,
  CookiesAndSimilarTechnologies,
  HowWeUseYourInformation,
  InformationWeCollect,
  Security,
  ThirdPartyLinks,
  YourChoices
} from '../Data/PrivacyPolicy';

export function PrivacyAndPolicy() {


  return (
    <div>
      {/* PRIVACY POLICY */}
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-header">Privacy And Policy</h1>

        <Section id="1" heading="Information We Collect" data={InformationWeCollect} />
        <Section id="2" heading="How We Use Your Information" data={HowWeUseYourInformation} />
        <Section id="3" heading="Cookies and Similar Technologies" data={CookiesAndSimilarTechnologies} />
        <Section id="4" heading="Third-Party Links" data={ThirdPartyLinks} />
        <Section id="5" heading="Security" data={Security} />
        <Section id="6" heading="Your Choices" data={YourChoices} />
        <Section id="7" heading="Changes to this Privacy Policy" data={ChangesToThisPrivacyPolicy} />
        <Section id="8" heading="Contact Us" data={ContactUs} />
      </div>

    </div>
  );
};


