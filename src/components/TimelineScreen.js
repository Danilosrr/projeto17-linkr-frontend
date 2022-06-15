import styled from "styled-components";
import "./../assets/css/fonts.css";
import HeaderBar from "./shared/HeaderBar.js";
import PublishPost from "./PublishPost.js";
import PostCard from "./shared/PostCard.js";

export default function TimelineScreen(){
    return (
        <Div>
            <HeaderBar />
            <h1>timeline</h1>
            <PublishPost />
            <PostCard />
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

`;