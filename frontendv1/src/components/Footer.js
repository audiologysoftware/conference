import {useEffect, useState} from 'react';
import './Footer.css';
import { getCounter} from '../api/counterapi'

const Footer = () => {
  const [visitorCount, setVisitCount] = useState(0);
  const digits = visitorCount.toString().split(''); // Split the number into individual digits

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await getCounter();
        setVisitCount(response.counter);
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    fetchCounter();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <b className='visit'>
          Visitor Count:
          <div className="counter">
            {digits.map((digit, index) => (
              <div key={index} className="digit">{digit}</div>
            ))}
          </div>
        </b>
        <p>&copy; Copyright JSS Institute Of Speech And Hearing, Mysuru</p>

      </div>
    </footer>
  );
};

export default Footer;