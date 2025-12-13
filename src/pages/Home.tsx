// src/pages/Home.tsx
import React from 'react';
import HeroSlider from '../components/Hero'; // Adjust path if needed
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';

const Home: React.FC = () => (
    <>
        <Navigation />
        <HeroSlider />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
    </>
);

export default Home;