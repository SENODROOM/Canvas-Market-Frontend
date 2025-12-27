// import aboutCSS from '../assets/css/about.css';
import gif from '../Images/gif.gif';
import a1avf from '../Images/a1.avif';
import a1 from '../Images/a1.png';
import a3 from '../Images/a3.png';
import aboutmain from '../Images/aboutmain.jpg';

function About() {
    return (
        <>
            <main>
                <div className="bahubali">
                    <div className="about-mainheading mainheading">
                        About ArtistryUnleashed
                    </div>
                    <div className="about-subheading subheading" id="sub">
                        <p> Design inspiration, news, and trends, curated exactly to your taste -- say hello to Muzli!</p>
                    </div>
                    <div className="about-text text" id="t">
                        <p> Muzli instantly delivers cutting-edge design projects and news each time a new tab is open in your
                            browser.
                            Discover the best web design inspiration, best websites, best logos, web trends,
                            best mobiles sites and applications, minimalist websites, brutalist websites, innovative
                            illustrations, design
                            features, unique websites, photography projects, and visual art, as well as opinions and articles
                            from design
                            <br/> experts across the web
                                and around the world.
                        </p>

                        <p>Mining leading web sources like Dribbble, Behance, Designspiration, Mashable,
                            Techcrunch and over 150 other, Muzli combines automated curation with human discovery,
                            to uncover the best design inspiration and news that you won’t find with a web search.
                            This endless source of ideas for designers and creative professionals will keep you in-the-know and
                            constantly inspired. <br/>
                                Start exploring! <br/>

                                </p>
                                <a className="about-bahubali-a" href="#">Get AU for Chrome</a>
                            </div>
                    </div>

                    <div className="aboutimg">
                        <img src={aboutmain} alt="" />
                    </div>

                    <h1 className="about-media media">Press & Media</h1>
                    <div className="gif">
                        <img src={gif} alt="" />
                        <div className="text-overlay">
                            <div>
                            "When you look at @usemuzli for 3 hours straight"
                            </div>
                            </div>
                    </div>
                    <div className="about-pic pic">
                        <div className="apic"><a href=""><img src={a1avf} alt="" />
                            <p>
                                <b>Muzli Search is Launched <br/></b>
                                <span>producthunt.com <br/></span>
                                We’re excited to introduce Muzli Search, the newest way to discover
                                eye-catching imagery and ideas, all in one place. Check it out here:
                                https://search.muz.li/.
                            </p>
                        </a></div>
                        <div className="apic"><a href=""><img src={a1} alt="" />
                            <p>
                                <b>The borrowed muse: does inspiration come from imitation? [interview] <br/></b>
                                <span>webydo.com <br/></span>
                                Designers are terrified of imitation and they have reason to be wary. Take, for example, the
                                story of Japanese designer Kenjiro Sano, who designed the logo for the 2020 Tokyo Olympic Games
                                and was later accused of ripping a Belgian theater with a nearly identical emblem.
                                A scandal ensued, the Tokyo Olympic Committee scrapped Sano’s design entirely and his reputation
                                was ruined...

                            </p>
                        </a></div>
                        <div className="apic"><a href=""><img src={a3} alt="" />
                            <p>
                                <b>Muzli joins InVision <br/></b>
                                <span>invisionapp.com <br/></span>
                                Muzli is a much-loved tool in the design community, used by more than 200,000
                                designers—including our own!—to inform and inspire them every day. That’s why we’re beyond
                                excited to share we are welcoming the Muzli team to our InVision LABS fami...

                            </p>
                        </a></div>
                    </div>

            </main>
        </>
    )

}

export default About;