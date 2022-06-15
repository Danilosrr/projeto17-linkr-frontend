import styled from "styled-components";

export default function PostCard() {

    return (

        <Div>
            <div className="right-container">
                <img src="https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg" alt="User"></img>
            </div>
            <div className="left-container">
                <p className="username">Usuário</p>
                <p className="description">Muito maneiro esse tutorial de Material UI
                    com React, deem uma olhada! #react
                    #material
                </p>
                <p>preview do link aqui</p>
            </div>
        </Div>
    );
}

const Div = styled.div`
height: auto;
width: 100vw;
background-color: #171717;
margin-top: 19px;
padding: 9px 18px 15px 15px;
display: flex;
justify-content: space-between;

img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
}

.right-container {
    margin-right: 14px;
}

.left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 4px;
}
.username {
    font-family: 'Lato';
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
}

.description {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #B7B7B7;
    margin-top: 7px;
    margin-bottom: 13px;
}

`;