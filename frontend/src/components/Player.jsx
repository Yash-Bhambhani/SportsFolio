import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Player = () => {
  const [team, setTeam] = useState();
  const [size, setSize] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const userId = localStorage.getItem("username");
  const location = useLocation();
  const navigate = useNavigate();
  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/details/join", {
        userId,
        data: { id: location.state.id },
        name,
        team,
        size,
        phone,
      });
      navigate("/landingpage/HostCard", { state: { id: userId } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage:
          'url("https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
      }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Team Name:</h2>
        <input
          type="text"
          placeholder="TeamName"
          onChange={(e) => setTeam(e.target.value)}
        />
        <h2>Your Name:</h2>
        <input
          type="text"
          placeholder="TeamName"
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Squad Size:</h2>
        <input
          type="number"
          placeholder="TeamSize"
          onChange={(e) => setSize(e.target.value)}
        />
        <h2>Phone No:</h2>
        <input
          type="number"
          placeholder="Phone No."
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={submit}
          style={{
            marginTop: "30px",
            backgroundColor: "blue",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
            border: "none",
            padding: "5px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Player;
