import { useContext,useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components"
import UserContext from "../../context/UserContext";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function CommentSection(props) {
  const { userImage, token } = useContext(UserContext);
  const [commentText,setcommentText] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const { setReset } = props;
  const tokenJwt = !token.token ? JSON.parse(localStorage.getItem("tokenUser")) : token;

  const URL = "projeto17-linkr-cdio.herokuapp.com/";

  useEffect(() => {
    getPostComments();
  }, [refresh]);

  function getPostComments(){
    const promise = axios.get(`${URL}posts/comment/${props.post.id}`, {
        headers: {
          Authorization: `Bearer ${tokenJwt.token}`,
        }
      }
    );
    promise.then((response) => {
      setPostComments(response.data);
    });
    promise.catch((error) => {
      console.log(error)
    });
  }
 
  function sendComment(event){
    event.preventDefault();
    const comment = { 
      idPost: props.post.id,
      comment: commentText
    };

    const promise = axios.post(`${URL}posts/comment`, comment, {
        headers: {
          Authorization: `Bearer ${tokenJwt.token}`,
        }
      }
    );
    promise.then((response) => {
      setcommentText("");
      setRefresh(refresh+1);
      setReset([]);
    });
    promise.catch((error) => {
      alert("Houve um erro ao publicar seu comentário");
    });
  }

  return(
    <>
    <Comments>
      { postComments.map(comment => 
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
      <form onSubmit={sendComment}>
        <input type="text" className="commentText" placeholder=" write a comment..." value={commentText} onChange={(e) => setcommentText(e.target.value)}/>
        <button type="submit">                
            <IoPaperPlaneOutline/>
        </button>
      </form>
      <div className="background"/>
    </PostComment>
    </>
  )
}

const Comments = styled.section`
  background-color: #1E1E1E;
  width: 100vw;
  max-width: 611px;
  color: #ffffff;
  padding: 0px 25px;
  max-height: 110px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
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
    background-color: blue;
    margin-left: 18px;
    width: 100%;
    word-break: break-word;
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
  position: relative;
  width: 100%;
  background-color: #1E1E1E;
  padding: 10px 25px;
  border-bottom: 1px solid #353535;
  align-items: center;
  border-radius: 16px;

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
  .background {
    background-color: #1E1E1E;
    height: 170px;
    width: 100%;
    max-width: 611px;
    z-index: -1;
    position: absolute;
    bottom: 16px;
    left: 0;
  }
`