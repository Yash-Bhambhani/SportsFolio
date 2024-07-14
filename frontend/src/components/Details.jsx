import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import images from "../../public/images";
const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const userId = localStorage.getItem("username");
  const getDetails = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/landingpage/details",
        {
          data: { id: location.state.id },
        }
      );
      setData(res.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const pastTeams = async () => {
    const res = await axios.post("http://localhost:8000/pastTeams", {
      data: { id: location.state.id },
      userId,
    });
    if (res.data.status) {
      navigate("/join/done", { state: { id: userId } });
    } else {
      alert("You haven't registered any team YET!!!!!");
    }
  };
  // Function to get date, month, and year from timestamp
  const getDateMonthAndYear = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const closeDate = getDateMonthAndYear(data.sportsthon_close);
  const openDate = getDateMonthAndYear(data.sportsthon_open);

  const getTimeRemaining = (startTime) => {
    // Get the current time
    const currentTime = new Date();

    // Convert the start time to a Date object
    const eventStartTime = new Date(startTime);

    // Calculate the difference between current time and start time of the event
    let timeDifference = eventStartTime.getTime() - currentTime.getTime();

    // Convert time difference to positive value (in case event has already started)
    timeDifference = Math.abs(timeDifference);

    // Calculate days, hours, and minutes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { days, hours, minutes };
  };

  const openTimeRemaining = getTimeRemaining(data.sportsthon_open);

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div
      className="details"
      style={{
        flex: "flex-col",
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="sportimage" style={{ margin: "10px" }}>
        <img src={images[data.sport]} alt="image" />
      </div>
      <div
        className="happening"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow:
            "rgba(3, 0, 92, 0.12) 0px 1px 3px, rgba(3, 0, 92, 0.07) 0px 4px 11px",
          width: "100vh",
          marginLeft: "25%",
          marginBottom: "5px",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h2>Runs From</h2>
        <h3>
          {closeDate} To {openDate}
        </h3>
        <h2>Happening in:</h2>
        <h3>{data.venue}</h3>
      </div>
      <div
        className="startin"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow:
            "rgba(3, 0, 92, 0.12) 0px 1px 3px, rgba(3, 0, 92, 0.07) 0px 4px 11px",
          width: "100vh",
          marginLeft: "25%",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h2>Event Starts in:</h2>
        <h3
          style={{ color: "red" }}
        >{`${openTimeRemaining.days}d:${openTimeRemaining.hours}h:${openTimeRemaining.minutes}m`}</h3>
      </div>
      <button
        style={{
          backgroundColor: "blue",
          marginLeft: "320px",
          width: "100vh",
          borderRadius: "4px",
          padding: "12px",
          marginTop: "10px",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(`/${location.state.id}/join/team`, {
            state: { id: location.state.id },
          })
        }
      >
        Join Team
      </button>
      <button
        style={{
          backgroundColor: "blue",
          marginLeft: "320px",
          width: "100vh",
          borderRadius: "4px",
          padding: "12px",
          marginTop: "10px",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(`/${location.state.id}/join`, {
            state: { id: location.state.id },
          })
        }
      >
        Create Team
      </button>
      <button
        style={{
          backgroundColor: "red",
          marginLeft: "320px",
          width: "100vh",
          borderRadius: "4px",
          padding: "12px",
          marginTop: "10px",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={pastTeams}
      >
        Past Created Teams
      </button>
      <div className="news" style={{ marginTop: "30px" }}>
        <h1>News From Admin:</h1>
      </div>
    </div>
  );
};
export default Details;
