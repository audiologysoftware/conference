import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css'
import About from '../components/About';
import Speaker from '../components/Speakers';
import Hero from '../components/Hero';
import Organizers from '../components/Organizers';
import Sponsors from '../components/Sponsors';
import Schedule from '../components/Schedule';
import Registration from '../components/Registration';
import Upload from '../components/Upload';
import Contact from '../components/Contact';
import Venue from '../components/Venue';


function Home() {
    return (
        <div className="container">
            <Navbar />
            <Hero />
            <About />
            <Speaker />
            <Organizers />
            <Sponsors />
            <Schedule />
            <Registration/>
          <Upload/>
         <Contact/>
         <Venue/>
        </div>
    );
}

export default Home;
