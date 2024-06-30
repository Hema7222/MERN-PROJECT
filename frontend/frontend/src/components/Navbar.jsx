import { useContext, useEffect, useState } from "react";
import "../components/stylesheet/navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { username } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // console.log("User object:", user.username);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Set user state to null
    setUser(null);
  };
  
  return (
    <nav>
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Reservation App</span>
        </Link>
        {/* <p>User: {user ? user.username : "Not logged in"}</p> */}
        {user ? (
          <div className="navItems">
            <span className="username">{user.username}</span>
            {/* Add other user-related options here */}
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
