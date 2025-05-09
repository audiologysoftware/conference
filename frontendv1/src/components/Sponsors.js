import React from 'react';
import './Sponsors.css'; // Assuming you have a separate CSS file for styles

// Import images from the src folder
import sponsor1 from '../assets/img/sponsors/sponsor1.png';
import sponsor2 from '../assets/img/sponsors/sponsor2.png';
import sponsor3 from '../assets/img/sponsors/sponsor3.png';
import sponsor4 from '../assets/img/sponsors/sponsor4.png';
import sponsor5 from '../assets/img/sponsors/sponsor5.png';
import sponsor6 from '../assets/img/sponsors/sponsor6.jpg';
import sponsor7 from '../assets/img/sponsors/sponsor7.png';
import sponsor8 from '../assets/img/sponsors/sponsor8.png';
import sponsor9 from '../assets/img/sponsors/sponsor9.jpg';
import sponsor10 from '../assets/img/sponsors/sponsor11.png';


const Sponsors = () => {
  return (
<section id="sponsors" data-aos="fade-up">
  <div className="container">
    <div className="section-header">
      <h2>Sponsors</h2>
    </div>

    <div className="row no-gutters supporters-wrap clearfix" data-aos="zoom-in" data-aos-delay="100">

      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor9} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor1} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor5} className="img-fluid" alt="Sponsor 5" />
        </div>
      </div>
      {/* Sponsor 2 */}
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor2} className="img-fluid" alt="Sponsor 2" />
        </div>
      </div>

      {/* Sponsor 3 */}
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor3} className="img-fluid" alt="Sponsor 3" />
        </div>
      </div>

      {/* Sponsor 4 */}
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor4} className="img-fluid" alt="Sponsor 4" />
        </div>
      </div>

 
 
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor6} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor7} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor8} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-xs-6">
        <div className="supporter-logo">
          <img src={sponsor10} className="img-fluid" alt="Sponsor 1" />
        </div>
      </div>
    </div>
  </div>
</section>


  
  );
};

export default Sponsors;
