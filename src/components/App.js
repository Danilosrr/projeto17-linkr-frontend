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

export default function App() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState({});

  return (
    <>
      <GlobalStyle />
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider
          value={{ token, setToken, username, setUsername }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              <Route path="/timeline" element={<TimelineScreen />} />
              {/* <Route path="/" element={<></>}></Route>
              <Route path="/" element={<></>}></Route> */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
