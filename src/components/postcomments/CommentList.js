import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deletePostComment, getPostCommentsByPostId, getAllPostComments, newPostComment } from '../../managers/PostCommentManager' 


export const PostCommentList = ({ userId }) => {
  const [postComments, setPostComments] = useState([])
  const { postId } = useParams()
  const navigate = useNavigate()

  const loadComments = useCallback(() => {
    getPostCommentsByPostId(postId).then((commentsData) => {
      setPostComments(commentsData)
    })
  }, [postId])
  
  useEffect(() => { 
    loadComments()
}, [loadComments])

//   const handleDelete = (id) => {
//     deleteComment(id).then(() => {
//       loadComments()
//     })
//   }

return (
    <article className="comments">
        <button className="create-comment-btn"
            onClick={() => navigate(`/posts/${postId}`)}>⬅️ Return Back to Posts</button>
        <p>Comments</p>
        {
            postComments.map(postComment => {
                return <section key={`postComment--${postComment.id}`} className="postComments">
                    
                    <div className="comment">{postComment.comment}</div>
                    <div className="comment__meditator">Meditator: {postComment.meditator.user.first_name}{' '}{postComment.meditator.user.last_name}</div>
                    <div className="comment__date">Commented On: {postComment.readablePostComment_created_on}</div>
                    
                    
                <div className="edit_delete_buttons">
                <button className="delete-comment-btn" key={`delete--${postComment.id}`}
                    onClick={() => {const confirmBox = window.confirm("Are you sure you want to delete this comment? This action cannot be undone.")
                        if(confirmBox === true) {
                        deletePostComment(postComment.id)
                        .then(()=>getAllPostComments())
                        .then(setPostComments)
                }}}>❌</button>
                <button onClick={() => navigate(`/post_comments/update/${postComment.id}`)}>📝</button>
                </div>
            </section>
            })}
    </article>
)
}
