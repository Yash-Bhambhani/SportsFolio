import React, { useState } from "react";
import { CiUser, CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheContext } from "../context";
const Login = () => {
  const history = useNavigate();
  const { username, setUsername, password, setPassword } = useTheContext();
  console.log(username);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/login", {
          username,
          password,
        })
        .then((res) => {
          console.log(res.data.check[0]._id);
          if (res.data.message == "Login Successfully") {
            const storage = localStorage.setItem(
              "username",
              res.data.check[0]._id
            );

            setPassword(password);
            setUsername(username);
            localStorage.setItem("login", username);
            history("/landingpage", { state: { id: username } });
          } else {
            alert("Wrong Username or Password");
          }
        })
        .catch((e) => {
          alert("Enter Correct Credentials");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="login-form" action="POST" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="username">
        <CiUser className="adjust" />
        Username
      </label>
      <input
        type="username"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">
        <MdOutlinePassword className="adjust" />
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="submit">
        <button type="submit">Login</button>
        <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
          SignUp
        </Link>
      </div>
    </form>
  );
};

export default Login;
