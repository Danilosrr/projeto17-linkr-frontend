import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import PostCard from "./shared/PostCard.js";
import TrendingHashtags from "./shared/TrendingHashtags.js";
import UserContext from "../context/UserContext";

export default function TimelineByHashtagScreen() {
  const { hashtag } = useParams();
  const whitespace = " ";

  const localToken = JSON.parse(localStorage.getItem("tokenUser"));

  // eslint-disable-next-line
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(["initial"]);
  const { token, setToken } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token.token) {
      if (!localToken) {
        navigate("/");
        console.log("teste");
      } else {
        setToken({ ...localToken });
      }
    } else {
      requestGetPostsByHashtag();
    }
  }, [refreshScreen, token, hashtag]);

  async function requestGetPostsByHashtag() {
    try {
      const config = { headers: { Authorization: `Bearer ${token.token}` } };
      const response = await axios.get(
        `https://projeto17-linkr-cdio.herokuapp.com/posts/${hashtag}`,
        config
      );
      setFilteredPosts(response.data);
    } catch (e) {
      setFilteredPosts(["error"]);
      console.log(e);
    }
  }

  function renderFilteredPosts(filteredPosts) {
    if (filteredPosts.length === 0) {
      return (
        <div className="message-container">
          <p className="message">There are no posts with #{hashtag} yet</p>
        </div>
      );
    }

    if (filteredPosts[0] === "error") {
      return (
        <div className="message-container">
          <p className="message">
            An error occured while trying to fetch the posts, please refresh the
            page
          </p>
        </div>
      );
    }

    return filteredPosts.map((post) => {
      const { id } = post;

      return <PostCard key={id} post={post} />;
    });
  }

  return filteredPosts[0] === "initial" ? (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <h1>{whitespace}</h1>
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
          <h1>#{hashtag}</h1>
          {renderFilteredPosts(filteredPosts)}
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
