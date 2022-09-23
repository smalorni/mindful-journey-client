import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createPost } from "../../managers/PostManager"
import "./NewPost.css"

export const NewPost = () => {
    const [ postCategories, setPostCategories ] = useState([])
    const navigate = useNavigate()

    const [ currentPost, setCurrentPost ] = useState({
        category: 1,
        title: "",
        content: "",
        meditator: 1
    })

    useEffect(() => {
        getAllCategories().then(data => setPostCategories(data))
    }, 
        []
    )

    const [ postUrlImage, setPostUrlImage ] = useState("")
    
    const createPostUrlImageString = (post) => {
        getBase64(post.target.files[0], (base64ImageString) => {
            setPostUrlImage(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const changePostState = (evt) => {
        const copyNewPost = {...currentPost}
        copyNewPost[evt.target.name] = evt.target.value
        setCurrentPost(copyNewPost)
    }

    return (
        <>
        <h2 className="newPostForm-title">New Post</h2>
        <form className="newPostForm">
            <section className="new-post-container">
                <div className="post-box">
            
            
            <fieldset-new-post>
                <div className="form-group-title">
                    <label>Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentPost.title}
                        onChange={changePostState} />
                </div>
            </fieldset-new-post>
            <fieldset-new-post>
                <div className="form-group-category">
                    <label htmlFor="category">Post Category: </label>
                    <select name="category"
                        onChange={changePostState} >
                            <option value="0">Select Category:</option>
                            {
                                postCategories.map(category => {
                                return <option value={category.id} key={`category--${category.id}`}>{category.name}
                                </option> 
                                })
                            }
                    </select>
                </div>
            </fieldset-new-post>

            {/* TODO: create the rest of the input fields */}
            <fieldset-new-post>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea name="content" className="content"
                        value={currentPost.content}
                        onChange={changePostState} />
                </div>
            </fieldset-new-post>

            <fieldset-new-post>
                <div className="form-group">
                    <label htmlFor="image_url">Upload Photo: </label>
                    <input type="file" id="url_image" onChange={createPostUrlImageString} />
                    
                </div>
            </fieldset-new-post>
            
            <div className="field">
              <div className="control">
                <div className="post-buttons">
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()

                    const newPost = {
                        title: currentPost.title,
                        category: parseInt(currentPost.category),
                        content: currentPost.content,
                        meditator: parseInt(currentPost.meditator),
                        post_image_url: postUrlImage
                    }
                    // Send Post request to API
                    createPost(newPost)
                        .then(()=> navigate('/posts'))
                }}
                  className="save-button">Save Post</button>
                  <button className="cancel-post" onClick={() => navigate('/posts')}>Cancel</button>
            </div>
            </div>
            </div>
            </div>
            </section>
        </form>
        </>
    )
}