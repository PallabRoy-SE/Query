import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "react-modal";
import "./QHeader.css";
import Logo from './static/logo.png'
import { Avatar, Button, Input } from "@material-ui/core";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ExpandMore, Link } from "@material-ui/icons";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './darkMode/theme';
import { GlobalStyles } from './darkMode/Global';
import { NavLink, useHistory } from 'react-router-dom';
import Axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown'

Modal.setAppElement("#root");

function QHeader(props) {
  const history = useHistory();
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [theme, setTheme] = useState('light');

  const user = props.data.userData;

  let source;

  if (!user) {
    source = "https://img.icons8.com/cotton/2x/user-male.png";
  } else {
    source = `${process.env.PUBLIC_URL}/uploads/images/${user.image}`
  }


  const toggleTheme = () => {
    if (theme === 'light' && isDarkMode === false) {
      setTheme('dark');
      setIsDarkMode(true);
    } else {
      setTheme('light');
      setIsDarkMode(false)
    }
  };
  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  // };

  const handleLogout = () => {
    let isLogout = window.confirm("sure to logout?");
    if (!isLogout) {
      history.push("/");
    } else {
      history.push("/logout");
    }
  }
  const handleQuestion = (e) => {
    e.preventDefault();

    Axios.post('/api/question', { question: props.data.input }).then((res) => {
      if (res.status !== 200) {
        window.alert("Server not responding!");
      } else {
        window.alert("Your Question has been added");
        props.data.setIsModalOpen(false);
        props.data.setInput("");
        props.data.setInputUrl("");
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  // const navStyle = {
  //   visibility: "hidden",
  //   boxShadow: "0px 5px 8px -9px rgba(0, 0, 0, 0.5)"
  // };
  const navStyle1 = {
    visibility: "visible"
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  // }, []);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="qHeader" style={navStyle1}>
        <NavLink to="/">
          <div className="qHeader__logo">
            <img
              src={Logo}
              alt=""
            />
          </div>
        </NavLink>
        <div className="qHeader__icons">
          <NavLink to="/">
            <div className="active qHeader__icon">
              <HomeIcon />
            </div>
          </NavLink>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlinedIcon />
          </div>
        </div>
        <div className="qHeader__input">
          <SearchIcon />
          <input type="text" placeholder="Search Quora" value={props.data.searchText}
            onChange={(e) => {
              history.push('/search')
              props.data.setSearchText(e.target.value)
            }}
            onFocus={() => {
              history.push('/search')
            }}
          />
        </div>
        <div className="qHeader__Rem qHeader__icons">
          <div className="qHeader__avatar">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Avatar
                  className="Avatar"
                  src={source}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!user ?
                  <div>
                    <NavLink to="/login" className="dropdown-item" role="button">Login</NavLink>
                    <NavLink to="/register" className="dropdown-item" role="button">Register</NavLink>
                  </div> :
                  <div>
                    <NavLink to="/profile" className="dropdown-item" role="button">Profile</NavLink>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </div>
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="qHeader__icon">
            <Brightness4Icon className="darkModeButton" onClick={toggleTheme} />
          </div>
          <Button onClick={() => {
            if (!user) {
              const wantLogin = window.confirm('Unauthrised! want to login?')
              if (wantLogin) {
                history.push('/login')
              }
            } else {
              props.data.setIsModalOpen(true)
            }
          }}>Add Question</Button>
          <Modal
            isOpen={props.data.IsmodalOpen}
            onRequestClose={() => props.data.setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 700,
                height: 600,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-300px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar
                className="Avatar"
                src={source}
              />
              <p>{!user ? "none@none.com" : user.email} asked</p>
              <div className="modal__scope">
                <PeopleAltOutlinedIcon />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={props.data.input}
                onChange={(e) => props.data.setInput(e.target.value)}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div className="modal__fieldLink">
                <Link />
                <input
                  value={props.data.inputUrl}
                  onChange={(e) => props.data.setInputUrl(e.target.value)}
                  type="text"
                  placeholder="Optional: inclue a link that gives context"
                ></input>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => props.data.setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleQuestion} className="add">
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default QHeader;
