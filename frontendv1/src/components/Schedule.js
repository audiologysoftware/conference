import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
    const [activeTab, setActiveTab] = useState('speech-day1');  
    const [activeAccordion, setActiveAccordion] = useState(null); // To handle active accordion item

    const handleTabClick = (tab) => setActiveTab(tab);

    const handleAccordionClick = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index); // Toggle the active accordion item
    };

    const schedules = {
        speech: {
            day1: [
                { time: "9:00 am-9:50 am", session: "Clinical and Instrumental Evaluation  of Feeding and Swallowing in the Neonatal Intensive Care Unit (NICU)", details: "Dr. Angie Canning, Speech Pathologist(Senior Paediatric) Gold Coast University Hospital, South Port, Australia" },
                { time: "9:50 am – 10.40 am", session: "Knowledge and Skills Needed by Speech-Language Pathologists providing Services to Infants and Families in the NICU Environment.", details: "Dr Deepthi Thandaweshwar, Assistant Professor, Dept. of Pediatrics, JSS Hospital, MysuruEarly" },
                { time: "10:40 am-11.00 am", session: "Tea Break", details: "Tea Break" },
                { time: "11:00 am – 11:30 am", session: "Inauguration", details: "Inaguration" },
                { time: "11:30 pm – 12:00 pm", session: "Steps involved in taking the Copy right for the developed materials ", details: "Dr. Sharath Kumar, Patent Cell, AIISH, Mysore." },
                { time: "12.00 am 01.00 pm", session: "Parallel oral and Poster sessions", details: "Parallel oral and Poster sessions" },
                { time: "01:00 pm – 01.45 pm", session: "Lunch", details: "Lunch Break" },
                { time: "1.45 pm-2.15 pm", session: "Scope of AI and machine learning in healthcare", details: "Dr Nagendra Swamy, Professor, DoS in Computer Science, University of Mysore." },
                { time: "2.15 pm-3.00 pm", session: "Essential Criteria for Securing a Patent for Developed Products", details: "Dr Balamuralidhara V, Associate Professor; JSS College of Pharmacy, Mysuru" },
                { time: "3.00 pm-3.50 pm", session: "Identifying Sensory Triggers in Swallowing Difficulties among paediatric dysphagia.", details: "Ms Kavya S, Speech Language Pathologist, Magpie Speech Therapy, Bengaluru" },
                { time: "3.50 pm–4.40 pm", session: "Diet consistency: A Clinical Framework of IDDSI for Predicting Adverse Events from Aspiration.", details: "Dr Gayathri Krishnan, Assistant Professor, AIISH Mysuru" },
                { time: "4.40 pm–5.00 pm", session: "Tea break", details: "Tea break" },
                { time: "5.00 pm–5.30 pm", session: "Short- and long-term usage of tracheostomy tube, complications of tracheostomy in paediatric dysphagia.", details: "Dr Jeanne Marshall, Conjoint Senior Research Fellow, School of Health and Rehabilitation Sciences, Faculty of Health and Behavioural Sciences, University of Queensland" }
            ],
            day2: [
                { time: "8:00 am–9:00 am", session: "Poster and Oral presentations", details: "Poster and Oral Presentations" },
                { time: "9:00 am–9:50 am", session: "Phonologically-based reading disabilities: A multi-lingual intervention approach", details: "Dr. K.S. Prema, Former Professor of Language Pathology, AIISH, Mysuru" },
                { time: "9:50 am- 10:40 am", session: "Assessment of Language and Communication in infant-toddlers at risk of autism", details: "Dr. S S Meera Associate Professor, Department of Speech Pathology and Audiology, NIMHANS, Bangalore"},
                { time: "10.40 am – 11:30 pm", session: "Tea break", details: "Tea break" },
                { time: "11.30 am 12.00 pm", session: "Insight on steps in product development", details: "Vipul Arora, Associate Professor, Dept of Electrical Engineering, IIT Kanpur." },
                { time: "12.00 pm -12.50 pm", session: "Phonological Intervention in Bilingual/multilingual children", details: "Dr. N Sreedevi, Professor of Speech Sciences, Department of Speech-Language Sciences, AIISH, Mysuru" },
                { time: "12:50 pm – 1:30 pm", session: "Lunch", details: "Lunch" },
                { time: "1.30 pm– 2:20 pm", session: "Teaching orthography to bilingual children with communication disorders", details: "Dr. Gopee Krishnan, Associate Professor, Department of Speech and Hearing, MCHP, Manipal" },
                { time: "2:20 pm – 3:10 pm", session: "The Impact of Language Factors on Early Stuttering in Bilingual Children", details: "Ms. Chanchal Chowdhary, Assistant Professor in Speech-Language Pathology, Department of Speech and Hearing, MAHE, KMC Mangalore" },
                { time: "3.10 pm – 3.25 pm", session: "Tea Break", details: "Tea Break" },
                { time: "3:25 pm–4:15 pm", session: "The Intersection of Language abilities and early literacy skills in Bilingual children with Communication disorders", details: "Dr. Shivani Tiwari, Associate Professor, Department of Speech and Hearing, MCHP, Manipal" },
                { time: "4.15 onwards ", session: "Valedictory", details: "Valedictory" }
            ]
        },
        audiology: {
            day1: [
                {
                    "time": "9:00 am– 9:50 am",
                    "session": "Need for Vestibular testing in children – Scope, prevalence, presenting symptoms, and common vestibular disorders",
                    "details": " Dr. Niraj Kumar Singh, Associate Professor, Department of Audiology, AIISH, Mysore"
                },
                {
                    "time": "9:50 am– 10.40 am",
                    "session": "Early identification of vestibular disorders in children – Indicators (risk factors), screening and bedside evaluation measures and comprehensive diagnostic protocols",
                    "details": "  Dr. Karen Hendrick, Vestibular Clinical Practice Specialist, Children’s Hospital, Colorado"
                },
                {
                    "time": "10:40 am-11.00 am",
                    "session": "Tea break",
                    "details": "Tea Break"
                },
                {
                    "time": "11:00 am – 11:30 am",
                    "session": "Inauguration",
                    "details": "Inauguration"
                },
                {
                    "time": "11:30 am – 12:00 am",
                    "session": "Steps involved in taking the Copy right for the developed materials",
                    "details": "Dr. Sharath Kumar, Patent Cell, AIISH, Mysore."
                },
                {
                    "time": "12.00 am 01.00 pm",
                    "session": "Parallel oral and Poster sessions",
                    "details": "Parallel oral and Poster sessions"
                },
                {
                    "time": "01:00 pm – 01:45 pm",
                    "session": "Lunch",
                    "details": "Lunch Break"
                },
                {
                    "time": "1:45 pm-2:15 pm",
                    "session": "Scope of AI and machine learning in healthcare",
                    "details": "  Dr. Nagendra Swamy, Professor, DOS in Computer Science, University of Mysore."
                },
                {
                    "time": "2:15 pm-3:00 pm",
                    "session": "Essential Criteria for Securing a Patent for Developed Products",
                    "details": " Dr. Balamuralidhara V, Associate Professor, JSS College of Pharmacy, Mysuru"
                },
                {
                    "time": "3:00 pm-3:50 pm",
                    "session": "Peadiatric Balance Assessment:Its as Easy as 1-2-3",
                    "details": " Dr. Richard E. Gans, PhD, CCC-A, F-NAP (Confirmed), Founder, American Institute of Balance"
                },
                {
                    "time": "3:50 pm–4:40 pm",
                    "session": "Evidence Based Test Battery Selection in Peadiatric Vestibular Testing",
                    "details": " Dr. Sujeet Kumar Sinha, Associate Professor, Department of Audiology, AIISH, Mysore"
                },
                {
                    "time": "4:40 pm–5:00 pm",
                    "session": "Tea break",
                    "details": "Tea break"
                },
                {
                    "time": "5:00 pm–5:50 pm",
                    "session": "Intervention for impairments related to vestibular disorders in children",
                    "details": " Dr. Srilatha Girish, Associate Professor, JSS College of Physiotherapy, MG Road, Mysore"
                }
            ],
            day2: [
                {
                  "time": "8:00 am - 9:00 am",
                  "session": "Poster and Oral Presentations",
                  "details": "Poster and Oral Presentations"
                },
                {
                  "time": "9:00 am – 9:50 am",
                  "session": "Screening for APD",
                  "details": "Dr. Akshay Raj Maggu, Assistant Professor, University of Connecticut, USA"
                },
                {
                  "time": "9:50 am – 10:40 am",
                  "session": "Controversies in the diagnosis of APD",
                  "details": "Dr. Asha Yathiraj, Professor of Audiology, JSSISH, Mysuru."
                },
                {
                  "time": "10:40 am – 11:30 am",
                  "session": "Tea break",
                  "details": "Tea break"
                },
                {
                    "time": "11.30 am 12.00 pm",
                    "session": "Insight on steps in product development",
                    "details": "Vipul Arora, Associate Professor, Dept of Electrical Engineering, IIT Kanpur."                  
                },
                {
                  "time": "12:00 am – 12:50 pm",
                  "session": "Diagnostics of APD: Need and methods",
                  "details": "Dr. Vanaja C S, Former Principal and Professor, School of Audiology & SLP, Bharati Vidyapeeth Deemed University, Pune"
                },
                {
                  "time": "12:50 pm – 1:30 pm",
                  "session": "Lunch",
                  "details": "Lunch Break"
                },
                {
                  "time": "1:30 pm – 2:20 pm",
                  "session": "Overview to management techniques for APD",
                  "details": "Mrs. Sindhu P, Assistant Professor in Audiology, JSSISH, Mysuru."
                },
                {
                  "time": "2:20 pm – 3:10 pm",
                  "session": "Deficit specific management of APD",
                  "details": "Dr. Chandini Jain, Associate Professor in Audiology, AIISH, Mysuru."
                },
                {
                  "time": "3:10 pm – 3:25 pm",
                  "session": "Tea break",
                  "details": "Tea break"
                },
                {
                  "time": "3:25 pm – 4:15 pm",
                  "session": "Metalinguistic approaches in the management of those with APD / Phoneme Synthesis Training",
                  "details": "Dr. K.S. Prema, Former Professor of Speech Sciences, AIISH, Mysuru"
                },
                {
                    "time": "4:15 pm onwards",
                    "session": "valedictory",
                    "details": "valedictory"
                  }
              ]
        }
    };

    const renderSchedule = (category, day) => {
        return schedules[category][day].map((event, index) => (
            <li key={index} className="accordion-item">
                <button
                    className="accordion-header"
                    onClick={() => handleAccordionClick(index)}
                >
                    <div className="accordion-time">{event.time}</div>
                    <div className="accordion-session">{event.session}</div>
                    <span className={`accordion-arrow ${activeAccordion === index ? 'active' : ''}`}>▶</span>
                </button>
                <div className={`accordion-body ${activeAccordion === index ? 'active' : ''}`}>
                    <p>{event.details}</p>
                </div>
            </li>
        ));
    };

    return (
        <section id="schedule">
            <div className="conference-container">
                <h2 className="conference-title">Schedule</h2>

                <div className="conference-category-tabs">
                    <button
                        className={`conference-category ${activeTab.includes('speech') ? 'active' : ''}`}
                        onClick={() => setActiveTab('speech-day1')}
                    >
                        Speech
                    </button>
                    <button
                        className={`conference-category ${activeTab.includes('audiology') ? 'active' : ''}`}
                        onClick={() => setActiveTab('audiology-day1')}
                    >
                        Audiology
                    </button>
                </div>

                <ul className="conference-nav-tabs">
                    <li>
                        <button
                            className={`conference-nav-link ${activeTab.endsWith('day1') ? 'active' : ''}`}
                            onClick={() => handleTabClick(`${activeTab.split('-')[0]}-day1`)}
                        >
                            Day 1
                        </button>
                    </li>
                    <li>
                        <button
                            className={`conference-nav-link ${activeTab.endsWith('day2') ? 'active' : ''}`}
                            onClick={() => handleTabClick(`${activeTab.split('-')[0]}-day2`)}
                        >
                            Day 2
                        </button>
                    </li>
                </ul>

                <div className="conference-tab-content">
                    <div className="conference-tab-pane">                        
                        <h4>{activeTab.includes('speech') ? 'Speech' : 'Audiology'} - Day {activeTab.split('-')[1].toUpperCase().split('Y')[1]}</h4>
                        <ul>{renderSchedule(activeTab.includes('speech') ? 'speech' : 'audiology', activeTab.split('-')[1])}</ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
