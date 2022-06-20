import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./../../assets/css/fonts.css";
import { IoChevronDown } from "react-icons/io5";
import { IconContext } from "react-icons";
import UserContext from "../../context/UserContext";
import SearchBar from "./SearchBar.js";
import axios from "axios";

export default function HeaderBar() {
  const { token, setToken, userImage, setUserImage } = useContext(UserContext);
  const [refresh, setRefresh] = useState({ token: "" });
  const navigate = useNavigate();
  //const URL = "https://projeto17-linkr-cdio.herokuapp.com/";
  const URL = "http://localhost:4000/";
  const localToken = JSON.parse(localStorage.getItem("tokenUser"));

  useEffect(() => {
    if (!token.token && !userImage) {
      if (!localToken) {
        navigate("/");
        console.log("teste");
      } else {
        setToken({ ...localToken });
        setRefresh({ ...localToken });
      }
    } else {
      const promise = axios.get(`${URL}userToken`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      promise.then(({ data }) => {
        setUserImage(data.picture);
      });
      promise.catch((error) => {
        console.log(error.response.data);
        navigate("/");
      });
    }
  }, [refresh]);

  return (
    <Div>
      <p onClick={() => navigate("/timeline")}>linkr</p>

      <div className="search-container-desktop">
        <SearchBar />
      </div>

      <div className="right-container">
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <div>
            <IoChevronDown className="arrow" />
          </div>
        </IconContext.Provider>

        <img src={userImage} alt="User"></img>
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-color: #151515;
  width: 100%;
  height: 72px;
  color: white;
  padding: 12px 14px 0 17px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  p {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
  }

  .search-container-desktop {
    display: none;
  }

  img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
  }

  .arrow {
    font-size: 15px;
  }

  .right-container {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
  }

  @media (min-width: 600px) {
    padding: 10px 27px 0 28px;

    .search-container-desktop {
      display: block;
      margin-top: 4px;
    }

    p {
      font-size: 49px;
      line-height: 54px;
    }

    .arrow {
      font-size: 18px;
    }

    img {
      width: 53px;
      height: 53px;
    }
  }
`;
