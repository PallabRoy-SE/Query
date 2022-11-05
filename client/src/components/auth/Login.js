import React, { useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { NavLink, useHistory } from 'react-router-dom';
import Axios from "axios";
import logo from "../static/logo.png";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = async (e) => {
    e.preventDefault();

    Axios.post('api/login', {
      email: email,
      password: password,
    }).then((res) => {
      if (res.status === 200) {
        window.alert("Signin Sucessfully.");
        history.push("/");
      } else {
        window.alert("Server not responding!");
      }
    }).catch((err) => {
        // eslint-disable-next-line
      if (err == "Error: Request failed with status code 420") {
        window.alert("Please fill the form properly!");
        // eslint-disable-next-line
      } else if (err == "Error: Request failed with status code 421") {
        window.alert("Invalid Credential!. Please Check your Email and Password");
      } else {
        console.log(err)
      }
    })
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src={logo}
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            By
          </p>
          <h3>Pallab Roy</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <form method="POST" className="login__inputFields">
              <div className="login__inputField">
                <input name="email" id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input name="password" id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </form>
            <div className="login__forgButt">
              <span>Don't have Account?<NavLink to="/register" className="loginButton">Register</NavLink></span>
            </div>
            <button onClick={postData}>Login</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
