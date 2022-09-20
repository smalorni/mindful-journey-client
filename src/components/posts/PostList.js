import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllPosts, deletePost } from "../../managers/PostManager"
// import { newPostComment } from "../../managers/PostCommentManager"
// import { getAllPostComments } from "../../managers/PostCommentManager"
import { deletePostComment} from "../../managers/PostCommentManager"
import "./Post.css"
//Import from Material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


//Goal: A list of post can be viewed
export const PostList = () => {
    const [ posts, setPosts ] = useState([])

    const navigate = useNavigate()


    //Fetch all posts
    const allPosts = () => getAllPosts().then(data => setPosts(data))

    //Use effect
    useEffect(() => {
        allPosts() 
    }, 
    [])

 
    //added delete button for comment
    const handleDelete = (commentId) => {
        deletePostComment(commentId).then(() => {
            allPosts()
        })
    }

    return (
        <article className="post_card">
            <button className="create-post-btn"
                onClick={() => navigate(`/posts/new`)}>Create New Post</button>

            <div className="post-container">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                       <div className="post-card">
                        <div div className="post__image">
                            <img src={`http://localhost:8000${post.post_image_url}`} alt={post.title} />
                        </div>
                        <h1 className="post-title">{post.title}</h1>
                        <p className="post__date"><CalendarMonthIcon/> {post.readable_created_on}</p>
                        <p className="post__meditator"><SelfImprovementIcon/>Meditator: {post.meditator.first_name} {post.meditator.last_name}</p>
                        <p className="post__category">{post.category.name}</p>
                        <p className="post__content">{post.content}</p>
                        
                        </div>

                
                        <button className="post-edit-btn" onClick={() => navigate(`/posts/update/${post.id}`)}><EditIcon/></button>
                        <button className="delete-post-btn" key={`delete--${post.id}`}
                    onClick={() => {const confirmBox = window.confirm("Are you sure you want to delete this post? This action cannot be undone")
                        if(confirmBox === true) {
                            deletePost(post.id)
                            .then(()=>getAllPosts())
                            .then(setPosts)
                }}}><DeleteIcon/></button>
    
                <br></br>
                <button onClick={() => navigate(`/posts/${post.id}/add/postComment`)}><AddCommentIcon/>Comment</button>
                <p className="comment_title">Comments</p>
                {
                            post.post_comments.map(post_comment => {
                            return <>
                    
                            <p>{post_comment.comment}</p>
                            <p>{post_comment.meditator.first_name} {post_comment.meditator.last_name}</p>
                
                            <button onClick={() => handleDelete(post_comment.id)}><DeleteIcon/></button>
                            </> 
                })}
            
            </section>
        })}
            </div>
    
        </article>
    )
}