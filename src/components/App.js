import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//import styled from "styled-components";
import GlobalStyle from "../assets/theme/GlobalStyle";
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
import PublishPost from "./PublishPost";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState({});

  return (
    <>
      <GlobalStyle />
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              {/* <Route path="/" element={<></>} />
              <Route path="/" element={<></>} />
              <Route path="/" element={<></>} /> */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
