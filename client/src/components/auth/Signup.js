import React, { useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { NavLink, useHistory } from 'react-router-dom';
import Axios from "axios";
import logo from "../static/logo.png";

function Register() {
  const history = useHistory();

  const [user, setuser] = useState({
    name: "", email: "", password: "", confirmpassword: "", profileimage: ""
  });

  // Input field data store in state
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
  }


  const handleImage = (event) => {
    if (event.target.files[0] === undefined) {
      window.alert("Please select an image!");
    } else if (checkMimeType(event) && checkImageSize(event)) {
      setuser({ ...user, profileimage: event.target.files[0] });
    }
  }

  const checkMimeType = (event) => {
    let image = event.target.files[0];
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.every(type => image.type !== type)) {
      window.alert(image.type + ' is not a supported format!');
      event.target.value = "";
      return false;
    } else {
      return true;
    }
  }

  const checkImageSize = (event) => {
    let image = event.target.files[0];
    let size = 5000000;
    if (image.size > size) {
      window.alert(image.type + ' size should be less than 5 MB!');
      event.target.value = "";
      return false;
    } else {
      return true;
    }
  }

  // post the data to backend
  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { name, email, password, confirmpassword, profileimage } = user;

    if (name === "" || email === "" || password === "" || confirmpassword === "" || profileimage === "") {
      window.alert("Fill the form properly!")
    } else if (password !== confirmpassword) {
      window.alert("Confirm password not match!")
    } else {
      formData.append('profileimage', profileimage);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      Axios.post('api/register', formData).then((res) => {
        const data = res.data;
        if (!data) {
          window.alert("Server not responding!");
        } else {
          window.alert("Registration Sucessfull.");
          history.push("/login");
        }
      }).catch((err) => {
        // eslint-disable-next-line
        if (err == "Error: Request failed with status code 420") {
          window.alert("Please fill the form properly!");
          history.push("/register");
          // eslint-disable-next-line
        } else if (err == "Error: Request failed with status code 422") {
          window.alert("Email already exist!");
          history.push("/login");
        } else {
          console.log(err)
          history.push("/register");
        }
      })
    }

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
              <h4>Signup</h4>
            </div>
            <form method="POST" className="login__inputFields">
              <div className="login__inputField">
                <input type="text" name="name" id="name"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Name"
                />
              </div>
              <div className="login__inputField">
                <input type="email" name="email" id="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input type="password" name="password" id="password"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                />
              </div>
              <div className="login__inputField">
                <input type="password" name="confirmpassword" id="confirmpassword"
                  value={user.confirmpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="login__inputField">
                <input type="file" onChange={handleImage} />
              </div>
            </form>
            <div className="login__forgButt">
              <span>Already have an Account?<NavLink to="/login" className="loginButton">Login</NavLink></span>
            </div>
            <button onClick={postData}>Register</button>
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

export default Register;
