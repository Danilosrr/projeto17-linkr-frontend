import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./../../context/UserContext.js";

export default function TrendingHashtags() {

    const { token, setToken } = useContext(UserContext);
    const [trendingHashtags, setTrendingHashtags] = useState(["initial"]);

    let tokenObject = localStorage.getItem("tokenUser");
    const localToken = JSON.parse(localStorage.getItem("tokenUser"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token.token) {
            if (!localToken) {
                navigate("/");
            } else {
                setToken({ ...localToken });
            }
        }
        getTrendingHashtags();
        // eslint-disable-next-line
    }, []);

    //const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
    const URL = "http://localhost:4000/";

    async function getTrendingHashtags() {
        try {

            const config = { headers: { Authorization: `Bearer ${JSON.parse(tokenObject).token}` } };
            const response = await axios.get(`${URL}hashtags/trending`, config);
            setTrendingHashtags(response.data);

        } catch (e) {
            setTrendingHashtags(["error"]);
            console.log(e);
        }
    }

    function render(trendingHashtags) {
        if (trendingHashtags.length === 0) {
            return (
                <div className="trending-message-container">
                    <p className="trending-message">There are no posts with hashtags yet</p>
                </div>
            )
        }

        if (trendingHashtags[0] === "error") {
            return (
                <div className="trending-message-container">
                    <p className="trending-message">An error occured while trying to fetch the trending hashtags, please refresh the page</p>
                </div>
            )
        }

        return (
            trendingHashtags.map(hashtag => {
                const { name } = hashtag;

                return (
                    <p onClick={() => navigate(`/hashtag/${name}`)} key={name} className="hashtag"># {name}</p>
                );
            })
        );
    }



    return trendingHashtags[0] === "initial" ? (
        <Div className="trending-hashtags">
            <h2>trending</h2>
            <div className="horizontal-divider"></div>
            <div className="trending-container">
                <p className="trending-message">Loading . . .</p>
            </div>
        </Div>
    ) : (
        <Div className="trending-hashtags">
            <h2>trending</h2>
            <div className="horizontal-divider"></div>
            <div className="hashtags-container">
                {render(trendingHashtags)}
            </div>
        </Div>
    );
}

const Div = styled.div`
    color: white;
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;

    h2 {
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        margin: 9px 0 12px 16px;
    }

    .horizontal-divider {
        width: 100%;
        border: 1px solid #484848;
        margin-bottom: 22px;
    }

    .hashtags-container {
        width: 100%;
        padding-left: 16px;
    }

    .hashtag {
        font-family: 'Lato';
        font-weight: 700;
        font-size: 19px;
        line-height: 30px;
        letter-spacing: 0.05em;
    }

    .hashtag:hover {
        opacity: 0.7;
    }

    .trending-message-container {
        height: auto;
        padding-right: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        color: white;
        margin: 0 auto;
        margin-top: 30px;
    }

    .trending-message {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 28px;
        letter-spacing: 0.05em;
        padding-left: 16px;
    }
`;