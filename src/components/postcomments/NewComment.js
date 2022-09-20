import { newPostComment } from "../../managers/PostCommentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

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
    <form className="commentForm">
      <div className="card">
      <h2 className="title">Add A New Comment</h2>
        <div className="card-content">

          <fieldset>
            <div className="form-group">
            <label>Comment:</label>
              <div className="control">
              <textarea className="input" required autoFocus
                value={postComment.comment}
                name = "comment"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset>


          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={handleSave}
                className="button is-success">
                Save
              </button>
              <button className="cancel" onClick={() => navigate('/posts')}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
