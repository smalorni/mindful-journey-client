import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllPosts, deletePost } from "../../managers/PostManager"
import { deletePostComment} from "../../managers/PostCommentManager"
import "./Post.css"
//Import from Material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


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

    
    return <>
            <h1 className="event-title"> Our Meditation Community</h1>
            <p className="intro"> We value diversity, equity and inclusion in our community and provide a safe, welcoming and supportive online environment for all meditators.</p>
            <button className="create-post-btn"
                onClick={() => navigate(`/posts/new`)}><AddIcon/> New Post</button>
         
            <article className="posts">
            <div className="post-container">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post-container">
                        <div className="post-card">
                            <h1 className="post-title">{post.title}</h1>
                                <div div className="post__image">
                                    <img className="post-image" src={`http://localhost:8000${post.post_image_url}`} alt={post.title} />
                                </div>
                        
                            <div className="content-container">
                        
                                <p className="post__category">{post.category.name}</p>
                                <p className="post__content">{post.content}</p>
                                <p className="post__date"><CalendarMonthIcon color="primary" />{post.readable_created_on}</p>
                                <p className="post__meditator"><SelfImprovementIcon color="primary"/> {post.meditator.first_name} {post.meditator.last_name}</p>
                        
                            </div>

                        {parseInt(localStorage.getItem('user_id')) === post.meditator.id ?
                        <>
                            <button className="post-edit-btn" onClick={() => navigate(`/posts/update/${post.id}`)}><EditIcon/></button>
                            <button className="delete-post-btn" key={`delete--${post.id}`}
                            onClick={() => {const confirmBox = window.confirm("Delete this post? This action can't be undone.")
                                if(confirmBox === true) {
                                deletePost(post.id)
                                    .then(()=>getAllPosts())
                                    .then(setPosts)
                            }}}><DeleteIcon/></button>
                        </>
                        : 
                        ""
                        }

                        </div>
                        
                        <div className="comment-card">
                

                        <button className="add-comment-btn" onClick={() => navigate(`/posts/${post.id}/add/postComment`)}><AddCommentIcon/>Comment</button>
                            <hr></hr>
                            {
                                post.post_comments.map(post_comment => {
                                return <>
                    
                                <p>{post_comment.comment}</p>
                         
                                <p className="commenters"><SelfImprovementIcon color="primary"/>{post_comment.meditator.first_name} {post_comment.meditator.last_name}</p>
                
                            {/* { local storage access to certain buttons */}
                            {parseInt(localStorage.getItem('user_id')) === post_comment.meditator.id ?
                            <>
                         
                                <button className="edit-comment-btn" onClick={() => navigate(`/posts/${post.id}/update/${post_comment.id}`)}><EditIcon style={{ fontSize: 20 }}/></button>
                                <button className="delete-comment-btn" onClick={() => handleDelete(post_comment.id)}><DeleteIcon style={{ fontSize: 20 }}/></button>
                              
                            </>
                            : 
                            ""
                            }
                            </> 
                            
                })} 
                    </div>
            
                </section>
        })}
        </div>
        </article>
        </>
}