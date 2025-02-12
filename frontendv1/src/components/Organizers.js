import React, { useState } from 'react';
import './Organizers.css';

const Organizers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const committeeData = [
    {
      title: "Invitation Committee",
      members: [
        { role: "Chairperson", name: "Mr. Harshan Kumar" },
        { role: "Member Secretary", name: "Mr. Gurumallesh" },
      ],
    },
    {
      title: "Registration Committee",
      members: [
        { role: "Chairperson", name: "Ms. Rashmi D. G." },
        { role: "Member Secretary", name: "Ms. Lokeshwari L" },
        { role: "Members", name: "Ms Jayalakshmi,Ms Nayana,Ms Spoorthi Thammaiah,Ms Teja G" },
      ],
    },
    {
      title: "Catering Committee",
      members: [
        { role: "Chairperson", name: "Ms. Sanjana Singh S" },
        { role: "Member Secretary", name: "Ms Kruthika" },
      
      ],
    },
    {
      title: "Scientific Committee",
      members: [
        { role: "Chairperson", name: "Dr. Narasimhan S V" },
        { role: "Member Secretary", name: "Mr. Vishal K" },
        { role: "Members", name: "Dr. Asha Yathiraj ,Dr. Hemanth N,Ms. Vasuprada,Ms. Revathi R,Ms. Sruthi K Vinod,Ms. Sindhu P,Mr Guna Sagar" },
      ],
    },
    {
      title: "Souvenir Committee",
      members: [
        { role: "Chairperson", name: " Mr. Vipin Ghosh" },
        { role: "Member Secretary", name: "Ms. Kruthika S." },
      ],
    },
    {
      title: "Travelling and Accommodation Committee ",
      members: [
        { role: "Chairperson", name: "Mr. Gunasagar S M" },
        { role: "Member Secretary", name: "Ms. Vasupradaa M" },
        { role: "Members", name: "Mr Pawan, Mr Naveen,Mr Abhishek" },
      ],
    },
    {
      title: "Finance, Budgeting Committee ",
      members: [
        { role: "Chairperson", name: "Ms. Sanjana Singh S" },
        { role: "Member Secretary", name: "Mrs. Neelaveni" },
      ],
    },
    {
      title: "Sponsorship Committee",
      members: [
        { role: "Chairperson", name: "Dr. Hemanth N." },
        { role: "Member Secretary", name: "Ms. Sindhu P." },
      ],
    },
    // {
    //   title: "Exhibitor Committee",
    //   members: [
    //     { role: "Chairperson", name: "Mr. Sridhar C." },
      
    //   ],
    // },
    {
      title: "Stage and Audio-Visual Committee ",
      members: [
        { role: "Chairperson", name: "Dr. Shilpashri H. N." },
        { role: "Member Secretary", name: "Mrs. Saraswathi S" },
        { role: "Members", name: "Ms. Sahana K.,Ms Shravana,Ms Anjana,Ms Pramela" },
      ],
    },
    {
      title: "Digitization Committee",
      members: [
        { role: "Chairperson", name: "Dr. Hemanth N." },
        { role: "Member Secretary", name: "Mr. Prashanth" },
        { role: "Member", name: "Mr. Varun K" },
      ],
    },
 
    {
      title: "Cultural Committee",
      members: [
        { role: "Chairperson", name: "Ms. Monica Rathnamala" },
        { role: "Member Secretary", name: "Ms Madalambika M B" },
        { role: "Members", name: "Ms Bhoomika,Ms Ambika" },
      ],
    },
    // {
    //   title: "Preparation of Conference Report and report for RCI",
    //   members: [
    //     { role: "Chairperson", name: "Ms. Sindhu" },
    //     { role: "Member Secretary", name: " Ms Sankalpa" },
    //   ],
    // },
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
              <div className="carousel-content"   style={{transform: `translateX(-${currentIndex * 100}%)`,}}>
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
