import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import List from "./pages/List";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import ReservationSuccess from "./pages/ReservationSuccess";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hotels/:id/reservation-success" element={<ReservationSuccess />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
