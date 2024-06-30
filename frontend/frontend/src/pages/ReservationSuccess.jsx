

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
// import "./reservationSuccess.css";
import "../pages/stylesheet/reservationSuccess.css";
import Navbar from "../components/Navbar";


const ReservationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, hotelName, checkIn, checkOut } = location.state || {};
  const { username } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (!location.state) {
      // If location.state is null, navigate to the home page or another fallback page
      navigate('/');
    }
  }, [location.state, navigate]);

  return (
    <div>
      <Navbar />
    <div className="reservation">
      <h2>My Reservations</h2>
      
      <div className="reservationDetails">
        <p><span className="name">Hotel Name :</span> Hotel Pioneer Grand Palace</p>
        <p><span className="name">Room :</span> {hotelName}</p>
        <p><span className="name">Room Number :</span> 152, 153</p>
        <p><span className="name">Check-in Date :</span> {checkIn ? new Date(checkIn).toLocaleDateString() : "N/A"}</p>
        <p><span className="name">Check-out Date :</span> {checkOut ? new Date(checkOut).toLocaleDateString() : "N/A"}</p>
        <p><span className="name">Status :</span> <span className="confirmed">Confirmed</span></p>
      </div>
    </div>
    </div>
  );
};

export default ReservationSuccess;
