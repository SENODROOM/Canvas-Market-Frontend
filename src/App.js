import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './MyComponents/Layout';

// PAGES:
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Sell from './pages/Sell';
import Get from './pages/Get';
import Cart from './pages/Cart';
import Painting from './pages//Painting';
import Account from './pages/Account';

// CONTEXTPROVIDERS:
import { OnScreenProvider } from './ContextProviders/OnScreenContext';

// UTILS:
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <>
      <OnScreenProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout body={<Home />} />} />
            <Route index element={<Layout body={<Home />} />} />
            <Route path="about" element={<Layout body={<About />} />} />
            <Route path="contact" element={<Layout body={<Contact />} />} />
            <Route path="cart" element={<Layout body={<Cart />} />} />
            <Route path="sell" element={<Layout body={<Sell />} />} />
            <Route path="get" element={<Layout body={<Get />} />} />
            <Route path="painting" element={<Layout body={<Painting />} />} />
            <Route path="account" element={<Layout body={<Account />} />} />
            {/* <Route path="*" element={<About00 />} /> */}
          </Routes>
        </BrowserRouter>
      </OnScreenProvider>
    </>
  );
}

export default App;
