import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Team = () => {
  const [team, setTeam] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/details/join/team", {
        data: { id: location.state.id },
        team,
        name,
        phone,
      });
      if (res.data.status == true) {
        navigate("/landingpage/HostCard");
      } else {
        alert("Team Name isn't correct");
      }
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
          placeholder="Enter team name"
          onChange={(e) => setTeam(e.target.value)}
        />
        <h2>Player Name:</h2>
        <input
          type="text"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Phone No:</h2>
        <input
          type="number"
          placeholder="Enter phone NO."
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
          Join Team
        </button>
      </div>
    </div>
  );
};
export default Team;
