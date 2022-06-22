import { useContext } from "react";
import styled from "styled-components"
import UserContext from "../../context/UserContext";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function CommentSection(props) {
    const { userImage, username } = useContext(UserContext);

    let arr =[{   
        id:1,	
        idPost: 23,	
        idUser: 4,	
        comment: "comentario test",	
        createdAt: "2022-06-22 12:31:57.043544",	
        picture: "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
        username: "user"
    },{   
        id:1,	
        idPost: 23,	
        idUser: 4,	
        comment: "comentario test",	
        createdAt: "2022-06-22 12:31:57.043544",	
        picture: "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
        username: "user"
    }];

    return(
        <>
        <Comments>
            { arr.map(comment => 
                <div className="commentSection">
                    <section className="comment">
                        <img src={comment.picture} alt='user pic'/>
                        <div className="commentContent">
                            <h3>{comment.username}</h3>
                            <p>{comment.comment}</p>
                        </div>
                    </section>
                </div> 
            )}
        </Comments>
        <PostComment>
            <img src={userImage} alt='profile pic'/>
            <form action="search.php" method="post" class="index-search-form">
                <input type="text" className="commentText" placeholder=" write a comment..."/>
                <button type="submit">                
                    <IoPaperPlaneOutline/>
                </button>
            </form>
        </PostComment>
        </>
    )
}

const Comments = styled.section`
  background-color: #1E1E1E;
  width: 100%;
  color: #ffffff;
  padding: 0px 25px;
  
  .comment {
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid #353535;
  }
  .comment img {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    object-fit: cover;
  }
  .commentContent {
    margin-left: 18px;
    width: 100%;
  }
  .commentContent {
    font-family: "Lato", normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.8px;
  }
  .commentContent h3 {
    font-weight: 700;
  }
`
const PostComment = styled.section`
  display: flex;
  width: 100%;
  background-color: #1E1E1E;
  padding: 10px 25px;
  border-bottom: 1px solid #353535;
  align-items: center;

  img {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    object-fit: cover;
  }
  form {
    position: relative;
    display: flex;
    padding: 0px 0px 0px 15px;
    width: 100%;
    justify-content: space-between;
  }
  form .commentText {
    width: 100%;
  }
  form input {
    height: 39px;
    background: #252525;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    padding-left: 3%;
  }
  form button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding-right: 2%;
    right: 0;
    height: 100%;
    background: none;
    color: #ffffff;
	border: none;
    font-size: 20px;
  }
  form ::placeholder {
    color: #575757;
  }
`