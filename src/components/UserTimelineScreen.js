import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import PostCard from "./shared/PostCard.js";
import UserContext from "../context/UserContext";
import SearchBar from "./shared/SearchBar";
import TrendingHashtags from "./shared/TrendingHashtags";

export default function UserTimelineScreen() {
  const { id } = useParams();

  // eslint-disable-next-line
  const [refreshTimeline, setRefreshTimeline] = useState(false);
  const [posts, setPosts] = useState(["initial"]);
  const { token, setToken } = useContext(UserContext);
  const [refresh, setRefresh] = useState([]);
  const [user, setUser] = useState({});
  const [pageUser, setPageUser] = useState({});
  const [following, setFollowing] = useState(false);
  const [refreshFollow, setRefreshFollow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  let tokenObject = localStorage.getItem("tokenUser");

  const navigate = useNavigate();

  const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
  const localToken = JSON.parse(localStorage.getItem("tokenUser"));

  useEffect(() => {
    if (!token.token) {
      if (!localToken) {
        navigate("/");
      } else {
        setToken({ ...localToken });
      }
    }
    requestGetUserPosts();
  }, [refreshTimeline]);

  useEffect(() => {
    request();
    // eslint-disable-next-line
  }, [refresh, id]);

  useEffect(() => {
    checkFollowing();
  }, [refreshFollow]);

  async function request() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` },
      };
      const response = await axios.get(`${URL}user/${id}`, config);
      const user = await axios.get(`${URL}userToken`, config);
      const pageUserResult = await axios.get(`${URL}users/${id}`, config);
      setPageUser(pageUserResult.data);
      setPosts(response.data);
      setUser(user.data);
    } catch (e) {
      setPosts(["error"]);
      console.log(e);
    }
  }

  async function requestGetUserPosts() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` },
      };
      const response = await axios.get(`${URL}user/${id}`, config);
      setPosts(response.data);
    } catch (e) {
      setPosts(["error"]);
      console.log(e);
    }
  }

  async function checkFollowing() {
    try {
      const response = await axios.get(`${URL}follow/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(tokenObject).token}`,
        },
      });

      if (!response.data) {
        setFollowing(false);
      } else {
        setFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderPosts(posts) {
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

      return (
        <PostCard key={id} post={post} user={user.id} refresh={setRefresh} />
      );
    });
  }

  function unFollow() {
    setDisabled(true);
    const promise = axios.delete(`${URL}follow/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(tokenObject).token}`,
      },
    });
    promise.then((response) => {
      setDisabled(false);
      setRefreshFollow(!refreshFollow);
    });
    promise.catch((error) => {
      alert("It was not possible to execute this operation!");
      setDisabled(false);
    });
  }

  function follow() {
    setDisabled(true);
    const promise = axios.post(
      `${URL}follow/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(tokenObject).token}`,
        },
      }
    );
    promise.then((response) => {
      setRefreshFollow(!refreshFollow);
      setDisabled(false);
    });
    promise.catch((error) => {
      alert("It was not possible to execute this operation!");
      setDisabled(false);
    });
  }

  return posts[0] === "initial" ? (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <h1>{pageUser ? pageUser.username : "User"} posts</h1>
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
      <div className="search-container-mobile">
        <SearchBar />
      </div>
      <div className="page-title">
        <div className="user-page">
          <img src={pageUser.picture} alt="user" />
          <h1>{pageUser ? pageUser.username : "User"} posts</h1>
        </div>
        {following ? (
          <button
            className={`following ${parseInt(id) === user.id ? "hide" : ""}`}
            onClick={() => {
              unFollow();
            }}
            disabled={disabled}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={`not-following ${
              parseInt(id) === user.id ? "hide" : ""
            }`}
            onClick={() => {
              follow();
            }}
            disabled={disabled}
          >
            Follow
          </button>
        )}
      </div>
      <div className="timeline-screen-container">
        <div className="timeline-container">{renderPosts(posts)}</div>
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

  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-page {
    display: flex;
    align-items: center;
  }

  .search-container-mobile {
    margin-top: 82px;
    display: flex;
    justify-content: center;
  }

  .trending-hashtags-container {
    display: none;
  }

  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 19px 0 19px 18px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
      object-fit: cover;
    }

    .not-following {
      font-family: "Lato";
      width: 100px;
      height: 31px;
      background-color: #1877f2;
      color: #fff;
      font-size: 13px;
      line-height: 16px;
      border: none;
      border-radius: 5px;
      margin-left: 18px;
      font-weight: 700;

      &:disabled {
        opacity: 0.6;
      }
    }

    .following {
      font-family: "Lato";
      width: 100px;
      height: 31px;
      background-color: #fff;
      color: #1877f2;
      font-size: 13px;
      line-height: 16px;
      border: none;
      border-radius: 5px;
      margin-left: 18px;
      font-weight: 700;

      &:disabled {
        opacity: 0.6;
      }
    }

    .hide {
      display: none;
    }
  }

  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
  }

  .message-container {
    height: auto;
    width: 80vw;
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

  @media (min-width: 600px) {
    max-width: 937px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    .page-title {
      width: 100%;
      margin: 0 auto;
      margin: calc(78px + 72px) 0 43px;

      img {
        margin-right: 18px;
      }

      .following,
      .not-following {
        width: 112px;
        font-size: 14px;
        line-height: 17px;
        /* margin-left: 200px; */
      }
    }

    .message-container {
      width: 611px;
    }

    h1 {
      width: 100%;
      font-size: 43px;
      line-height: 64px;
    }

    .search-container-mobile {
      display: none;
    }

    .timeline-screen-container {
      max-width: 937px;
    }

    .trending-hashtags-container {
      display: block;
      margin-left: 25px;
      margin-top: 19px;
    }
  }
`;
