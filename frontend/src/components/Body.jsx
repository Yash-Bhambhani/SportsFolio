import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Location } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Body() {
  const navigate = useNavigate();
  const Location = useLocation();
  const id = localStorage.getItem("login");
  console.log(id);
  return (
    <section className="body">
      <div className="box1">
        <div className="typewriter">
          <p className="text">
            Welcome <label className="text-color">{id}</label> to our website
          </p>
        </div>
        <div className="container">
          <div className="hero">
            <h1>Welcome to Sportsfolio!</h1>
            <p>
              Host and join thrilling sports tournaments, manage your teams
              effectively, and connect with other sports enthusiasts.
            </p>
            <div className="functional">
              <button className="btn btn-primary">
                <Link
                  to="/landingpage/registration"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Create New Tournament
                </Link>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/landingpage/HostCard")}
              >
                Join a Tournament
              </button>
              <button className="btn btn-primary">
                <Link
                  to="/landingpage/host"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Hosted Tournament
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="box2">
          <div className="features">
            <h2>Why Choose Sportsfolio?</h2>
            <ul>
              <li>
                <i className="fas fa-trophy"></i>
                <h3>Easy Tournament Creation</h3>
                <p>
                  Set up your tournaments in minutes with customizable options
                  and management tools.
                </p>
              </li>
              <li>
                <i className="fas fa-users"></i>
                <h3>Seamless Team Management</h3>
                <p>
                  Create and manage teams, invite members, and track progress
                  through a user-friendly interface.
                </p>
              </li>
              <li>
                <i className="fas fa-comment"></i>
                <h3>Engaging Community</h3>
                <p>
                  Connect with other sports enthusiasts, discover new
                  tournaments, and build your network.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
