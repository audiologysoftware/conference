import React, { useState } from 'react';
import './Organizers.css';

const Organizers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const committeeData = [
    {
      title: "Registration Committee",
      members: [
        { role: "Chairperson", name: "Ms. Rashmi D G" },
        { role: "Member Secretary", name: "Mrs. Amrutha Varshini" },
      ],
    },
    {
      title: "Technical Committee",
      members: [
        { role: "Chairperson", name: "Dr. Kiran B" },
        { role: "Member Secretary", name: "Ms. Sneha Rao" },
      ],
    },
    {
      title: "Event Coordination Committee",
      members: [
        { role: "Chairperson", name: "Dr. Arun Kumar" },
        { role: "Member Secretary", name: "Mrs. Lakshmi Nair" },
      ],
    },
    {
      title: "Hospitality Committee",
      members: [
        { role: "Chairperson", name: "Mr. Rajesh Kumar" },
        { role: "Member Secretary", name: "Ms. Asha R" },
      ],
    },
    {
      title: "Logistics Committee",
      members: [
        { role: "Chairperson", name: "Ms. Anita Sharma" },
        { role: "Member Secretary", name: "Mr. Suresh Babu" },
      ],
    },
  ];


  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === committeeData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? committeeData.length - 1 : prevIndex - 1
    );
  };


  return (
    <section id="organizers">    
        <div className="section-title-org">
          <h2>ORGANIZING COMMITTEE</h2>
        </div>
        <div className="organizers-container">
          <div className="row patron">
            {/* Patron */}
            <div className="organizer-card patron">
              <h4><b>Patron</b></h4>
              <h5 className="name"><b>Dr. Asha Yathiraj</b></h5>
              <p>Professor</p>
              <p>JSS Institute of Speech and Hearing</p>
            </div>
          </div>

          <div className="row second-row">
            {/* Organizing Chairperson */}
            <div className="organizer-card organizing-chairperson">
              <h4><b>Organizing Chairperson</b></h4>
              <h5 className="name"><b>Dr. Suma R</b></h5>
              <p>Professor and Principal</p>
              <p>JSS Institute of Speech and Hearing</p>
            </div>

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
          <div className="carousel-container">
            <button className="carousel-button prev" onClick={handlePrev}>
              &#9664;
            </button>
            <div className="carousel-wrapper">
              <div
                className="carousel-content"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {committeeData.map((committee, index) => (
                  <div className="committee-card" key={index}>
                    <h4>{committee.title}</h4>
                    <ul>
                      {committee.members.map((member, idx) => (
                        <li key={idx}>
                          <b>{member.role}:</b> {member.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-button next" onClick={handleNext}>
              &#9654;
            </button>
          </div>
        </div>      
    </section>
  );
};

export default Organizers;
