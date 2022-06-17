import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import PublishPost from "./PublishPost.js";
import PostCard from "./shared/PostCard.js";
import LoadingContext from "../context/LoadingContext";

export default function TimelineScreen() {

    // eslint-disable-next-line
    const { loading } = useContext(LoadingContext);
    const [posts, setPosts] = useState(["initial"]);

    useEffect(() => {
        requestGetPosts();
        // eslint-disable-next-line
    }, [loading]);

    async function requestGetPosts() {
        try {
            const response = await axios.get("http://localhost:4000/posts");
            setPosts(response.data);
            
        } catch (e) {
            setPosts(["error"]);
            console.log(e);
        }
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
                    />
                );
            })
        );

    }

    return posts[0] === "initial" ? (
        <Div>
            <HeaderBar />
            <h1>timeline</h1>
            <PublishPost />
            <div className="message-container">
                <p className="message">Loading . . .</p>
            </div>
        </Div>
    ) : (
        <Div>
            <HeaderBar />
            <h1>timeline</h1>
            <PublishPost />
            {
                renderPosts(posts)
            }
        </Div>
    );
}

const Div = styled.div`
h1 {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
    margin: calc(19px + 72px) 0 19px 17px;
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
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 33px;
    text-align: center;
}

`