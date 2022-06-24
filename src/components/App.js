import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//import styled from "styled-components";
import GlobalStyle from "../assets/theme/GlobalStyle";
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
//import PublishPost from "./PublishPost";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import TimelineScreen from "./TimelineScreen.js";
import TimelineByHashtagScreen from "./TimelineByHashtagScreen.js";
import UserTimelineScreen from "./UserTimelineScreen.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export default function App() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [token, setToken] = useState({});

  return (
    <>
      <GlobalStyle />
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider
          value={{
            token,
            setToken,
            username,
            setUsername,
            userImage,
            setUserImage,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              <Route path="/timeline" element={<TimelineScreen />} />
              <Route
                path="/hashtag/:hashtag"
                element={<TimelineByHashtagScreen />}
              />
              <Route path="/user/:id" element={<UserTimelineScreen />}></Route>
              {/*<Route path="/" element={<></>}></Route> */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
