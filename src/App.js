import "./assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

export default function App() {

  return (
    <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>
            <Route path="/" element={<></>}></Route>              
          </Routes>
        </BrowserRouter>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;