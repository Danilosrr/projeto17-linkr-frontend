import styled from "styled-components";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { TailSpin } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import TrendingHashtags from "./shared/TrendingHashtags.js";
import PublishPost from "./PublishPost.js";
import PostCard from "./shared/PostCard.js";
import SearchBar from "./shared/SearchBar.js";
import AlertNewPosts from "./shared/AlertNewPosts.js";
import UserContext from "../context/UserContext";

export default function TimelineScreen() {
  const [refreshTimeline, setRefreshTimeline] = useState(false);
  const [posts, setPosts] = useState(["initial"]);
  const [qtyNewPosts, setQtyNewPosts] = useState(0);
  const [newPosts, setNewPosts] = useState([]);
  const { token, setToken } = useContext(UserContext);
  const [refresh, setRefresh] = useState([]);
  const [user, setUser] = useState({});
  const [followSomeone, setFollowSomeone] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

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
    } else {
      requestGetPosts();
    }
  }, [refreshTimeline, token]);
  // eslint-disable-next-line

  useInterval(() => {
    if (!token.token) {
      if (!localToken) {
        navigate("/");
      } else {
        setToken({ ...localToken });
      }
    } else {
      requestGetNewPosts();
    }
  }, 15000);

  useEffect(() => {
    if (!!token.token) {
      request();
    }
  }, [refresh]);

  async function request() {
    try {
      const config = { headers: { Authorization: `Bearer ${token.token}` } };
      const response = await axios.get(`${URL}posts?page=1`, config);
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
      const config = { headers: { Authorization: `Bearer ${token.token}` } };
      const follows = await axios.get(`${URL}follows`, config);

      if (follows.data.length === 0) {
        setFollowSomeone(false);
      } else {
        setFollowSomeone(true);
      }

      const response = await axios.get(`${URL}posts?page=${page}`, config);
      //const response = await axios.get(`http://localhost:4000/posts?page=${page}`, config);
      
      if (posts[0] === "initial") {
        setPosts(response.data);
      } else {
        setPosts([...posts, ...response.data]);
      }

      if (response.data.length === 0) {
        setLoadMore(false);
      }
      setPage(page + 1);
    } catch (e) {
      setPosts(["error"]);
      console.log(e, "requestGetPosts");
    }
  }

  async function requestGetNewPosts() {
    try {
      if (posts[0] !== "initial" && posts[0] !== "error") {
        const config = { headers: { Authorization: `Bearer ${token.token}` } };
        const follows = await axios.get(`${URL}follows`, config);

        if (follows.data.length === 0) {
          setFollowSomeone(false);
        } else {
          setFollowSomeone(true);
        }

        const lastPostId = posts[0].id;

        const newPosts = await axios.get(
          `${URL}posts/new/${lastPostId}`,
          config
        );
        //const newPosts = await axios.get(`http://localhost:4000/posts/new/${lastPostId}`, config);

        if (newPosts.data.length > 0) {
          setNewPosts(newPosts.data);
          setQtyNewPosts(newPosts.data.length);
        }
      }
    } catch (e) {
      console.log(e, "requestGetNewPosts");
    }
  }

  function renderAlertNewPosts(qty) {
    if (qty !== 0) {
      return (
        <div className="alert-new-posts-container">
          <AlertNewPosts
            qtyNewPosts={qtyNewPosts}
            setQtyNewPosts={setQtyNewPosts}
            newPosts={newPosts}
            setNewPosts={setNewPosts}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      );
    }
  }

  function renderPosts(posts) {
    if (posts.length === 0) {
      return (
        <div className="message-container">
          {followSomeone ? (
            <p className="message">No posts found from your friends</p>
          ) : (
            <p className="message">
              You don't follow anyone yet. Search for new friends!
            </p>
          )}
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

    return posts.map((post, index) => {
      return (
        <PostCard key={index} post={post} user={user.id} refresh={setRefresh} />
      );
    });
  }

  return posts[0] === "initial" ? (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <div className="search-container-mobile">
            <SearchBar />
          </div>

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
          <div className="search-container-mobile">
            <SearchBar />
          </div>

          <h1>timeline</h1>
          <PublishPost
            refreshTimeline={refreshTimeline}
            setRefreshTimeline={setRefreshTimeline}
          />

          {renderAlertNewPosts(qtyNewPosts)}

          <div className="infite-scroll-container">
            <InfiniteScroll
              pageStart={0}
              loadMore={requestGetPosts}
              hasMore={loadMore}
              loader={
                <div className="loader" key={page}>
                  <TailSpin
                    ariaLabel="loading-indicator"
                    height="50"
                    width="50"
                    color="grey"
                  />
                  <p className="loader-text">Loading more posts...</p>
                </div>
              }
            >
              {renderPosts(posts)}
            </InfiniteScroll>
          </div>
        </div>
        <div className="trending-virtual-container">
          <div className="trending-container">
            <TrendingHashtags />
          </div>
        </div>

      </div>
    </Div>
  );
}

const Div = styled.div`
  overflow-x: hidden;

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

  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
    margin: 19px 0 19px 30px;
    width: 100%;
    text-align: left;
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

  .trending-virtual-container,
  .trending-container {
    display: none;
  }
  

  .search-container-mobile {
    margin-top: 82px;
  }

  .alert-new-posts-container {
    margin-top: 40px;
    width: 100%;
    padding: 0 20px;
  }

  .infite-scroll-container {
    height: auto;
    overflow: auto;
    overflow-y: hidden;
  }

  .loader {
    margin-top: 83px;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loader-text {
    margin-top: 10px;
    font-family: "Lato";
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.05em;
    color: #6d6d6d;
  }

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .search-container-mobile {
      display: none;
    }

    h1 {
      width: 611px;
      font-size: 43px;
      line-height: 64px;
      margin: calc(78px + 72px) 0 43px;
    }

    .timeline-screen-container {
      max-width: 937px;
    }

    .trending-virtual-container {
      display: block;
      margin-left: 25px;
      margin-top: 255px;
      width: 311px;
      position: relative;
    }

    .trending-container {
      width: 311px;
      position: fixed;
      top: 254px;
      display: block;
    }

    .alert-new-posts-container {
      padding: 0;
    }
  }
`;
