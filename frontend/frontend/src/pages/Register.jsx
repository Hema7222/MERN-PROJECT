import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import "./register.css";
import "../pages/stylesheet/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="rInput"
          />
          <button disabled={loading} className="rButton">
            Register
          </button>
          <div style={{textAlign: 'center', padding: '20px'}}>Already registered?
                <Link className="" to={'/login'}>Login</Link>
          </div>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
