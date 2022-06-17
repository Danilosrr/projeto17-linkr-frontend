import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import {IoHeartOutline,IoHeart} from "react-icons/io5";
import UserContext from "../../context/UserContext";

export default function PostCard(props) {
    
    const { link, description, picture, username, titleLink, imageLink, descriptionLink, id } = props.post;
    const { token } = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);
    const [likePost, setLikePost] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const tokenJwt = !token.token ? JSON.parse(localStorage.getItem("tokenUser")) : token;

    const URL = "https://projeto17-linkr-cdio.herokuapp.com/"; 
    //const URL = "http://localhost:4000/";

    useEffect(() => {
        checkLikePublishing();
        getLikesCount();
    }, [loading]);
    
    function redirectToLink(){
        window.open(link, '_blank');
    }

    function likePublishing(){
        console.log(props.post); setLoading(true);

        const promise = axios.post(`${URL}posts/like`, { idPost:id }, {
            headers: {
              Authorization: `Bearer ${tokenJwt.token}`,
            }
        });
        promise.then((response) => {
            setLikePost(true);
            console.log(response); setLoading(false);
        });
        promise.catch((error) => {
            console.log(error); setLoading(false);

        });
    };

    function checkLikePublishing(){
        setLoading(true);

        const promise = axios.post(`${URL}posts/checklike`, { idPost:id }, {
            headers: {
              Authorization: `Bearer ${tokenJwt.token}`,
            }
        });
        promise.then((response) => {
            setLikePost(response.data); 
            setLoading(false);
        });
        promise.catch((error) => {
            console.log(error); setLoading(false);
        });
    };

    function getLikesCount(){
        setLoading(true);

        const promise = axios.post(`${URL}posts/likecount`, { idPost:id });
        
        promise.then((response) => {
            setLikesCount(response.data); 
            setLoading(false);
        });
        promise.catch((error) => {
            console.log(error); setLoading(false);
        });
    }

    return (

        <Div>
            <div className="right-container">
                <img src={picture} alt={username}></img>
                {likePost?
                    <IoHeart className="likebutton marked" onClick={likePublishing}/>:
                    <IoHeartOutline className="likebutton" onClick={likePublishing}/>
                }
                <p>{likesCount} likes</p>
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
    width:100%;
    margin-top: 10px;
    align-items: center;
    font-size: 20px;
    color: #FFFFFF;
};

.marked {
    color: #AC0000;
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

.right-container p {
    font-family: 'Lato', normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
}

.left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 4px;
}
.username {
    font-family: 'Lato';
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
}

.description {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #B7B7B7;
    margin-top: 7px;
    margin-bottom: 13px;
}

.link-metadata {
    max-width: 100%;
    display: flex;
    border: 1px solid #4D4D4D;
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
    font-family: 'Lato';
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    margin-bottom: 4px;
}

.link-description {
    font-family: 'Lato';
    font-size: 9px;
    line-height: 11px;
    color: #9B9595;
    margin-bottom: 4px;
}

.link-url {
    font-family: 'Lato';
    font-size: 9px;
    line-height: 11px;
    color: #CECECE;
}
`;