import React, { useEffect, useState } from "react";
import QHeader from "./QHeader";
// import QHeaderPop from "./QHeaderPop";
import Sidebar from './Sidebar';
import Widget from './Widget';
import Feed from './Feed';
import "./Quora.css";
import { useHistory } from 'react-router-dom';
import Axios from "axios";


function Quora() {
  const history = useHistory();
  const [userData, setuserData] = useState(null);
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState();
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  const checkUserLogin = async () => {
    await Axios.get('/api/user').then((res) => {
      setuserData(res.data)
    }).catch((error) => {
      // eslint-disable-next-line
      if (error == "Error: Request failed with status code 425") {
        setuserData(null)
      } else if (!error.status === 200) {
        window.alert("Server not responding!");
        history.push('/login');
      }
    })
  }

  useEffect(() => {
    checkUserLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <form method="GET" className="quora">
      <QHeader data={{ userData, input, setInput, searchText, setSearchText, IsmodalOpen, setIsModalOpen, inputUrl, setInputUrl }} />
      {/* <QHeaderPop /> */}
      <div className="quora__content">
        <Sidebar />
        <Feed data={{ userData, input }} />
        <Widget />
      </div>
    </form>
  );
}

export default Quora;

// try {
    //   const response = await fetch('/api/user', {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     credentials: "include"
    //   });

    //   const data = await response.json();
    //   setuserData(data);
    //   if (!response.status === 200) {
    //     window.alert("Server not responding!");
    //     history.push('/login');
    //   } else if (response.status === 425) {
    //     // window.alert("Unauthrised! Please login first.");
    //     history.push('/');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   history.push('/');
    // }
