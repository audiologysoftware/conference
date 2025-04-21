import {useEffect, useState, useCallback} from 'react';
import './Footer.css';
import { getCounter} from '../api/counterapi'
import { getToken, verifyToken } from '../api/authapi';
import { logInfo } from '../utils/logger';

const Footer = () => {  
  const [digits, setDigits] = useState([1,0,0,0])
  

  useEffect(() => {    
    fetchToken();
    // testToken();
    fetchCounter();
  }, []);

  const fetchToken = useCallback(async (username) => {
    try {      
      const response = await getToken({"username": "vishrutha", "password":"vishrutha2"});      
      localStorage.setItem('token', response.access_token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, []);

  const testToken = useCallback(async () =>{
    const token = localStorage.getItem('token');
    logInfo("token:", token)
    const response = await verifyToken(token);
    console.log("Test-token-response:", response);
  })

  const fetchCounter =  useCallback(async () => {
    try {
      const token = localStorage.getItem('token');      
      const counter = await getCounter(token);      
      logInfo("counter-response:", counter);                     
        setDigits(counter.toString().split(''));      
    } catch (error) {
      console.error('Error fetching counter:', error);
      setDigits(1,0,0,0);      
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='best-view-message '>
          <p>Best View in PC</p>
        </div>
        <b className='visit'>
          Visitor Count:
          <div className="counter">
            {digits.map((digit, index) => (
              <div key={index} className="digit">{digit}</div>
            ))}
          </div>
        </b>
        <p> &copy; Copyright 2025, JSS Institute Of Speech And Hearing, Mysuru</p>
      </div>
    </footer>
  );
};

export default Footer;