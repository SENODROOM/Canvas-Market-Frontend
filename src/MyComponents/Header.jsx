import weblogo from '../Images/logo.jpeg';
import { Link } from "react-router-dom";

function Header() {

    return (
        <>
        <header>
            <nav>
                <div className="nav-left">
                    <Link to="/" className="Special-a">
                        <img src={weblogo} alt="" className="logo" />
                        <b>Artistry Unleashed</b>
                    </Link>
                </div>
                <div className="nav-right">
                    <ul className="nav-ul">
                        <li>
                            <Link to="/about" className="li-link">
                                About 
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="li-link">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/advertise" className="li-link">
                                Advertise on AU
                            </Link>
                        </li>
                        {/* <li>
                            <a href="#" className="li-link">
                                Blog
                            </a>
                        </li> */}
                        <li>
                            <Link to="/Sell" className='li-link'>
                                Sell Paintings
                            </Link>
                        </li>
                        <li className="Buy">
                            <Link to="/Get" className='li-link'>
                                Get Paintings
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        </>
    )

}

export default Header;
