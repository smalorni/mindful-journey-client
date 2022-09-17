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
              <input className="input" required autoFocus
                type="textarea"
                value={postComment.comment}
                name = "comment"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset>
          
          {/* <fieldset>
            <div className="form-group">
            <label>Comment:</label>
              <div className="control">
              <input className="input" required autoFocus
                type="text"
                value={comment.content}
                name = "content"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset> */}

            <br></br>

          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={handleSave}
                className="button is-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
