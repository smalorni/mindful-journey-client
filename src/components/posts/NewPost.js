import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createPost } from "../../managers/PostManager"

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
        <form className="newPostForm">
            <h2 className="newPostForm__title">New Post</h2>
            
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentPost.title}
                        onChange={changePostState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
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
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea name="content" className="content"
                        value={currentPost.content}
                        onChange={changePostState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url">Image url: </label>
                    <input type="file" id="url_image" onChange={createPostUrlImageString} />
                    
                </div>
            </fieldset>
            
            <div className="field">
              <div className="control">
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
                  <button className="cancel" onClick={() => navigate('/posts')}>Cancel</button>
            </div>
            </div>
        </form>
    )
}