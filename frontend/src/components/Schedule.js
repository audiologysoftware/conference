import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
    const [activeTab, setActiveTab] = useState('speech-day1');
    const handleTabClick = (tab) => setActiveTab(tab);

    const schedules = {
        speech: {
            day1: [
                "9:00 AM - Opening Ceremony",
                "10:00 AM - Introduction to Communication Disorders",
                "12:00 PM - Lunch Break",
                "1:30 PM - Speech Therapy Innovations",
                "3:00 PM - Break",
                "3:30 PM - Case Studies in Speech Disorders"
            ],
            day2: [
                "9:00 AM - Keynote: Future of Speech Pathology",
                "10:30 AM - Assessment Techniques Workshop",
                "12:00 PM - Lunch Break",
                "1:00 PM - Clinical Tools for Speech Therapy",
                "3:00 PM - Break",
                "3:30 PM - Panel: Speech-Language Challenges"
            ]
          
        },
        audiology: {
            day1: [
                "9:00 AM - Welcome Session",
                "10:00 AM - Basics of Audiology",
                "12:00 PM - Lunch Break",
                "1:30 PM - Advances in Hearing Aid Tech",
                "3:00 PM - Break",
                "3:30 PM - Case Discussions in Audiology"
            ],
            day2: [
                "9:00 AM - Keynote: Hearing Research Trends",
                "10:30 AM - Cochlear Implant Workshop",
                "12:00 PM - Lunch Break",
                "1:00 PM - Pediatric Audiology Tools",
                "3:00 PM - Break",
                "3:30 PM - Discussion: Hearing Health Challenges"
            ],
        
        }
    };

    const renderSchedule = (category, day) => {
        return schedules[category][day].map((event, index) => <li key={index}>{event}</li>);
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
                        <h4>{activeTab.includes('speech') ? 'Speech' : 'Audiology'} - {activeTab.split('-')[1].toUpperCase()}</h4>
                        <ul>{renderSchedule(activeTab.includes('speech') ? 'speech' : 'audiology', activeTab.split('-')[1])}</ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
