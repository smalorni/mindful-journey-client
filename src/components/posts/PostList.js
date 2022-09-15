import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllPosts, deletePost } from "../../managers/PostManager"


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

    return (
        <article className="posts">
            <button className="create-post-btn"
                onClick={() => navigate(`/posts/new`)}>Create New Post</button>
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <div div className="post__image">
                            <img src={`http://localhost:8000${post.post_image_url}`}width={250} height={250} alt={post.title} />
                        </div>
                        <div className="post__category">{post.category.name}</div>
                        <div className="post__content">{post.content}</div>
                        <div className="post__meditator">Meditator: {post.meditator.user.first_name}{' '}{post.meditator.user.last_name}</div>
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
                </section>
                })}
        </article>
    )
}