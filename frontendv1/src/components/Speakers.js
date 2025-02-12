import React from 'react';
import './Speakers.css';

const speakersData = [
    { name: 'Dr. K.S. Prema', designation: 'Former Professor of Language Pathology,AIISH, Mysuru', image: '/img/speakers/Prema.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Akshay Raj Maggu', designation: 'Assistant Professor, University of Connecticut, USA', image: '/img/speakers/Akshay.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Shivani Tiwari', designation: 'Associate Professor, Department of Speech and Hearing MCHP, Manipal', image: '/img/speakers/Shivani.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Asha Yathiraj', designation: 'Professor, JSSISH, Mysuru', image: '/img/speakers/Asha.jpg', link: 'speaker-details.html' },
    { name: 'Dr. N Sreedevi ', designation: 'Professor of Speech Sciences and Chairperson, C-PECD, AIISH Mysuru', image: '/img/speakers/Sreedevi.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Vanaja C S ', designation: 'Former Principal and Professor of Audiology, BVP, Pune', image: '/img/speakers/Vanaja.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Gopee Krishnan', designation: ' Associate Professor, Dept. of Speech and Hearing, MCHP, Manipal', image: '/img/speakers/Gopee.jpg', link: 'speaker-details.html' },
    { name: 'Ms. Sindhu P', designation: 'Assistant Professor, Dept. of Audiology, JSSISH, Mysuru', image: '/img/speakers/Sindhu.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Chanchal Chaudhary', designation: 'Assistant Professor, Dept. of Speech and Hearing, MAHE, KMC Mangalore', image: '/img/speakers/Chanchal.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Chandini Jain', designation: 'Associate Professor, Dept. of Audiology, AIISH, Mysuru.', image: '/img/speakers/Chandini.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Vipul Arora,', designation: 'Associate Professor, IIT, New Delhi', image: '/img/speakers/Vipul.jpg', link: 'speaker-details.html' },
    { name: 'Dr Nagendra swamy', designation: ' Professor DoS in Computer Science, University of Mysore', image: '/img/speakers/Nagendra.jpg', link: 'speaker-details.html' },
    { name: 'Dr Olivia Brooks', designation: 'Pediatric SLP UF Health Shands Hospital Gainesville, Florida, USA', image: '/img/speakers/Olivia.jpg', link: 'speaker-details.html' },
    { name: 'Dr Deepthi Thandaweshwar', designation: 'Assistant Professor, Dept. of Pediatrics, JSS Hospital Mysuru', image: '/img/speakers/Deepthi.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Skye Nandi Adams', designation: 'Lecturer Dep. of SLP, University of the Witwatersrand', image: '/img/speakers/Skye.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Richard E. Gans ', designation: 'PhD, CCC-A, F-NAP Founder American Institute of Balance', image: '/img/speakers/Richard.jpg', link: 'speaker-details.html' },
    { name: 'Dr Gayathri Krishnan', designation: 'Assistant Professor, Center for Swallowing Disorders, AIISH, Mysuru', image: '/img/speakers/Gayathri.png', link: 'speaker-details.html' },
    { name: 'Dr. Niraj Kumar Singh', designation: 'Associate Professor, Department of Audiology, AIISH, Mysuru', image: '/img/speakers/Niraj.jpg', link: 'speaker-details.html' },
    { name: 'Dr Jeanne Marshall', designation: 'Conjoint Senior Research Fellow School of Health and Rehabilitation Sciences, University of Queensland', image: '/img/speakers/Jeanne.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Karen Hendrick ', designation: '  Vestibular Clinical Practice Specialist, Children’s Hospital Colarado', image: '/img/speakers/Karen.jpg', link: 'speaker-details.html' },
    { name: 'Dr. S S Meera', designation: 'Associate Professor, Dept. of Speech Pathology and Audiology, NIMHANS, Bangalore', image: '/img/speakers/Meera.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Sreelatha Girish', designation: 'Professor and HOD (Peadiatric Sciences), JSS College of Physiotherapy, Mysuru', image: '/img/speakers/Sreelatha.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Sujeet Kumar Sinha', designation: 'Associate Professor, Department of Audiology, AIISH, Mysuru', image: '/img/speakers/Sujeet.jpg', link: 'speaker-details.html' },
    { name: 'Dr Balamuralidhara V,', designation: 'Associate Professor, JSS College of Pharmacy, Mysuru', image: '/img/speakers/Balamuralidhara.jpg', link: 'speaker-details.html' },
    { name: 'Dr. Sharath Kumar', designation: 'Patent Cell, AIISH, Mysuru', image: '/img/speakers/Sharath.jpg', link: 'speaker-details.html' },
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
