import React from "react";
import "./Accommodations.css";

const accommodations = [
  {
    name: "Mysore Youth Hostel",
    link: "https://www.yhmysore.in/contactus.html",
    distance: "5km from Venue",
    bookingNumbers: ["0821-2544704", "9481107371"],
  imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AxS1T75OYVHsC6t7x5igFtRAa0uxy_DDWQ&s"
  },
  {
    name: "The Viceroy Comforts",
    link: "https://the-viceroy-comforts.mysorehotels.org/en/",
    distance: "100mtr from Venue",
    bookingNumbers: ["8212434555"],
    imgURL:"https://lh5.googleusercontent.com/p/AF1QipMFTFmFA2nF4RT5corzSnWPZEEUUdGfg1NntVad=w324-h312-n-k-no"
  },
  {
    name: "Capital O Yashaswi",
    link: "https://www.google.com/travel/hotels/s/ZF2WCnG4DqoQekFv9",
    distance: "200mtr from Venue",
    bookingNumbers: ["911246201321"],
    imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeS3RqlS--vdKyxxOacuuXkrAd5TieftAIsg&s"
  },
  {
    name: "Heritage Inn",
    link: "https://heritagein.in/",
    distance: "100mts from Venue",
    bookingNumbers: ["0821-426665"],
    imgURL:"https://lh3.googleusercontent.com/p/AF1QipNzltu_c-SfBq4rrg8FlhhzdgCYFCMq4b507zFf=s1360-w1360-h1020"
  },
  {
    name: "Sepoy Grande",
    link: "https://shorturl.at/lvzSY",
    distance: "100mtr from Venue",
    bookingNumbers: ["0821-4270001", "9741094444"],
    imgURL:"https://lh3.googleusercontent.com/p/AF1QipNikid26jcVD9kk3Yfu4nzd4uOb32UcgpHTa_4S=s1360-w1360-h1020"
  },
  {
    name: "Hari Govindas",
    link: "https://harigovindas.com/",
    distance: "1.3km from Venue",
    bookingNumbers: ["9606555006"],
    imgURL:"https://lh3.googleusercontent.com/p/AF1QipNhX_SS36qjnbaubDnuVpOb6sNRPs2z_TogtvG8=s1360-w1360-h1020"
  },
  {
    name: "Hotel Mayura Hoysala Mysore",
    link: "https://www.kstdc.co/",
    distance: "3.5km from Venue",
    bookingNumbers: ["080-43344334"],
    imgURL:"https://lh5.googleusercontent.com/p/AF1QipOMJ3ncJJ9Xt_MzihmjlzvFJAhox6tFCaMWhtLv=w243-h174-n-k-no-nu"
  },
  {
    name: "Shree Guru Residency",
    link: "https://shreegururesidency.in/",
    distance: "3.5km from Venue",
    bookingNumbers: ["9481458021"],
    imgURL:"https://lh5.googleusercontent.com/p/AF1QipOA4POIsoYJk63YoLX3u3naDGRzXNKWOUVPw2n8=w255-h156-n-k-no"
  },
];

const Accommodations = () => {
  return (
    <section id="accommodations" className="accommodations-section">
      <div className="accommodations-container" data-aos="fade-up">
        <div className="accommodations-header">
          <h2 className="accommodations-title">Accommodation</h2>
          <h4 className="accommodations-contact">Mr.Gunasagar 9777120130</h4>
          <h4 className="accommodations-contact">Mr.Jeevan 9611028215</h4>
        </div>

        <div className="accommodations-row">
          {accommodations.map((hotel, index) => (
            <div className="accommodations-col" key={index}>
              <div className="accommodations-card">
                <div className="accommodations-img">
           <img src={hotel.imgURL} alt={hotel.name} />
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
