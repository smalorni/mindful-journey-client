import { newPostComment } from "../../managers/PostCommentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NewComment.js"

export const NewComment = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [postComment, setPostComment] = useState({
    post: postId,
    comment: "",
    meditator: 1
  })

  const handleSave = (event) => {
    event.preventDefault()
    newPostComment(postComment).then(()=> navigate(`/posts` )
    )
  }

  const handleUpdate = (evt) => {
    const copy = { ...postComment }
    copy[evt.target.name] = evt.target.value
    setPostComment(copy)
  }

  return (
    <>
    <h2 className="comment-title">Add New Comment</h2>
    <form className="commentForm">
      <div className="comment_card">
      
          <fieldset-new-comment>
            <div className="form-group-comment">
            <label className="comment">Comment:</label>
              <div className="comment-control">
              <textarea className="comment-input" required autoFocus
                value={postComment.comment}
                name = "comment"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset-new-comment>


          <div className="field is-grouped">
            <div className="control">
              <div class="comment-buttons">
              <button
                onClick={handleSave}
                className="comment-button">
                Post
              </button>
              <button className="cancel-comment" onClick={() => navigate('/posts')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </form>
    </>
  )
}
