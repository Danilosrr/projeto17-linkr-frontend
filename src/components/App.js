import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//import styled from "styled-components";
import GlobalStyle from "../assets/theme/GlobalStyle";
import UserInfoContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
//import PublishPost from "./PublishPost";
import SignUpScreen from "./SignUpScreen";
import TimelineScreen from "./TimelineScreen.js";

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <GlobalStyle />
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserInfoContext.Provider value={{}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<></>}></Route>
              <Route path="/sign-up" element={<SignUpScreen />}></Route>
              <Route path="/timeline" element={<TimelineScreen />}></Route>
              <Route path="/" element={<></>}></Route>
              <Route path="/" element={<></>}></Route>
            </Routes>
          </BrowserRouter>
        </UserInfoContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
