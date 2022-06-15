import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUpScreen() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
    picture: "",
  });
  const [disabled, setDisabled] = useState(false);

  const URL = "https://projeto17-linkr-cdio.herokuapp.com/";

  function updateUserInfo(event) {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function signUpUser(event) {
    event.preventDefault();
    setDisabled(true);
    const promise = axios.post(`${URL}sign-up`, userInfo);
    promise.then()
  }

  return (
    <SignUpScreenContainer>
      <header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </header>
      <StyledForm>
        <input
          name="email"
          type="email"
          disabled={disabled}
          placeholder="e-mail"
          value={userInfo.email}
          onChange={updateUserInfo}
          required
        />
        <input
          name="password"
          type="password"
          disabled={disabled}
          placeholder="password"
          value={userInfo.password}
          onChange={updateUserInfo}
          required
        />
        <input
          name="username"
          type="text"
          disabled={disabled}
          placeholder="username"
          value={userInfo.username}
          onChange={updateUserInfo}
          required
        />
        <input
          name="picture"
          type="url"
          disabled={disabled}
          placeholder="picture url"
          value={userInfo.picture}
          onChange={updateUserInfo}
          required
        />
        <button type="submit">Sign Up</button>
        <StyledLink to="/">Switch back to log in</StyledLink>
      </StyledForm>
    </SignUpScreenContainer>
  );
}

const SignUpScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333;

  ::placeholder {
    color: #fff;
  }

  header {
    width: 100%;
    height: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #151515;
    margin-bottom: 40px;

    h1 {
      color: #fff;
      font-family: "Passion one", cursive;
      font-weight: bold;
      font-size: 76px;
      line-height: 84px;
      letter-spacing: 0.05em;
    }

    h2 {
      color: #fff;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      font-size: 23px;
      line-height: 34px;
      text-align: center;
      margin: 0 20%;
    }
  }

  @media (min-width: 600px) {
    display: flex;
    height: 100vh;

    header {
      width: 70%;
      height: 100vh;
      display: block;
      padding: 300px 10%;

      h1 {
        font-size: 106px;
        line-height: 117px;
      }

      h2 {
        font-size: 43px;
        line-height: 64px;
        text-align: left;
        width: 448px;
        margin: 0;
      }
    }
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;

  input {
    font-family: "Oswald", sans-serif;
    width: 100%;
    font-size: 22px;
    line-height: 33px;
    font-weight: 700;
    padding-left: 17px;
    height: 55px;
    border-radius: 6px;
    border: none;
    margin-bottom: 12px;
    letter-spacing: 0.03em;
  }

  button {
    font-family: "Oswald", sans-serif;
    width: 100%;
    height: 55px;
    color: #fff;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
    letter-spacing: 0.03em;
    margin-bottom: 18px;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    width: 40%;
    justify-content: center;

    input,
    button {
      height: 65px;
      font-size: 27px;
      line-height: 40px;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 17px;
  line-height: 20px;

  @media (min-width: 600px) {
    font-size: 20px;
    line-height: 24px;
  }
`;
