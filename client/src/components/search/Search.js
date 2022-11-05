import React, { useEffect, useState } from "react";
import QHeader from "../QHeader";
import Sidebar from '../Sidebar';
import Widget from '../Widget';
import "../Quora.css";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import SearchResult from "./searchResult";


function Search() {
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
            <div className="quora__content">
                <Sidebar />
                <div className="feed">
                    <SearchResult data={{ userData, input, searchText }} />
                </div>
                <Widget />
            </div>
        </form>
    );
}

export default Search;