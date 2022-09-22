import { getSinglePostComment, updatePostComment } from "../../managers/PostCommentManager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const EditComment = () => {
  const { commentId } = useParams()
  const navigate = useNavigate()

  const [updateComment, setUpdateComment] = useState({
    comment: "",
    meditator: 1
  })

  useEffect(() => {
    getSinglePostComment(commentId).then(data => { 
        setUpdateComment(data)})

}, 
    [commentId]
)

  const handleSave = (event) => {
    event.preventDefault()
    updatePostComment(updateComment).then(()=> navigate(`/posts` )
    )
  }

  const handleUpdate = (evt) => {
    const copy = { ...updateComment }
    copy[evt.target.name] = evt.target.value
    setUpdateComment(copy)
  }

  return (
    <form className="commentForm">
      <div className="comment_card">
      <h2 className="title">Update Comment</h2>
        <div className="card-content">

          <fieldset>
            <div className="form-group">
            <label>Comment:</label>
              <div className="control">
              <textarea className="input" required autoFocus
                value={updateComment.comment}
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
                Update
              </button>
              <button className="cancel" onClick={() => navigate('/posts')}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
