import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function PostCard(props) {

    const { id, idUser, link, description, picture, username } = props.post;
    const { user, refresh } = props;
    const [exclude, setExclude] = useState(false);
    const [loading, setLoading] = useState(false);
    const loader = <ThreeDots
        type="Puff"
        color="#FFFFFF"
        height={40}
        width={40}
        timeout={3000}
    />
    const tokenObject = localStorage.getItem("tokenUser");
    const URL = "https://projeto17-linkr-cdio.herokuapp.com/";

    const deletePost = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` } };
            const response = await axios.delete(`${URL}posts/${id}`, config);
            setExclude(false);
            refresh([]);
        } catch (e) {
            alert("Não foi possível excluir o post!");
            setExclude(false);
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            {
                exclude ?
                    <DeleteConfirm>
                        <div className="confirm-container">
                            <h2>Are you sure you want to delete this post?</h2>
                            <div>
                                <button className="cancel" onClick={() => { setExclude(false) }}>No, go back</button>
                                <button className="confirm" onClick={deletePost}>{(loading ? loader : "Yes, delete it")}</button>
                            </div>
                        </div>
                    </DeleteConfirm>
                    : <></>
            }
            <Div>
                <div className="right-container">
                    <img onClick={() => { console.log(user) }} src={picture} alt={username}></img>
                </div>
                <div className="left-container">
                    {idUser === user ? <FaTrash onClick={() => { setExclude(true) }} className="trash-icon" /> : <></>}
                    <p className="username">{username}</p>
                    <p className="description">{description}
                    </p>
                    <p>preview do link aqui</p>
                </div>
            </Div>
        </>
    );
}

const DeleteConfirm = styled.div`
position: fixed;
top: 0;
right: 0;
height: 100vh;
width: 100vw;
background-color: rgba(255,255,255,0.9);
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
        font-family: 'Lato';
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
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
    }

    .cancel {
        background-color: white;
        color: #1877F2;
    }
    
    .confirm {
        background-color: #1877F2;
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
background-color: #171717;
margin-top: 19px;
padding: 9px 18px 15px 15px;
display: flex;
justify-content: space-between;

img {
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
    position: relative;
}

.trash-icon {
    position: absolute;
    top: 5px;
    right: 0px;
    color: white;
    font-size: 13px; 
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

`;