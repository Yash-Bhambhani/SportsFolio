import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Captain = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [cap, setCap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/details/join/team/o",
          {
            data: { id: location.state.id },
          }
        );
        setData(res.data.data);
        setCap(res.data.cap);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location.state.id]);

  return (
    <div style={{ margin: "10px" }}>
      <h2 className="klopp">You have created your team for this tournament </h2>
      <p className="klopp">Team Members who have joined till now</p>
      <div className="player-list">
        <div
          className="player-item"
          style={{
            display: "flex",
            gap: "20px",
            backgroundColor: "#f0f0f0",
            marginBottom: "5px",
          }}
        >
          <img
            style={{ height: "70px" }}
            src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_1280.png"
            alt=""
          />
          <p style={{ color: "red" }}>Player Name: {cap.playerName} </p>
          <p style={{ color: "blue" }}>Phone No:{cap.phoneNo}</p>
          <img
            style={{ height: "35px", marginTop: "15px" }}
            src="https://cdn.pixabay.com/photo/2016/04/22/14/31/copyright-1345865_1280.png"
            alt=""
          />
        </div>
        {data.map((player, index) => (
          <div
            key={index}
            className="player-item"
            style={{
              display: "flex",
              gap: "20px",
              backgroundColor: "#f0f0f0",
              marginBottom: "5px",
            }}
          >
            <img
              style={{ height: "70px" }}
              src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_1280.png"
              alt=""
            />
            <p style={{ color: "red" }}>Player Name: {player.playerName} </p>
            <p style={{ color: "blue" }}>Phone No:{player.phoneNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Captain;
