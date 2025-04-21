import React from "react";
import "./FeeDetailsPopup.css"; // Import CSS for styling

const FeeDetailsPopup = ({ isOpen, onClose, selection }) => {
  if (!isOpen) return null;

  const feeDetails1 = [
    {
      description: "Registration",
      Day1: 500,
      Day2: 250,
      Amount: 750,
    },
    {
      description: "Breakfast + Lunch + Tea",
      Day1: 450,
      Day2: 450,
      Amount: 900,
    },
    {
      description: "Dinner",
      Day1: 400,
      Day2: 0,
      Amount: 400,
    },    
    {
      description: "Local Transport",
      Day1: 200,
      Day2: 0,
      Amount: 200,
    },
    {
      description: "Contingency charges(5%)",
      Day1: 125,
      Day2: 125,
      Amount: 250,
    },    
    {
      description: "Total",
      Day1: 0,
      Day2: 0,
      Amount:2500,
    },
  ];

  const feeDetails2 = [
    {
      description: "Registration",
      Day1: 500,
      Day2: 250,
      Amount: 750,
    },
    {
      description: "Breakfast + Lunch + Tea",
      Day1: 500,
      Day2: 500,
      Amount: 1000,
    },
    {
      description: "Dinner",
      Day1: 450,
      Day2: 0,
      Amount: 450,
    },    
    {
      description: "Local Transport",
      Day1: 300,
      Day2: 0,
      Amount: 300,
    },
    {
      description: "Contingency charges(5%)",
      Day1: 150,
      Day2: 150,
      Amount: 300,
    },    
    {
      description: "Total",
      Day1: 0,
      Day2: 0,
      Amount:2800,
    },
  ];

  const feeDetails3 = [
    {
      description: "Registration",
      Day1: 500,
      Day2: 250,
      Amount: 750,
    },
    {
      description: "Breakfast + Lunch + Tea",
      Day1: 550,
      Day2: 550,
      Amount: 1100,
    },
    {
      description: "Dinner",
      Day1: 500,
      Day2: 0,
      Amount: 500,
    },    
    {
      description: "Local Transport",
      Day1: 450,
      Day2: 0,
      Amount: 450,
    },
    {
      description: "Contingency charges(5%)",
      Day1: 150,
      Day2: 150,
      Amount: 300,
    },    
    {
      description: "Total",
      Day1: 0,
      Day2: 0,
      Amount:3100,
    },
  ];

  console.log(`value ${selection}`)

  const selectedFeeDetails = selection === 1 ? feeDetails1 : selection === 2 ? feeDetails2 : feeDetails3;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 style={{textAlign:"center"}}>Split-up Fee</h2>
        <table className="popup-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Day 1</th>
              <th>Day 2</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedFeeDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.Day1 || ""}</td>
                <td>{item.Day2 || ""}</td>
                <td>
                  {item.specialValue ? (
                    <>
                      {item.Amount} : {item.specialValue}
                    </>
                  ) : (
                    item.Amount
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Additional Note */}
        <p className="popup-note">
          * Registration-compulsory, Others-optional
        </p>
      </div>
    </div>
  );
};

export default FeeDetailsPopup;