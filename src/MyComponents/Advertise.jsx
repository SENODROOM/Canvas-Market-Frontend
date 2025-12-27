import ad1 from '../Images/ad1.png';
import ad2 from '../Images/ad2.png';
import ad3 from '../Images/ad3.png';
import ad4 from '../Images/ad4.png';
import f1 from '../Images/f1.png';

function Advertise() {
    return (
        <>
            <main>
                <div class="add-backimg bacimg">
                    <h1 class="add-backh1 backh1">Advertise on ArtistryUnleashed</h1>
                    <div class="divp">
                        <p class="add-backp backp">
                            Reach out to world's best designers, developers,<br /> and creative agencies.
                        </p>
                    </div>
                    <button class="add-but">Get Started</button>

                </div>
                <div class="sec">
                    <h1> Connect with the audience of creative professionals </h1>
                    <p class="secp">Boost your brand and drive traffic by tapping into a vast and high-quality audience of creatives,<br />
                        <span class="sp">designers, developers and product managers who use Muzli everyday.</span></p>

                </div>
                <h1 class="ph">Why partner with us?</h1>

                <div class="partner">

                    <div class="imgs">
                        <div class="i"><img src={ad1} alt="" class="ad" />
                            <h2 class="adh2">Brand awareness</h2>
                            <p class="adp">Strengthening the brand of the product by daily exposure to a targeted audience</p>
                        </div>
                        <div class="i"><img src={ad2} alt="" class="ad" />
                            <h2 class="adh2">Lead generation</h2>
                            <p class="adp">Unique and customized options and collaborations to maximize lead generation</p>
                        </div>
                        <div class="i"><img src={ad3} alt="" class="ad" id="ad3" />
                            <h2 class="adh2">Thought leadership</h2>
                            <p class="adp">As a leader & credibility tool we have the power to put our stamp on good products</p>
                        </div>
                        <div class="i"><img src={ad4} alt="" class="ad" />
                            <h2 class="adh2">Drive traffic</h2>
                            <p class="adp">For suitable products, we can generate a large and high-quality traffic in a short time</p>
                        </div>
                    </div>
                </div>

                <h1 class="ph">Some of our friends</h1>
                <img src={f1} alt="" class="friends" />




            </main>
        </>
    )
}

export default Advertise;