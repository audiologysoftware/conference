// import React, { useState, useEffect } from 'react';
// import './Navbar.css';

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState('home');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

//   // Function to handle scroll and update active link
//   const handleScroll = () => {
//     const sections = document.querySelectorAll('section');
//     const scrollPosition = window.scrollY;

//     sections.forEach((section) => {
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.offsetHeight;
//       const id = section.getAttribute('id');
      
//       if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight) {
//         setActiveLink(id);
//       }
//     });
//   };

//   // Adding the scroll event listener
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Toggle mobile menu visibility
//   const handleMobileMenuToggle = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav id="navbar" className="navbar">
//       {/* Mobile menu toggle button */}
//       <button className="navbar-toggle" onClick={handleMobileMenuToggle}>
//         ☰
//       </button>
      
//       <ul className={`navbar-list ${isMobileMenuOpen ? 'open' : ''}`}>
//         <li><a className={`navbar-link ${activeLink === 'hero' ? 'active' : ''}`} href="#hero">HOME</a></li>
//         <li><a className={`navbar-link ${activeLink === 'about' ? 'active' : ''}`} href="#about">ABOUT</a></li>
//         <li><a className={`navbar-link ${activeLink === 'speakers' ? 'active' : ''}`} href="#speakers">SPEAKERS</a></li>
//         <li><a className={`navbar-link ${activeLink === 'organizers' ? 'active' : ''}`} href="#organizers">ORGANIZERS</a></li>
//         <li><a className={`navbar-link ${activeLink === 'supporters' ? 'active' : ''}`} href="#sponsors">SPONSORS</a></li>
//         <li><a className={`navbar-link ${activeLink === 'schedule' ? 'active' : ''}`} href="#schedule">SCHEDULE</a></li>
//         <li><a className={`navbar-link ${activeLink === 'manuscript' ? 'active' : ''}`} href="#manuscript">MANUSCRIPT</a></li>
//         <li><a className={`navbar-link ${activeLink === 'contact' ? 'active' : ''}`} href="#contact">CONTACT</a></li>
//         <li><a className={`navbar-link ${activeLink === 'venue' ? 'active' : ''}`} href="#venue">VENUE</a></li>
//         <li><a className={`navbar-link ${activeLink === 'hotels' ? 'active' : ''}`} href="#hotels">ACCOMMODATIONS</a></li>
        
//         {/* Registration Link */}
//         <li><a className={`navbar-link registration ${activeLink === 'registration' ? 'active' : ''}`} href="#registration">REGISTRATION</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight) {
        setActiveLink(id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav id="navbar" className="navbar">
      <button className="navbar-toggle" onClick={handleMobileMenuToggle}>
        ☰
      </button>
      
      <ul className={`navbar-list ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><a className={`navbar-link ${activeLink === 'hero' ? 'active' : ''}`} href="#hero">HOME</a></li>
        <li><a className={`navbar-link ${activeLink === 'about' ? 'active' : ''}`} href="#about">ABOUT</a></li>
        <li><a className={`navbar-link ${activeLink === 'speakers' ? 'active' : ''}`} href="#speakers">SPEAKERS</a></li>
        <li><a className={`navbar-link ${activeLink === 'organizers' ? 'active' : ''}`} href="#organizers">ORGANIZERS</a></li>
        <li><a className={`navbar-link ${activeLink === 'supporters' ? 'active' : ''}`} href="#sponsors">SPONSORS</a></li>
        <li><a className={`navbar-link ${activeLink === 'schedule' ? 'active' : ''}`} href="#schedule">SCHEDULE</a></li> {/* Correct anchor link */}
        <li><a className={`navbar-link ${activeLink === 'manuscript' ? 'active' : ''}`} href="#upload">MANUSCRIPT</a></li>
        <li><a className={`navbar-link ${activeLink === 'contact' ? 'active' : ''}`} href="#contact">CONTACT</a></li>
        <li><a className={`navbar-link ${activeLink === 'venue' ? 'active' : ''}`} href="#venue">VENUE</a></li>
        <li><a className={`navbar-link ${activeLink === 'hotels' ? 'active' : ''}`} href="#hotels">ACCOMMODATIONS</a></li>
        <li><a className={`navbar-link registration ${activeLink === 'registration' ? 'active' : ''}`} href="#registration">REGISTRATION</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
