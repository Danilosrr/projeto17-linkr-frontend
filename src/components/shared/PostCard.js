import styled from "styled-components";

export default function PostCard(props) {

    const { link, description, picture, username, titleLink, imageLink, descriptionLink } = props.post;

    function redirectToLink(){
        window.open(link, '_blank');
    }

    return (

        <Div>
            <div className="right-container">
                <img src={picture} alt={username}></img>
            </div>
            <div className="left-container">
                <p className="username">{username}</p>
                <p className="description">{description}</p>

                <div className="link-metadata" onClick={() => redirectToLink()}>
                    <div className="container-title-description">
                        <p className="link-title">{titleLink}</p>
                        <p className="link-description">{descriptionLink}</p>
                        <p className="link-url">{link}</p>
                    </div>
                    <img src={imageLink} alt="Article"></img>
                </div>
            </div>
        </Div>
    );
}

const Div = styled.div`
height: auto;
width: 100vw;
max-width: 100vw;
background-color: #171717;
margin-top: 19px;
padding: 9px 18px 15px 15px;
display: flex;
justify-content: space-between;

.right-container img {
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

.link-metadata {
    max-width: 100%;
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
}

.link-metadata img {
    width: 95px;
    height: auto;
    object-fit: cover;  
    border-radius: 0 11px 11px 0;  
}

.container-title-description {
    padding: 7px 7px 8px 11px;
}

.link-title {
    font-family: 'Lato';
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    margin-bottom: 4px;
}

.link-description {
    font-family: 'Lato';
    font-size: 9px;
    line-height: 11px;
    color: #9B9595;
    margin-bottom: 4px;
}

.link-url {
    font-family: 'Lato';
    font-size: 9px;
    line-height: 11px;
    color: #CECECE;
}
`;