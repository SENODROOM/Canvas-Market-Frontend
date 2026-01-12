import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './MyComponents/About';
import Layout from './MyComponents/Layout';
import Contact from './MyComponents/Contact';
import Advertise from './MyComponents/Advertise';
import Sell from './MyComponents/Sell';
import Get from './MyComponents/Get';
import { OnScreenProvider } from './ContextProviders/OnScreenContext';
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
            <Route path="advertise" element={<Layout body={<Advertise />} />} />
            <Route path="sell" element={<Layout body={<Sell />} />} />
            <Route path="get" element={<Layout body={<Get />} />} />

            {/* <Route path="*" element={<About00 />} /> */}
          </Routes>
        </BrowserRouter>
      </OnScreenProvider>
    </>
  );
}

export default App;
