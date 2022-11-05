import React from "react";
// import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";

function Feed(props) {
  const data = props.data;
  return (
    <div className="feed">
      <Post data={data} />
    </div>
  );
}

export default Feed;
