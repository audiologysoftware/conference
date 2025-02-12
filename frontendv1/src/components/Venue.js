import React from 'react';
import './Venue.css';
import vg1 from '../assets/img/venue-gallery/1.jpg';
import vg2 from '../assets/img/venue-gallery/2.jpg';  
import vg3 from '../assets/img/venue-gallery/3.jpg';
import vg4 from '../assets/img/venue-gallery/4.jpg';
import vg5 from '../assets/img/venue-gallery/5.jpg';  
import vg6 from '../assets/img/venue-gallery/6.jpg';

const Venue = () => {
  return (
    <section id="venue">
      <div className="venue-container" data-aos="fade-up">
        <div className="venue-header">
          <h2>Venue</h2>
          <p>Join us </p>
        </div>
           <div className="venue-header">
            <h2>Sri Rajendra Centenary Auditorium</h2>
            <p>JSS Hospital, Mysuru</p>
          </div>
        <div className="venue-map-and-info">
          <div className="venue-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15593.159891540468!2d76.6557627!3d12.2962487!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf71693ea2fe01%3A0x36fd3847b04bf8c3!2sSRI%20RAJENDRA%20CENTENARY%20AUDITORIUM!5e0!3m2!1sen!2sin!4v1697473147745!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
    
        </div>

      </div>

      <div className="venue-gallery-container" data-aos="fade-up" data-aos-delay="100">
        <div className="gallery-grid">
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/1.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg1} alt="Gallery Image 1" className="gallery-img"/>
            </a>
          </div>
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/2.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg2} alt="Gallery Image 2" className="gallery-img"/>
            </a>
          </div>
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/3.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg3} alt="Gallery Image 3" className="gallery-img"/>
            </a>
          </div>
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/4.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg4} alt="Gallery Image 4" className="gallery-img"/>
            </a>
          </div>
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/5.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg5} alt="Gallery Image 4" className="gallery-img"/>
            </a>
          </div>
          <div className="gallery-item">
            <a href="assets/img/venue-gallery/6.jpg" className="gallery-link" data-gall="venue-gallery">
              <img src={vg6} alt="Gallery Image 4" className="gallery-img"/>
            </a>
          </div>
        </div>
   
      </div>

    </section>
  );
};

export default Venue;
