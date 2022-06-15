import styled from "styled-components";
import "./../../assets/css/fonts.css"
import { IoChevronDown } from "react-icons/io5";
import { IconContext } from "react-icons";



export default function HeaderBar() {
    return (
        <Div>
            <p>linkr</p>
            <div class="right-container">
                <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <div>
                        <IoChevronDown />
                    </div>
                </IconContext.Provider>

                <img src="https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg" alt="User"></img>
            </div>
        </Div>
    );
}

const Div = styled.div`

background-color: #151515;
width: 100vw;
height: 72px;
color: white;
padding: 12px 14px 0 17px;
display: flex;
align-content: center;
justify-content: space-between;

p {
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
}

img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
}

.right-container {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
}

`;