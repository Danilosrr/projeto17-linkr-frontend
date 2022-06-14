// import "./assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import styled from "styled-components";

import GlobalStyle from "../assets/theme/GlobalStyle";
import UserInfoContext from "../context/UserContext";
import SignUpScreen from "./SignUpScreen";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserInfoContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>}></Route>
            <Route path="/sign-up" element={<SignUpScreen />}></Route>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
}
