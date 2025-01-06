import {useEffect, useState, useCallback} from 'react';
import './Footer.css';
import { getCounter} from '../api/counterapi'
import { getToken, verifyToken } from '../api/authapi';
import { logInfo } from '../utils/logger';
import { tokenToString } from 'typescript';

const Footer = () => {  
  const [digits, setDigits] = useState([1,0,0,0])
  

  useEffect(() => {    
    fetchToken("Prashanth");
    // testToken();
    fetchCounter();
  }, []);

  const fetchToken = useCallback(async (username) => {
    try {      
      const response = await getToken({"username": username});      
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
      const response = await getCounter(token);          
      if('counter' in response){
        const counter = response.counter      
        setDigits(counter.toString().split(''));
      }else{
        console.log("counter response", response.error)        
        setDigits([1,0,0,0])      
      }
    } catch (error) {
      console.error('Error fetching counter:', error);
      setDigits(1,0,0,0);      
    }
  }, []);

  // useEffect(()=>{
  //  setDigits(visitorCount.toString().split('')) // Split the number into individual digits 
  //  console.log(visitorCount)
  // }, visitorCount)

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
        <p> &copy; Copyright  JSS Institute Of Speech And Hearing, Mysuru</p>

      </div>
    </footer>
  );
};

export default Footer;