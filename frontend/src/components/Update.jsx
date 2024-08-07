import React, { useState, useEffect } from "react";
import "./Registration.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState(0);
  const [tageline, setTagline] = useState("");
  const [venue, setVenue] = useState("");
  const [application_open, setApplication_open] = useState("");
  const [application_close, setApplication_close] = useState("");
  const [sportsthon_open, setSportsthon_open] = useState("");
  const [sportsthon_close, setSportsthon_close] = useState("");

  const userId = localStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.id;

  useEffect(() => {
    if (data) {
      setName(data._id);
      setSport(data.sport);
      setEmail(data.email);
      setParticipants(data.participants);
      setTagline(data.tagline);
      setVenue(data.venue);
      setApplication_open(data.application_open?.substring(0, 10) || "");
      setApplication_close(data.application_close?.substring(0, 10) || "");
      setSportsthon_open(data.sportsthon_open?.substring(0, 10) || "");
      setSportsthon_close(data.sportsthon_close?.substring(0, 10) || "");
    }
  }, [data]);

  async function submit(e) {
    e.preventDefault();
    if (
        new Date(application_open) < new Date() ||
        new Date(application_close) < new Date() ||
        new Date(sportsthon_open) < new Date() ||
        new Date(sportsthon_close) < new Date()
    ) {
      alert("Dates prior to today are not allowed.");
      return;
    }
    try {
      const res = await axios.put("http://localhost:8000/landingpage/registration", {
        id: data._id,
        userId,
        name,
        sport,
        email,
        participants,
        tagline,
        venue,
        application_open,
        application_close,
        sportsthon_open,
        sportsthon_close,
      });
      console.log(data)
      if (res.data.message === "exist") {
        alert("Event Updated Successfully!!!!!");
        navigate("/landingpage/Host");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="registration">
        <h2>Host an Event</h2>
        <form onSubmit={submit} className="form_registration">
          <div className="label_registration">
            <label htmlFor="Sport">Sports </label>
            <input
                list="SportList"
                id="Sport"
                value={sport}
                name="Sport"
                type="text"
                onChange={(e) => setSport(e.target.value)}
            />
            <datalist id="SportList">
              <option value="Cricket" />
              <option value="Football" />
              <option value="Basketball" />
              <option value="Badminton" />
              <option value="Table_Tennis" />
              <option value="Chess" />
              <option value="Athletics" />
              <option value="Archery" />
              <option value="Volleyball" />
            </datalist>
          </div>
          <div className="label_registration">
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
          </div>
          <div className="label_registration">
            <label>Tagline</label>
            <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Asia's biggest University sports event"
            />
          </div>
          <div className="label_registration">
            <label>Approx Participants</label>
            <input
                type="number"
                value={participants}
                onChange={(e) => {
                  setParticipants(parseInt(e.target.value, 10));
                }}
                placeholder="e.g. 780"
            />
          </div>
          <div className="label_registration">
            <label>Venue</label>
            <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Ranjit Ground"
            />
          </div>
          <div className="label_registration">
            <label>Application Open</label>
            <input
                type="date"
                value={application_open}
                onChange={(e) => setApplication_open(e.target.value)}
            />
          </div>
          <div className="label_registration">
            <label>Application Close</label>
            <input
                type="date"
                value={application_close}
                onChange={(e) => setApplication_close(e.target.value)}
            />
          </div>
          <div className="label_registration">
            <label>Sportsthon Begins</label>
            <input
                type="date"
                value={sportsthon_open}
                onChange={(e) => setSportsthon_open(e.target.value)}
            />
          </div>
          <div className="label_registration">
            <label>Sportsthon Closes</label>
            <input
                type="date"
                value={sportsthon_close}
                onChange={(e) => setSportsthon_close(e.target.value)}
            />
          </div>
          <div className="label_registration">
            <input type="submit" className="submit" />
          </div>
        </form>
      </div>
  );
}

export default Update;
