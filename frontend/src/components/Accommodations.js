import React from "react";
import "./Accommodations.css";

const accommodations = [
  {
    name: "Mysore Youth Hostel",
    link: "https://www.yhmysore.in/contactus.html",
    distance: "5km from Venue",
    bookingNumbers: ["0821-2544704", "9481107371"],
  },
  {
    name: "The Viceroy Comforts",
    link: "https://the-viceroy-comforts.mysorehotels.org/en/",
    distance: "100mtr from Venue",
    bookingNumbers: ["8212434555"],
  },
  {
    name: "Capital O Yashaswi",
    link: "https://www.google.com/travel/hotels/s/ZF2WCnG4DqoQekFv9",
    distance: "200mtr from Venue",
    bookingNumbers: ["911246201321"],
  },
  {
    name: "Heritage Inn",
    link: "https://heritagein.in/",
    distance: "100mts from Venue",
    bookingNumbers: ["0821-426665"],
  },
  {
    name: "Sepoy Grande",
    link: "https://shorturl.at/lvzSY",
    distance: "100mtr from Venue",
    bookingNumbers: ["0821-4270001", "9741094444"],
  },
  {
    name: "Hari Govindas",
    link: "https://harigovindas.com/",
    distance: "1.3km from Venue",
    bookingNumbers: ["9606555006"],
  },
  {
    name: "Hotel Mayura Hoysala Mysore",
    link: "https://www.kstdc.co/",
    distance: "3.5km from Venue",
    bookingNumbers: ["080-43344334"],
  },
  {
    name: "Shree Guru Residency",
    link: "https://shreegururesidency.in/",
    distance: "3.5km from Venue",
    bookingNumbers: ["9481458021"],
  },
];

const Accommodations = () => {
  return (
    <section id="accommodations" className="accommodations-section">
      <div className="accommodations-container" data-aos="fade-up">
        <div className="accommodations-header">
          <h2 className="accommodations-title">Accommodations</h2>
          <h4 className="accommodations-contact">Mr.Gunasagar 9777120130</h4>
          <h4 className="accommodations-contact">Mr.Jeevan 9611028215</h4>
        </div>

        <div className="accommodations-row">
          {accommodations.map((hotel, index) => (
            <div className="accommodations-col" key={index}>
              <div className="accommodations-card">
                <div className="accommodations-img">
                  {/* Placeholder for image */}
                </div>
                <h3 className="accommodations-name">
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accommodations-link"
                  >
                    <u>{hotel.name}</u>
                  </a>
                </h3>
                <div className="accommodations-stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>
                <p className="accommodations-info">
                  {hotel.distance} <br />
                  <b>Booking Number</b> <br />
                  {hotel.bookingNumbers.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
