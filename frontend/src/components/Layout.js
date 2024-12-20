import React from "react";
import './Layout.css';

const Layout = ({ navbar, hero, children, footer }) => {
  return (
    <div className="layout">
      {/* Header Section */}
      <header className="layout-header">
        {navbar}
      </header>

      {/* Body Section */}
      <main className="layout-body">
        {/* Hero Section */}
        <section className="hero-section">
          {hero}
        </section>

        {/* Main Content Section */}
        <section className="content-section">
          {children}
        </section>
      </main>

      {/* Footer Section */}
      <footer className="layout-footer">
        {footer}
      </footer>
    </div>
  );
};

export default Layout;
