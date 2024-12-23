import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="content">
          <div className="about-jss">
            <h2>ABOUT JSS</h2>
            <p>
              JSS Institute of Speech and Hearing, Mysuru is a unit of JSS Mahavidyapeetha. The institute is affiliated to the 
              University of Mysore and recognized by the Rehabilitation Council of India, Govt. of India. The Institute is also 
              recognized as a research center by the University of Mysore. The activities of the institute are spread across four 
              major domains: academic, research, clinical, and public education. The Institute offers Bachelor's, Master's, and 
              Doctoral Programs in Speech and Hearing. Seminars/CRE/Workshops are regularly conducted to upgrade the knowledge 
              & skills of in-service master trainers and practicing professionals in the field.
            </p>
          </div>
          <div className="about-conference">
            <h2>ABOUT CONFERENCE</h2>
            <p>
              The National Conference on Community-Based Rehabilitation (CBR) is a significant gathering that serves as a platform 
              for stakeholders, experts, policymakers, and practitioners from across the country to converge and discuss critical 
              issues related to disability inclusion, rehabilitation, and community development. The following objectives were framed:
            </p>
            <ul>
              <li>Determine the readiness and capacity of the institute to establish a CBR unit.</li>
              <li>Promote collaboration among professionals, government officials, NGOs, educators, and engineers for a coordinated approach to CBR implementation.</li>
              <li>Provide capacity-building sessions for rehabilitative professionals to develop an advocacy strategy to garner support for the CBR unit at the institutional and community level.</li>
              <li>Identify potential funding sources and sustainability strategies for the unit.</li>
            </ul>
            <p>
              The outcome of the national conference is to equip rehabilitative professionals and stakeholders with the knowledge 
              and skills necessary to implement a community-based rehabilitation (CBR) program effectively at institutional and 
              community levels.
            </p>
            <p className="highlight"><strong>Who all can participate?</strong></p>
            <p>
              Undergraduate students, postgraduate students, research scholars, and working professionals from diverse specialties 
              including speech-language pathology, audiology, special education, physiotherapy, occupational therapy, psychology, 
              and social work are encouraged to participate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
