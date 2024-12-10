import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
    const [activeTab, setActiveTab] = useState('day1');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <section id="schedule">
      <div className="conference-container">
        <h2 className="conference-title"> Schedule</h2>
        
        {/* Tab navigation */}
        <ul className="conference-nav-tabs">
          <li className="conference-nav-item">
            <button
              className={`conference-nav-link ${activeTab === 'day1' ? 'active' : ''}`}
              onClick={() => handleTabClick('day1')}
            >
              Day 1
            </button>
          </li>
          <li className="conference-nav-item">
            <button
              className={`conference-nav-link ${activeTab === 'day2' ? 'active' : ''}`}
              onClick={() => handleTabClick('day2')}
            >
              Day 2
            </button>
          </li>
          <li className="conference-nav-item">
            <button
              className={`conference-nav-link ${activeTab === 'day3' ? 'active' : ''}`}
              onClick={() => handleTabClick('day3')}
            >
              Day 3
            </button>
          </li>
        </ul>
        
        {/* Tab content */}
        <div className="conference-tab-content">
          {activeTab === 'day1' && (
            <div className="conference-tab-pane">
              <h4>Day 1 Schedule</h4>
              <ul>
                <li>9:00 AM - Opening Ceremony</li>
                <li>10:00 AM - Session 1: Introduction to JavaScript</li>
                <li>12:00 PM - Lunch Break</li>
                <li>1:30 PM - Session 2: Advanced CSS Techniques</li>
                <li>3:00 PM - Break</li>
                <li>3:30 PM - Session 3: Web Development Tools</li>
              </ul>
            </div>
          )}
  
          {activeTab === 'day2' && (
            <div className="conference-tab-pane">
              <h4>Day 2 Schedule</h4>
              <ul>
                <li>9:00 AM - Keynote: The Future of Web Development</li>
                <li>10:30 AM - Session 1: React for Beginners</li>
                <li>12:00 PM - Lunch Break</li>
                <li>1:00 PM - Session 2: Node.js & Express</li>
                <li>3:00 PM - Break</li>
                <li>3:30 PM - Panel Discussion: Best Practices in Web Development</li>
              </ul>
            </div>
          )}
  
          {activeTab === 'day3' && (
            <div className="conference-tab-pane">
              <h4>Day 3 Schedule</h4>
              <ul>
                <li>9:00 AM - Session 1: Building Full-Stack Applications</li>
                <li>11:00 AM - Break</li>
                <li>11:30 AM - Workshop: Debugging JavaScript</li>
                <li>1:00 PM - Lunch Break</li>
                <li>2:00 PM - Final Project Presentations</li>
                <li>4:00 PM - Closing Remarks</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      </section>
    );
  };

export default Schedule;
