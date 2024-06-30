import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import "./login.css";
import "../pages/stylesheet/login.css";

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Submitting credentials:", credentials);

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // alert("Login Successful");
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log("User data stored in local storage:", res.data);

      navigate("/");
    }
    catch (err) {
      console.error("Error response:", err.response);
      const errorMessage = err.response?.data?.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: { message: errorMessage } });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <p>Login</p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span className="lError">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;