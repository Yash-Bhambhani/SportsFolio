import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [sport, setsport] = useState("");
  const [email, SetEmail] = useState("");
  const [participants, setParticipants] = useState(0);
  const [tagline, setTagline] = useState("");
  const [venue, setVenue] = useState("");
  const [application_open, setApplication_open] = useState("");
  const [application_close, setApplication_close] = useState("");
  const [sportsthon_open, setSportsthon_open] = useState("");
  const [sportsthon_close, setSportsthon_close] = useState("");
  const userId = localStorage.getItem("username");
  const navigate = useNavigate();

  async function submit(e) {
    console.log("hello");
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
      await axios
          .post(
              "http://localhost:8000/landingpage/registration",
              {
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
              },
              console.log(typeof participants)
          )
          .then((res) => {
            if (res.data.message === "exist") {
              alert("Event registered Successfully");
              navigate("/landingpage/Host");
            }
          });
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <div className="registration">
        <h2>Host an Event</h2>
        <form action="POST" className="form_registration">
          <div className="label_registration">
            <label>Name</label>
            <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name"
            />
          </div>
          <div className="label_registration">
            <label htmlFor="Sport">Sports </label>
            <input
                list="SportList"
                id="Sport"
                name="Sport"
                type="text"
                onChange={(e) => {
                  setsport(e.target.value);
                }}
            />
            <datalist id="SportList">
              <option value="Cricket" />
              <option value="Football" />
              <option value="Basketball" />
              <option value="Badminton" />
              <option value="Table_Tennis"></option>
              <option value="Chess"></option>
              <option value="Athletics"></option>
              <option value="Archery"></option>
              <option value="Volleyball"></option>
            </datalist>
          </div>
          <div className="label_registration">
            <label>Email</label>
            <input
                type="email"
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                placeholder="Enter Email"
            />
          </div>
          <div className="label_registration">
            <label>Tagline</label>
            <input
                type="text"
                onChange={(e) => {
                  setTagline(e.target.value);
                }}
                placeholder="e.g. Asia's biggest University sports event"
            />
          </div>
          <div className="label_registration">
            <label>Approx Participants</label>
            <input
                type="number"
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
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
                placeholder="e.g. Ranjit Ground "
            />
          </div>
          <div className="label_registration">
            <label>Application Open</label>
            <input
                type="date"
                onChange={(e) => {
                  setApplication_open(e.target.value);
                }}
            />
          </div>
          <div className="label_registration">
            <label>Application Close</label>
            <input
                type="date"
                onChange={(e) => {
                  setApplication_close(e.target.value);
                }}
            />
          </div>
          <div className="label_registration">
            <label>sportsthon begins</label>
            <input
                type="date"
                onChange={(e) => {
                  setSportsthon_open(e.target.value);
                }}
            />
          </div>
          <div className="label_registration">
            <label>sportsthon close</label>
            <input
                type="date"
                onChange={(e) => {
                  setSportsthon_close(e.target.value);
                }}
            />
          </div>
          <div className="label_registration">
            <input type="submit" onClick={submit} className="submit" />
          </div>
        </form>
      </div>
  );
}

export default Registration;
