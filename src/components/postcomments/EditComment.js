import { getSinglePostComment, updatePostComment } from "../../managers/PostCommentManager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./EditComment.css"

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
    <>
    <h2 className="comment-title">Update Comment</h2>
    <form className="commentForm">
      <div className="comment_card">
      

          <fieldset-update-comment>
            <div className="form-group-comment">
            <label className="comment">Comment:</label>
              <div className="comment-control">
              <textarea className="comment-input" required autoFocus
                value={updateComment.comment}
                name = "comment"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset-update-comment>


          <div className="field is-grouped">
            <div className="control">
              <div className="comment-buttons">
              <button
                onClick={handleSave}
                className="comment-button">
                Update
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
