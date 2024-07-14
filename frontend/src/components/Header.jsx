import { icon } from "../utils/constants";
import { user } from "../utils/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import img from "../Assets/Logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="dashboard">
        <button className="dash">
          <img className="head" src={icon} alt="icon" />
        </button>
      </div>
      <div className="app-name">
        <img className="sportsfolio-logo" src={img} alt="" />
      </div>
      <div>
        <ul className="details-header">
          <li>
            <button className="header-btn" style={{ fontSize: "20px" }}>
              About Me
            </button>
          </li>
          <li>
            <button className="orange" style={{ fontSize: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
            </button>
          </li>
          <li>
            <button className="user">
              <Link to="/signup">
                <img className="head" src={user} alt="user" />
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
