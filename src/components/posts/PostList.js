import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllPosts, deletePost } from "../../managers/PostManager"
// import { newPostComment } from "../../managers/PostCommentManager"
// import { getAllPostComments } from "../../managers/PostCommentManager"
// import { deletePostComment} from "../../managers/PostCommentManager"


//Goal: A list of post can be viewed
export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const [ postComments, setPostComments ] = useState([])
    const navigate = useNavigate()


    //Fetch all posts
    const allPosts = () => getAllPosts().then(data => setPosts(data))

    //Use effect
    useEffect(() => {
        allPosts() 
    }, 
    [])

    return (
        <article className="posts">
            <button className="create-post-btn"
                onClick={() => navigate(`/posts/new`)}>Create New Post</button>

            <div className="post_section">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <div div className="post__image">
                            <img src={`http://localhost:8000${post.post_image_url}`}width={250} height={250} alt={post.title} />
                        </div>
                        <div className="post__category">{post.category.name}</div>
                        <div className="post__content">{post.content}</div>
                        <div className="post__meditator">Meditator: {post.meditator.first_name} {post.meditator.last_name}</div>
                        <div className="post__date">Posted On: {post.readable_created_on}</div>
                        
           
            <div className="edit_delete_buttons">
                <button className="delete-post-btn" key={`delete--${post.id}`}
                    onClick={() => {const confirmBox = window.confirm("Are you sure you want to delete this post? This action cannot be undone")
                        if(confirmBox === true) {
                            deletePost(post.id)
                            .then(()=>getAllPosts())
                            .then(setPosts)
                }}}>❌</button>

                <button onClick={() => navigate(`/posts/update/${post.id}`)}>📝</button>
                
                </div>
                
                <br></br>

                <p className="comment_title">Comments</p>
                <button onClick={() => navigate(`/posts/${post.id}/add/postComment`)}>➕ Comment</button>
                {
                            post.post_comments.map(post_comment => {
                            return <>
                    
                            <p>{post_comment.comment}</p>
                            <p>{post_comment.meditator.first_name} {post_comment.meditator.last_name}</p>
                    
                    </>
                })}
            
            </section>
                 })}
                 </div>
    
        </article>
    )
}