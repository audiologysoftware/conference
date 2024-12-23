import React from 'react';
import './Speakers.css';

const speakersData = [
    { name: 'Prof. Roopa Nagarajan', designation: 'Professor and Registar SRMCRI, Chennai', image: '/img/speakers/Roopa.jpg', link: 'speaker-details.html' },
    { name: 'Prof. Rangasayee', designation: 'Former Director AYJNISHD, Mumbai', image: '/img/speakers/Rangasayee.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Subramaniyan B', designation: 'Professor SBMCH, Chennai', image: '/img/speakers/Subramaniyam.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Vidya Ramkumar', designation: 'Professor SRMCRI, Chennai', image: '/img/speakers/Vidya.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Praveen Kulkarni', designation: 'Associate Professor JSSAHER, Mysuru', image: '/img/speakers/Kulkarni.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Smitha', designation: 'Associate Professor JSSAHER, Mysuru', image: '/img/speakers/Smitha.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Elangovan', designation: 'Principal and Professor JSSPDA, Mysuru', image: '/img/speakers/Elagovan.jpg', link: 'speaker-details.html' },
    { name: 'Mr. Rithwik Kashyap', designation: 'Assistant Professor JSSAHER, Mysuru', image: '/img/speakers/Rithwik.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Kavitha Raja', designation: 'Principal and Professor JSSCPT, Mysuru', image: '/img/speakers/Kavitha.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Asha Yathiraj', designation: 'Professor JSSISH, Mysuru', image: '/img/speakers/Asha.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Prashanth', designation: 'Faculty Decentralization and Panchayath Raj, ANSIRD, Mysuru', image: '/img/speakers/Prashanth.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Basavaraju', designation: 'Former state commissioner for person with disability, PWD, GoK', image: '/img/speakers/Basavaraj.jpg', link: 'speaker-details.html' }
];

const Speaker = () => {
    return (
        <section id="speakers">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>SPEAKERS</h2>
                </div>

                {/* Grid Layout for Speakers */}
                <div className="speakers-container">
                    {speakersData.map((speaker, index) => (
                        <div key={index} className="speaker">
                            <img src={speaker.image} alt={`Speaker ${index + 1}`} className="img-fluid" />
                            <div className="details">
                                <h3><a href={speaker.link}>{speaker.name}</a></h3>
                                <p>{speaker.designation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speaker;
