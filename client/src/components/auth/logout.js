import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

function Logout() {
    const history = useHistory();

    useEffect(() => {
        Axios.get('api/logout').then((res) => {
            if (res.status !== 200) {
                alert("Server not responding!");
                history.push("/");
            }
            history.push("/")
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <h1>Logout....</h1>
        </>
    );
}

export default Logout;
