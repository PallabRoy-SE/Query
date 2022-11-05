import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./QHeaderPop.css";
import {  Button } from "@material-ui/core";

Modal.setAppElement("#root");

function QHeaderPop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    display: "flex",
    animation: "fadeIn .15s"
  };
  const navStyle1 = {
    display: "none"
  };

  return (
    <div className="qHeaderPop" style={scrollPosition > 100 ? navStyle : navStyle1}>
      <div className="post__question">
      <p>What is Quora?</p>
      </div>
      <div className="qHeader__input">
        <input type="text" placeholder="write your answer.." />
      </div>
      <div className="qHeader__Rem">
        <Button>Answer</Button>
      </div>
    </div>
  );
}

export default QHeaderPop;
