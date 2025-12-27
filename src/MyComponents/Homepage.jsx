import i1 from '../Images/i1.jpeg';
import i4 from '../Images/i4.jpeg';
import i12 from '../Images/i12.jpeg';
import i13 from '../Images/i13.jpeg';
import i15 from '../Images/i15.jpeg';
import i16 from '../Images/i16.jpeg';
import i7 from '../Images/i7.jpeg';
import i8 from '../Images/i8.jpeg';
import i9 from '../Images/i9.jpeg';
import i10 from '../Images/i10.jpeg';
import i11 from '../Images/i11.jpeg';
import i2 from '../Images/i2.jpeg';
import mobile from '../Images/mobile.jpg';
import sources from '../Images/sources.jpg';
import cards from '../Images/cards.jpg';

function Homepage(){
   return(
    <main>
        <div className="bahubali">
            <div className="mainheading">
                Designers' Secret Source

            </div>
            <div className="subheading">
                <p> The best design inspiration - expertly curated for you.</p>
            </div>
            <div className="text">
                <p> Muzli is a new-tab br/owser extension that instantly delivers relevant design <br/>
                    stories and inspiration to keep you in the loop. <a href="#">More about AU</a> </p>
            </div>
        </div>

        <div className="home-images">
            <div className="home-images-slider">
            <div className="a">
                <img src='https://source.unsplash.com/1600x1600/?art' alt="i1"/>
                <img src='https://source.unsplash.com/1600x1600/?art' alt="i4"/>
                <img src='https://source.unsplash.com/1600x1600/?art' alt="i12"/>
            </div>
            <div className="b">
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i13"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i15"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
            </div>
            <div className="a">
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
            </div>
            <div className="b">
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting'alt="i16"/>
            </div>
            <div className="a">
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
            </div>
            <div className="b">
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting'alt="i16"/>
            </div>
            <div className="a">
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
            </div>
            <div className="b">
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting'alt="i16"/>
            </div>
            <div className="a">
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?art'alt="i16"/>
            </div>
            <div className="b">
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting' alt="i16"/>
                <img src='https://source.unsplash.com/1600x1600/?painting'alt="i16"/>
            </div>
            </div>
        </div>
        <div className="mid">
            <div className="sechead">
                <h1> Hand picked inspiration </h1>

            </div>
            <div className="para">
                <p> Join over <b>700K designers</b>, product managers & developers to get your daily dose of fresh,
                    professionally curated <br/> graphic design, tech, news, art,
                    illustration, typography, photography, architecture, fashion and so much more.</p>

            </div>
        </div>
        <div id="chuchu">
            <img id="ia" src={mobile} alt="image"/>
        </div>
        <div className="hero">
            <div className="herotext">
                <h1 className="heroh1">Be the first to know of <br/>the latest design trends</h1>
                <p id="para1">Staying current is crucial to continuously improve yourself and be <br/>
                    prepared for upcoming trends in design & technology. <br/>
                    Learn new skills and get inspired by what others are doing.</p>

                <img id="himg2" src={sources} alt="sources"/>

            </div>
            <div className="heroimg">
                <img id="himg" src={cards} alt=""/>
                <div className="p2">

                    <h1 id="he1">Customizable & <br/>personalized</h1>
                    <p id="para1"> Muzli curates the latest content from hundreds of online design, tech & <br/>
                        news publications. you can pick-and-choose what interests you and <br/>
                        we'll take care of the rest by surfacing the best content and br/ing it all together. <br/>

                        Stay on top of it all and find everything in one place. </p>
                </div>

            </div>

        </div>
        <div className="backimg">
            <h1 className="backh1">Infinite World of Inspiration</h1>
            <div className="divp">
                <p className="backp">
                    Experience inspiration like never before. Loved by hundreds of thousands designers worldwide,
                    Muzli is the leading go-to br/owser extension for creative professionals.
                </p>
            </div>

        </div>

        <div className="lh1">
            <h1 id="lh">Join top World creatives who enjoy AU</h1>
        </div>
        <div className="ldiv">
            <div className="ldiv2">
                <ul>
                    <li id="ll1">"I LOVE this app it is very useful and helpful. Thanks<br/> AU you made my daily life
                        easy with awesome content"</li>
                    <li> <a className="la1" href="#">Waqas Karim</a></li>
                    <li id="ll3">"the best replacement for chrome new tab it keeps me up <br/>
                        to-date with the latest designing feeds with no stupid ads all <br/>
                        over the place thanks for that"</li>
                    <li> <a className="la1" href="#">Hafsa Amin</a></li>
                </ul>
            </div>
            <div className="ldiv2">
                <ul>

                    <li id="ll2">"Hi AU, your team work is very inspirational for Designer, in <br/>every morning start
                        one cup of coffee with MUZLi!"</li>
                    <li> <a className="la1" href="#">Hina Altaf</a></li>
                    <li id="ll3">"the best replacement for chrome new tab it keeps me up <br/>
                        to-date with the latest designing feeds with no stupid ads all <br/>
                        over the place thanks for that"</li>
                    <li> <a className="la1" href="#">Amina Zafar</a></li>
                </ul>
            </div>
        </div>
    </main>
   )
}
export default Homepage;