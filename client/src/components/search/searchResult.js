import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import Modal from "react-modal";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import { NavLink } from "react-router-dom";

function SearchResult(props) {
    const history = useHistory();
    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const [posts, setPosts] = useState([]);
    const [question, setQuestion] = useState({
        question: "", userEmail: "", userName: "", userImage: "", answers: [{ userEmail: "", userName: "", userImage: "", anser: "" }]
    });
    const [noResult, setNoResult] = useState(false);

    const addQuestion = props.data.input;
    const query = props.data.searchText;
    const user = props.data.userData;

    const handleAnswer = (e) => {
        e.preventDefault();

        Axios.post('/api/answer', { question, answer }).then((res) => {
            if (res.status !== 200) {
                window.alert("Server not responding!");
            } else {
                window.alert("Your Answer has been added");
                setIsModalOpen(false);
                setAnswer("");
            }
        }).catch((err) => {
            console.log(err);
            window.alert("Server not responding!");
        })

    };

    useEffect(() => {
        Axios.get('/api/search/' + query).then((result) => {
            if (result.data.length === 0) {
                setNoResult(true);
                setPosts(result.data);
            } else {
                setNoResult(false);
                setPosts(result.data);
            }
            console.clear();
        }).catch((err) => {
            // eslint-disable-next-line
            if (err == "Error: Request failed with status code 404") {
                setNoResult(true)
            }
            console.clear();
        })
    }, [query, addQuestion, answer])
    return (
        <>
            {
                !props.data.searchText ?
                    <div>
                        <h1>Search Query to show Results.</h1>
                        <span>Back to <NavLink to="/"><small>Home</small></NavLink></span>
                    </div> :
                    noResult ?
                        <div>
                            <h1>No Search Result Found!</h1>
                            <span>Back to <NavLink to="/"><small>Home</small></NavLink></span>
                        </div> :
                        <div>
                            {posts.map((post, index) => {
                                return (
                                    <div key={index} className="post">
                                        <div className="post__info">
                                            <Avatar
                                                src={`${process.env.PUBLIC_URL}/uploads/images/${post.userImage}`}
                                                className="quoraBox__infoAvatar"
                                            />
                                            <h4>{post.userEmail}</h4>
                                            <small>{new Date(post.createdAt).toLocaleString()}</small>
                                        </div>
                                        <div className="post__body">
                                            <div className="post__question">
                                                <p>{post.question}</p>
                                                <Button onClick={() => {
                                                    if (!user) {
                                                        const wantLogin = window.confirm('Unauthrised! want to login?')
                                                        if (wantLogin) {
                                                            history.push('/login')
                                                        }
                                                    } else {
                                                        setIsModalOpen(true);
                                                        setQuestion(post);
                                                    }
                                                }}
                                                    className="post__btnAnswer">
                                                    Answer</Button>
                                                <Modal isOpen={IsmodalOpen}
                                                    onRequestClose={() => setIsModalOpen(false)}
                                                    shouldCloseOnOverlayClick={false}
                                                    style={{
                                                        overlay: {
                                                            width: 680,
                                                            height: 550,
                                                            backgroundColor: "rgba(0,0,0,0.8)",
                                                            zIndex: "1000",
                                                            top: "50%",
                                                            left: "50%",
                                                            marginTop: "-250px",
                                                            marginLeft: "-350px",
                                                        },
                                                    }}>
                                                    <div className="modal__question">
                                                        <h1>{question.question}</h1>
                                                        <p>
                                                            asked by{" "}
                                                            <span className="name">
                                                                {question.userEmail}
                                                            </span>{" "}
                                                            {""}on{" "}
                                                            <span className="name">
                                                                {new Date(question.createdAt).toLocaleString()}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="modal__answer">
                                                        <textarea
                                                            value={answer}
                                                            onChange={(e) => setAnswer(e.target.value)}
                                                            placeholder="Enter Your Answer"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="modal__button">
                                                        <button className="cancle" onClick={() => setIsModalOpen(false)}>
                                                            Cancel</button>
                                                        <button type="sumbit" onClick={handleAnswer} className="add">
                                                            Add Answer</button>
                                                    </div>
                                                </Modal>
                                            </div>
                                            <hr />
                                            <small style={{ textAlign: "left" }}>{post.answers.length} Answers</small>
                                            <hr />
                                            <div className="post__answer">
                                                <ul style={{ position: "relative", paddingBottom: "5px", listStyleType: "square" }}>
                                                    {post.answers.map((ans, i) => {
                                                        return (
                                                            <li key={i} style={{ textAlign: "left", paddingTop: "1rem", paddingBottom: "1rem" }}
                                                                title={ans.userEmail + " on " + new Date(ans.createdAt).toLocaleString()}
                                                            >
                                                                <div>
                                                                    <div className="post__info">
                                                                        <Avatar
                                                                            src={`${process.env.PUBLIC_URL}/uploads/images/${ans.userImage}`}
                                                                            className="quoraBox__infoAvatar"
                                                                        />
                                                                        <h4>{ans.userEmail}</h4>
                                                                        <small>{new Date(ans.createdAt).toLocaleString()}</small>
                                                                    </div>
                                                                    <div className="post__question" style={{ padding: "1rem" }}>
                                                                        <p>{ans.answer}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            {/* <img src="https://www.talkwalker.com/uploads/2020/measurement/Quora%20pic.png" alt="" /> */}
                                        </div>
                                        <div className="post__footer">
                                            <div className="post__footerAction">
                                                <ArrowUpwardOutlinedIcon />
                                                <ArrowDownwardOutlinedIcon />
                                            </div>

                                            <RepeatOutlinedIcon />
                                            <ChatBubbleOutlineOutlinedIcon />
                                            <div className="post__footerLeft">
                                                <ShareOutlined />
                                                <MoreHorizOutlined />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            }
        </>
    );
}

export default SearchResult;
