import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";

export default function AlertNewPosts(props){

    const {qtyNewPosts, setQtyNewPosts, newPosts, setNewPosts, posts, setPosts} = props;

    return (
        <Div>
            <p>{qtyNewPosts} new { qtyNewPosts > 1 ? <span>posts</span> : <span>post</span>}, load more!</p>
            <FiRefreshCw></FiRefreshCw>
        </Div>
    );
}

const Div = styled.div`
    color: white;
    width: 100%;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin-right: 14px;
        font-family: 'Lato';
        font-size: 16px;
        line-height: 19px;
    }

`;