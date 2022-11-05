import React from "react";
import "./QuoraBox.css";
import "./QHeader.css";
import { Avatar, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

export default function QuorBox(props) {
  const history = useHistory();

  const user = props.data.userData;
  let source;
  if (!user) {
    source = "https://img.icons8.com/cotton/2x/user-male.png";
  } else {
    source = `${process.env.PUBLIC_URL}/uploads/images/${user.image}`
  }
  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
          src={source}
          className="quoraBox__infoAvatar"
        />
        <h5>{user.email}</h5>
      </div>
      <div className="quoraBox__quora">
        <p>What is your question or link?</p>
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
      </div>
    </div>
  );
}
