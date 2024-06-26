import { Routes, Route, useLocation } from "react-router-dom";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";

import NavBar from "./components/organs/NavBar"
import Home from "./components/pages/Home";
import { useEffect } from "react";
import Footer from "./components/organs/Footer";
import Package from "./components/pages/Package";
import Contact from "./components/pages/Contact";

function App() {
  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  return (
    <div className="w-full bg-white text-gray-950 font-poppins">
      <NavBar />
      <div className="mb-20"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Packages" element={<Package /> } />
        <Route path="/Contact" element={<Contact /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
