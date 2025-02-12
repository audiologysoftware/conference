import React, { useState } from "react";
import './MobilePopup.css'

const MobilePopup = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (e) => {
    const target = e.currentTarget.getAttribute("href").substring(1);
    setActiveLink(target);
  };

  return (
    <div className="mobile-popup">
        <a
        className={`navbar-link registration ${activeLink === "registration" ? "active" : ""}`}
        href="#registration"
        onClick={handleLinkClick}
      >
        Registration
      </a>
      <a
        className={`navbar-link registration ${activeLink === "upload" ? "active" : ""}`}
        href="#upload"
        onClick={handleLinkClick}
      >
        Abstract
      </a>
      <a
        className={`navbar-link registration ${activeLink === "upload" ? "active" : ""}`}
        href="/img/abstract-guidelines.pdf" target="blank"
        onClick={handleLinkClick}
      >
        Guideline
      </a>
    </div>
  );
};

export default MobilePopup;
