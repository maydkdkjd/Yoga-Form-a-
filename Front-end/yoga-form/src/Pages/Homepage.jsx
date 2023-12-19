import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../dash.css';

const Homepage = () => {
  const location = useLocation();
  const email = location.state?.email || 'Guest';
  const apiUrl = `https://yoga-8bvo.onrender.com/userBalance?email=${encodeURIComponent(email)}`;
  const [userData, setUserData] = useState("0");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortController.signal,
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user[0]?.due || "0");
          console.log(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch operation aborted');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [apiUrl]);

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://yoga-8bvo.onrender.com/userBalance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        console.log("Payment successful!");
      } else {
        console.error("Payment failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Your Dashboard</h1>
      </div>

      <div className="row">
        <div className="column">
          <div className="widget">
            <h2>Current Due</h2>
          </div>
        </div>

        <div className="column">
          <div className="widget">
            <h2>{userData} INR</h2>
          </div>
        </div>
        <button onClick={handlePayment} style={{ backgroundColor: 'blue', color: 'white' }}>Make Payment</button>
      </div>
    </div>
  );
};

export default Homepage;