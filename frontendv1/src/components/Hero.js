import React, { useEffect, useState } from 'react';
import './Hero.css'; // Make sure this file imports all the necessary styles
import logo from '../assets/img/logo.png';
import jsslogo from '../assets/img/jsslogo.png';

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2025-04-03T00:00:00"); // Event date: 21st February 2025, Midnight

    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
   
      <div className='hero-main-container'>
       <section id="hero">
        <div className='logo-container'>
          <div className="logo">
            <img src={logo} className="topright-jsslogo" alt="Logo" />
            <img src={jsslogo} alt="jsslogo" className="topleft-jsslogo" />
          </div>
        </div>
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
          <h1 className="mb-4 pb-0">
            VISHRUTHA 2 : JSS ANNUAL VAK-SHARVANA CONFERENCE 2025
          </h1>
          <h4 className="herova">Exploring The Best Clinical Practices In Communication Disorders,Dysphagia and Balance Problems among Paediatric Population</h4>
          <h5 className="para">03-04 April, Sri Rajendra Centenary Auditorium JSS Hospital, Mysuru</h5>
          <h5 className="para">Organized by JSS Institute of Speech and Hearing, Mysuru</h5>

          <div id="countDiv">
            <div>
              <span className="days">{countdown.days}</span>
              <div className="smallText">Days</div>
            </div>
            <div>
              <span className="hours">{countdown.hours}</span>
              <div className="smallText">Hours</div>
            </div>
            <div>
              <span className="minutes">{countdown.minutes}</span>
              <div className="smallText">Minutes</div>
            </div>
            <div>
              <span className="seconds">{countdown.seconds}</span>
              <div className="smallText">Seconds</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
