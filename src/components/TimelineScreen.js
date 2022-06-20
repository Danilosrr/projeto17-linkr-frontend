import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import TrendingHashtags from "./shared/TrendingHashtags.js";
import PublishPost from "./PublishPost.js";
import PostCard from "./shared/PostCard.js";
import UserContext from "../context/UserContext";

export default function TimelineScreen() {
    const [refreshTimeline, setRefreshTimeline] = useState(false);
    const [posts, setPosts] = useState(["initial"]);
    const { token, setToken } = useContext(UserContext);
    const [refresh, setRefresh] = useState([]);
    const [user, setUser] = useState({});
    let tokenObject = localStorage.getItem("tokenUser");

    const navigate = useNavigate();

    //const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
    const URL = "http://localhost:4000/";
    const localToken = JSON.parse(localStorage.getItem("tokenUser"));

    useEffect(() => {
        if (!token.token) {
            if (!localToken) {
                navigate("/");
            } else {
                setToken({ ...localToken });
            }
        }
        requestGetPosts();
    }, [refreshTimeline]);

    useEffect(() => {
        request();
    }, [refresh]);

    async function request() {
        try {
            const response = await axios.get(`${URL}posts`);
            const config = { headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` } };
            const user = await axios.get(`${URL}userToken`, config);
            setPosts(response.data);
            setUser(user.data);

        } catch (e) {
            setPosts(["error"]);
            console.log(e);
        }
    }

    async function requestGetPosts() {
        try {
            const response = await axios.get(`${URL}posts`);
            setPosts(response.data);
        } catch (e) {
            setPosts(["error"]);
            console.log(e);
        }
    }

    function renderPosts(posts) {
        console.log("aqui");

        if (posts.length === 0) {
            return (
                <div className="message-container">
                    <p className="message">There are no posts yet</p>
                </div>
            );
        }

        if (posts[0] === "error") {
            return (
                <div className="message-container">
                    <p className="message">
                        An error occured while trying to fetch the posts, please refresh the
                        page
                    </p>
                </div>
            );
        }

        return posts.map((post) => {
            const { id } = post;

            return <PostCard key={id} post={post} />;
        });
    }

    function renderPosts(posts) {
        if (posts.length === 0) {
            return (
                <div className="message-container">
                    <p className="message">There are no posts yet</p>
                </div>
            )
        }

        if (posts[0] === "error") {
            return (
                <div className="message-container">
                    <p className="message">An error occured while trying to fetch the posts, please refresh the page</p>
                </div>
            )
        }

        return (
            posts.map(post => {
                const { id } = post;

                return (
                    <PostCard
                        key={id}
                        post={post}
                        user={user.id}
                        refresh={setRefresh}
                    />
                );
            })
        );
    }

    return posts[0] === "initial" ? (
        <Div>
            <HeaderBar />
            <div className="timeline-screen-container">
                <div className="timeline-container">
                    <h1>timeline</h1>
                    <PublishPost
                        refreshTimeline={refreshTimeline}
                        setRefreshTimeline={setRefreshTimeline}
                    />
                    <div className="message-container">
                        <p className="message">Loading . . .</p>
                    </div>
                </div>
                <div className="trending-hashtags-container">
                    <TrendingHashtags />
                </div>
            </div>
        </Div>
    ) : (
        <Div>
            <HeaderBar />
            <div className="timeline-screen-container">
                <div className="timeline-container">
                    <h1>timeline</h1>
                    <PublishPost
                        refreshTimeline={refreshTimeline}
                        setRefreshTimeline={setRefreshTimeline}
                    />
                    {renderPosts(posts)}
                </div>
                <div className="trending-hashtags-container">
                    <TrendingHashtags />
                </div>
            </div>
        </Div>
    );
}

const Div = styled.div`
  

  .timeline-screen-container {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      max-width: 100vw;
  }

  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
    margin: calc(19px + 72px) 0 19px 17px;
  }

  .message-container {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 auto;
    margin-top: 30px;
  }

  .message {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 33px;
    text-align: center;
  }

  .trending-hashtags-container {
      display: none;
  }

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      width: 611px;
      font-size: 43px;
      line-height: 64px;
      margin: calc(78px + 72px) 0 43px;
    }

    .timeline-screen-container {
      max-width: 937px;
    }

    .trending-hashtags-container {
        display: block;
        margin-left: 25px;
        margin-top: 255px;
        
    }
  }
`;
