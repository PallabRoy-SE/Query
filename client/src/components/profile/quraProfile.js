import React, { useEffect, useState } from "react";
import QHeader from "../QHeader";
import Widget from "../Widget";
import Profile from "./Profile";
import "../Feed.css";
import QuorBox from "../QuorBox";
import { useHistory } from "react-router";
import Axios from "axios";
function QuraProfile() {
    const history = useHistory();
    const [userData, setuserData] = useState({ email: "" });
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
                window.alert("Unauthrised! Please login first.");
                history.push('/login');
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
                <div className="feed">
                    <QuorBox data={{ userData, input, setInput, IsmodalOpen, setIsModalOpen, inputUrl, setInputUrl }} />
                    <Profile data={{ userData, input }} />
                </div>
                <Widget />
            </div>
        </form>
    );
}

export default QuraProfile;
