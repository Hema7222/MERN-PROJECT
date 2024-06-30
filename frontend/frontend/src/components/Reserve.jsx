import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
// import "./reserve.css";
import "../components/stylesheet/reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { username } = useContext(AuthContext); // Access username from AuthContext

  const [user, setUser] = useState(null);

  useEffect(() => {
    reFetch(); // Ensure data is fetched on component mount
  }, [hotelId]);

  useEffect(() => {
    console.log("Fetched data:", data);
  }, [data]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    let date = new Date(start.getTime());

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log("All dates in range:", alldates);

  const isAvailable = (roomNumber) => {
    console.log(`Checking unavailable dates for room ${roomNumber.number}:`, roomNumber.unavailableDates);

    const isFound = roomNumber.unavailableDates.some((date) => {
      const timestamp = new Date(date).getTime();
      console.log(`Checking date ${timestamp} against all dates:`, alldates.includes(timestamp));
      return alldates.includes(timestamp);
    });

    console.log(`Checking availability for room ${roomNumber.number}:`, !isFound);
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    console.log("Selected rooms:", checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      setOpen(false);
      reFetch(); // Refresh room data after reservation
      // alert(`${user.username} has reserved this hotel.`);
     
      console.log("Rooms have been reserved!");
    } catch (err) {
      console.error("Error updating room availability:", err);
    }
  };
  const navigate = useNavigate();

  const handleSeeReservation = () => {
    navigate(`/hotels/${hotelId}/reservation-success`, {
      state: {
        id: data[0].id,
        hotelName: data[0]?.title, // Assuming hotelName is a property in the data
        checkIn: dates[0].startDate,
        checkOut: dates[0].endDate
      }
    });
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        <button onClick={handleSeeReservation} className="rButton">see reservation</button>
        {/* {user && <p>{user.username} has reserved this hotel.</p>} */}
      </div>
    </div>
  );
};

export default Reserve;
