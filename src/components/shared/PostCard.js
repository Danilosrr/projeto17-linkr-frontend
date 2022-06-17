import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";

export default function PostCard(props) {
  const {
    link,
    description,
    picture,
    username,
    titleLink,
    imageLink,
    descriptionLink,
    id,
  } = props.post;
  const { token } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [likePost, setLikePost] = useState(false);
  const tokenJwt = !token.token
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : token;

  const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
  // const URL = "http://localhost:4000/";

  useEffect(() => {
    checkLikePublishing();
    // eslint-disable-next-line
  }, [loading]);

  function redirectToLink() {
    window.open(link, "_blank");
  }

  function likePublishing() {
    console.log(props.post);
    setLoading(true);

    const promise = axios.post(
      `${URL}posts/like`,
      { idPost: id },
      {
        headers: {
          Authorization: `Bearer ${tokenJwt.token}`,
        },
      }
    );
    promise.then((response) => {
      setLikePost(true);
      console.log(response);
      setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  function checkLikePublishing() {
    setLoading(true);

    const promise = axios.post(
      `${URL}posts/checklike`,
      { idPost: id },
      {
        headers: {
          Authorization: `Bearer ${tokenJwt.token}`,
        },
      }
    );
    promise.then((response) => {
      setLikePost(response.data);
      setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  return (
    <Div>
      <div className="right-container">
        <img src={picture} alt={username}></img>
        {likePost ? (
          <IoHeart className="likebutton marked" onClick={likePublishing} />
        ) : (
          <IoHeartOutline className="likebutton" onClick={likePublishing} />
        )}
      </div>
      <div className="left-container">
        <p className="username">{username}</p>
        <p className="description">{description}</p>

        <div className="link-metadata" onClick={() => redirectToLink()}>
          <div className="container-title-description">
            <p className="link-title">{titleLink}</p>
            <p className="link-description">{descriptionLink}</p>
            <p className="link-url">{link}</p>
          </div>
          <img src={imageLink} alt="Article"></img>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: auto;
  width: 100vw;
  max-width: 100vw;
  background-color: #171717;
  margin-top: 19px;
  padding: 9px 18px 15px 15px;
  display: flex;
  justify-content: space-between;

  .likebutton {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    font-size: 20px;
    color: #ffffff;
  }

  .marked {
    color: #ac0000;
  }

  .right-container img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
  }

  .right-container {
    margin-right: 14px;
  }

  .left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 4px;
  }
  .username {
    font-family: "Lato";
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }

  .description {
    font-family: "Lato";
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #b7b7b7;
    margin-top: 7px;
    margin-bottom: 13px;
  }

  .link-metadata {
    width: 100%;
    height: 115px;
    display: flex;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
  }

  .link-metadata img {
    width: 95px;
    height: auto;
    object-fit: cover;
    border-radius: 0 11px 11px 0;
  }

  .container-title-description {
    padding: 7px 7px 8px 11px;
  }

  .link-title {
    font-family: "Lato";
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    margin-bottom: 4px;
    height: 26px;
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-description {
    font-family: "Lato";
    font-size: 9px;
    line-height: 11px;
    color: #9b9595;
    margin-bottom: 4px;
    height: 44px;
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-url {
    font-family: "Lato";
    font-size: 9px;
    line-height: 11px;
    color: #cecece;
    height: 22px;
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
