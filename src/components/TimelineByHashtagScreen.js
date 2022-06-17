import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import PostCard from "./shared/PostCard.js";

export default function TimelineByHashtagScreen() {
    const {hashtag} = useParams();
    const whitespace = " ";

    // eslint-disable-next-line
    const [refreshScreen, setRefreshScreen] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState(["initial"]);

    useEffect(() => {
        requestGetPostsByHashtag();
    }, [refreshScreen]);

    async function requestGetPostsByHashtag() {
        try {
            const response = await axios.get(`http://localhost:4000/posts/${hashtag}`);
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
            )
        }

        if (filteredPosts[0] === "error") {

            return (
                <div className="message-container">
                    <p className="message">An error occured while trying to fetch the posts, please refresh the page</p>
                </div>
            )
        }

        return (
            filteredPosts.map(post => {
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

    return filteredPosts[0] === "initial" ? (
        <Div>
            <HeaderBar />
            <h1>{whitespace}</h1>
            <div className="message-container">
                <p className="message">Loading . . .</p>
            </div>
        </Div>
    ) : (
        <Div>
            <HeaderBar />
            <h1>#{hashtag}</h1>
            {
                renderFilteredPosts(filteredPosts)
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