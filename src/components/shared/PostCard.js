import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaRetweet } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { ThreeDots } from "react-loader-spinner";
import { IoHeartOutline, IoHeart, IoChatbubblesOutline } from "react-icons/io5";
import ReactHashtag from "react-hashtag";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ReactTooltip from 'react-tooltip'
import CommentSection from "./Comments";

export default function PostCard(props) {
  const {
    link,
    picture,
    username,
    titleLink,
    imageLink,
    descriptionLink,
    id,
    idPost,
    idUser,
  } = props.post;
  const { token } = useContext(UserContext);
  const [reset, setReset] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likePost, setLikePost] = useState(false);
  const [editing, setEditing] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [description, setDescription] = useState(props.post.description);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [userRetweet, setUserRetweet] = useState({ id: 0, username: "" });
  const [likesUsers, setLikesUsers] = useState([]);
  const [tooltipString, setTooltipString] = useState("");
  const [commentBar, setCommentBar] = useState(false);
  const tokenJwt = !token.token
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : token;
  const { user, refresh } = props;
  const [exclude, setExclude] = useState(false);
  const loader = (
    <ThreeDots
      type="Puff"
      color="#FFFFFF"
      height={40}
      width={40}
      timeout={3000}
    />
  );
  const tokenObject = localStorage.getItem("tokenUser");
  const navigate = useNavigate();
  const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
  const inputRef = useRef(null);
  const idOriginal = (idPost ? idPost : id);

  useEffect(() => {
    checkLikePublishing();
    getLikesCount();
    getCommentCount();
    getShareCount();
  }, [reset]);

  function redirectToLink() {
    window.open(link, "_blank");
  }

  function getLikesCount() {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${tokenJwt.token}` } };
    const promise = axios.get(`${URL}posts/likecount/${idOriginal}`, config);

    promise.then((response) => {
      setLikesCount(Number(response.data.count));
      setLikesUsers(response.data.users);
      setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  function getCommentCount() {
    const config = { headers: { Authorization: `Bearer ${tokenJwt.token}` } };
    const promise = axios.get(`${URL}posts/commentcount/${idOriginal}`, config);

    promise.then((response) => {
      setCommentCount(Number(response.data));
    });
    promise.catch((error) => {
      console.log(error);
    });
  }

  const getShareCount = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${tokenJwt.token}` } };
      const promise = await axios.get(`${URL}posts/sharecount/${idOriginal}`, config);

      setShareCount(promise.data.count);
      setUserRetweet(promise.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setTooltipString(toolString());
  }, [likesUsers])

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
      setReset([]);
    });
    promise.catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const deletePost = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` },
      };
      const response = await axios.delete(`${URL}posts/${id}`, config);
      setExclude(false);
      refresh([]);
    } catch (e) {
      alert("Não foi possível excluir o post!");
      setExclude(false);
      console.log(e);
    }
    setLoading(false);
  };

  const openEdit = () => {
    setEditing(true);
    setDescriptionEdit(description);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const cancelEdit = () => {
    setEditing(false);
  };

  const sendEdit = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` },
      };
      await axios.post(
        `${URL}posts/${id}/edit`,
        { description: descriptionEdit },
        config
      );
      setDescription(descriptionEdit);
      setEditing(false);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      alert("Não foi possível salvar as alterações!");
      setLoading(false);
    }
  };

  const verifyKey = (e) => {
    switch (e.keyCode) {
      case 13:
        sendEdit();
        e.preventDefault();
        break;

      case 27:
        cancelEdit();
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  const toolString = () => {
    let string = "";

    if (likePost) {
      string += "Você";

      if (likesCount === 4) {
        string += `, ${likesUsers[0]} e outras ${likesCount - 2} pessoas`;
      }
      else if (likesCount === 3) {
        string += `, ${likesUsers[0]} e outra 1 pessoa`;
      }
      else if (likesCount === 2) {
        string += ` e ${likesUsers[0]}`;
      }

    } else {
      if (likesCount > 3) {
        string += `${likesUsers[0]}, ${likesUsers[1]} e outras ${likesCount - 2} pessoas`;
      }
      else if (likesCount === 3) {
        string += `${likesUsers[0]}, ${likesUsers[1]} e outra 1 pessoa`;
      }
      else if (likesCount === 2) {
        string += `${likesUsers[0]} e ${likesUsers[1]}`;
      }
      else if (likesCount === 1) {
        string += `${likesUsers[0]}`;
      }
      else {
        string += "Nenhum";
      }
    }

    return string;
  }

  const retweetPost = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` } };
      await axios.post(`${URL}posts/share`, { idPost: id }, config);
      setReset([]);
    } catch (e) {
      console.log(e.message);
      alert("Não foi possível retweetar o post!");
    }
  }

  return (
    <>
      {exclude ? (
        <DeleteConfirm>
          <div className="confirm-container">
            <h2>Are you sure you want to delete this post?</h2>
            <div>
              <button
                className="cancel"
                onClick={() => {
                  setExclude(false);
                }}
              >
                No, go back
              </button>
              <button className="confirm" onClick={deletePost}>
                {loading ? loader : "Yes, delete it"}
              </button>
            </div>
          </div>
        </DeleteConfirm>
      ) : (
        <></>
      )}
      <Div>
        {(idPost ?
          <div className="share-container">
            <FaRetweet className="mini-retweet-icon" />
            Re-posted by
            <p>{userRetweet.username}</p>
          </div> : <></>
        )}

        <div className="post-container">
          <div className="right-container">
            <img
              src={picture}
              alt={username}
              onClick={() => navigate(`/user/${idUser}`)}
            ></img>
            {likePost ? (
              <IoHeart className="likebutton marked" onClick={likePublishing} />
            ) : (
              <IoHeartOutline className="likebutton" onClick={() => {
                if (!idPost) {
                  likePublishing()
                }
              }} />
            )}
            <p
              data-tip={tooltipString}
              data-type="light"
              data-place="bottom"
              data-effect="solid">
              {likesCount} likes
            </p>
            <IoChatbubblesOutline className="chatbutton" onClick={() => {
              if (!idPost) {
                setCommentBar(!commentBar)
              }
            }} />
            <p>{`${commentCount} comments`}</p>
            <FaRetweet className="share-icon" onClick={() => {
              if (!idPost) {
                retweetPost();
              }
            }} />
            <p>{`${shareCount} shares`}</p>
            <ReactTooltip />
          </div>
          <div className="left-container">
            {idUser === user ? (
              <>
                <TiPencil
                  className="pencil-icon"
                  onClick={() => {
                    editing ? cancelEdit() : openEdit();
                  }}
                />
                <FaTrash
                  className="trash-icon"
                  onClick={() => {
                    setExclude(true);
                  }}
                />
              </>
            ) : (
              <></>
            )}

            <p className="username" onClick={() => navigate(`/user/${idUser}`)}>{username}</p>
            <p className="description">
              {editing ? (
                <textarea
                  disabled={loading}
                  ref={inputRef}
                  className="description-edit"
                  value={descriptionEdit}
                  onChange={(e) => {
                    setDescriptionEdit(e.target.value);
                  }}
                  onKeyDown={verifyKey}
                />
              ) : (
                <ReactHashtag
                  onHashtagClick={(hashtag) =>
                    navigate(`/hashtag/${hashtag.replace("#", "")}`)
                  }
                >
                  {description}
                </ReactHashtag>
              )}
            </p>

            <div className="link-metadata" onClick={() => redirectToLink()}>
              <div className="container-title-description">
                <p className="link-title">{titleLink}</p>
                <p className="link-description">{descriptionLink}</p>
                <p className="link-url">{link}</p>
              </div>
              <img src={imageLink} alt="Article"></img>
            </div>
          </div>
        </div>
      </Div>
      {commentBar ?
        <CommentSection post={props.post} setReset={setReset} />
        : <></>
      }
    </>
  );

  function checkLikePublishing() {
    // setLoading(true);
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
      // setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      // setLoading(false);
    });
  }
}

const DeleteConfirm = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .confirm-container {
    height: auto;
    width: 75%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
    border-radius: 30px;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    h2 {
      width: 200px;
      color: white;
      font-size: 20px;
      font-family: "Lato";
      font-weight: 700;
      text-align: center;
      margin-bottom: 30px;
    }

    button {
      height: 30px;
      width: 100px;
      padding: 0 10px;
      border: none;
      border-radius: 4px;
      font-family: "Lato";
      font-weight: 700;
      font-size: 14px;
    }

    .cancel {
      background-color: white;
      color: #1877f2;
    }

    .confirm {
      background-color: #1877f2;
      color: white;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Div = styled.div`
  height: auto;
  width: 100vw;
  max-width: 100vw;
  background-color: #171717;
  margin-top: 19px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  .hide {
    display: none;
  }

  .likebutton, .chatbutton {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    font-size: 20px;
    color: #ffffff;
  }

  .marked {
    color: #ac0000;
  }

  .share-container {
    height: 33px;
    width: 100%;
    background-color: #1E1E1E;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    color: white;
    font-size: 13px;

    p {
      font-weight: 700;
      margin-left: 5px;
    }
  }

  .mini-retweet-icon {
    margin-right: 10px;
    font-size: 20px;
  }

  .post-container {
    display: flex;
    flex-direction: row;
    padding: 9px 18px 15px 15px;
  }

  .right-container img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
  }

  .right-container {
    padding-right: 14px;
  }

  .right-container p {
    font-family: "Lato", normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #ffffff;
  }

  .right-container p {
    font-family: "Lato", normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #ffffff;
  }

  .left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 4px;
    position: relative;
  }

  .trash-icon {
    position: absolute;
    top: 5px;
    right: 0px;
    color: white;
    font-size: 15px;
  }

  .share-icon {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    font-size: 17px;
    color: #ffffff;
  }

  .pencil-icon {
    position: absolute;
    top: 4px;
    right: 30px;
    color: white;
    font-size: 17px;
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
    width: 100%;

    span {
      font-weight: 700;
      color: #fff;
    }

    textarea {
      width: 100%;
      height: 45px;
      resize: none;
      font-family: "Lato";
      border-radius: 8px;
      border: none;
      padding: 2px 5px;
    }
  }

  .link-metadata {
    width: 100%;
    height: 115px;
    display: flex;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
  }

  .link-metadata img {
    width: 100%;
    height: auto;
    object-fit: cover;
    overflow: hidden;
    border-radius: 0 11px 11px 0;
    margin: 0;
  }

  .container-title-description {
    width: 100%;
    padding: 7px 7px 8px 11px;
  }

  .link-title {
    font-family: "Lato";
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    margin-bottom: 4px;
    height: 26px;
    width: 170px;
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
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-url {
    font-family: "Lato";
    font-size: 9px;
    line-height: 11px;
    color: #cecece;
    height: 22px;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 600px) {
    width: 611px;
    border-radius: 16px;
    padding: 17px 21px 20px 18px;

    .likebutton {
      margin-top: 19px;
    }

    .right-container img {
      display: flex;
      width: 50px;
      height: 50px;
      margin-left: 0;
    }

    .username {
      font-size: 19px;
      line-height: 23px;
    }

    .description {
      font-size: 17px;
      line-height: 20px;
    }

    .link-metadata {
      height: 155px;
    }

    .container-title-description {
      padding: 24px 27px 23px 19px;
    }

    .link-title {
      font-size: 16px;
      line-height: 19px;
      height: 38px;
      width: 302px;
    }

    .link-description {
      font-size: 11px;
      line-height: 13px;
      height: 39px;
      margin: 5px 0 13px;
      width: 302px;
    }

    .link-url {
      font-size: 11px;
      line-height: 13px;
      width: 302px;
    }
  }
`;
