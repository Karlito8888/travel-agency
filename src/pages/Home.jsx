import React from 'react';
import Accueil from '../components/Accueil';
import Slider from '../components/Slider';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      <Accueil />
      <Slider />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;