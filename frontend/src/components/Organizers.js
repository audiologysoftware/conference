import React from 'react';
import './Organizers.css';

const Organizers = () => {
  return (
    <section id="organizers">
      <div className="container">
        <div className="section-title">
          <h2><b>ORGANIZING COMMITTEE</b></h2>
        </div>

        <div className="organizers-container">
          <div className="row">
            {/* Patron */}
            <div className="organizer-card patron">
              <h4><b>Patron</b></h4>
              <h5 className="name"><b>Dr. Asha Yathiraj</b></h5>
              <p>Professor</p>
              <p>JSS Institute of Speech and Hearing</p>
            </div>

            {/* Organizing Chairperson */}
            <div className="organizer-card organizing-chairperson">
              <h4><b>Organizing Chairperson</b></h4>
              <h5 className="name"><b>Dr. Suma R</b></h5>
              <p>Professor and Principal</p>
              <p>JSS Institute of Speech and Hearing</p>
            </div>
          </div>

          <div className="row center">
            {/* Organizing Secretary */}
            <div className="organizer-card organizing-secretary">
              <h4><b>Organizing Secretary</b></h4>
              <h5 className="name"><b>Dr. Hemanth N</b></h5>
              <p>Professor</p>
              <p>JSS Institute of Speech and Hearing</p>
            </div>
          </div>
        </div>

        <div className="committees-section">
          <h3>Committees</h3>

          <div className="committees-slider">
            {/* Invitation Committee */}
            <div className="committee-card">
              <h4>Invitation Committee</h4>
              <ul>
                <li><b>Chairperson:</b> Mr. Harshan Kumar</li>
                <li><b>Member Secretary:</b> Mr. Gurumallesh</li>
                <li><b>Members:</b> Mrs. Lokeshwari L</li>
              </ul>
            </div>

            {/* Registration Committee */}
            <div className="committee-card">
              <h4>Registration Committee</h4>
              <ul>
                <li><b>Chairperson:</b> Ms. Rashmi D G</li>
                <li><b>Member Secretary:</b> Mrs. Amrutha Varshini</li>
              </ul>
            </div>

            {/* Catering Committee */}
            <div className="committee-card">
              <h4>Catering Committee</h4>
              <ul>
                <li><b>Chairperson:</b> Ms. Sanjana Singh</li>
                <li><b>Member Secretary:</b> Mr. Gurumallesh</li>
                <li><b>Members:</b> Mrs. Lokeshwari L</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizers;
