import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar(){

    return (
        <SearchBarDiv>
            <input placeholder="Search for people and friends"></input>
            <div className="icon"><AiOutlineSearch /></div>
        </SearchBarDiv>
    );
}

const SearchBarDiv = styled.div`
    width: 350px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    position: relative;

    input {
        height: 100%;
        width: 100%;
        border-style: none;
        border-radius: 8px;
        padding-left: 16px;
        padding-right: 50px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
    }
    
    .icon {
        position: absolute;
        top: 12px; 
        right: 14px;
        opacity: 0.4;
        font-size: 23px;
    }
    
    .icon:hover {
        opacity: 1;
    }

    @media (min-width: 600px) {
        width: 563px;
        height: 45px;
        position: relative;

        .icon {
            color: black;
        }
    }
`;