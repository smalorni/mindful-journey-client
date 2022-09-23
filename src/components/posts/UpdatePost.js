import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getSinglePost, updateThePost } from "../../managers/PostManager"
import "./UpdatePost.css"

export const UpdatePost = () => {
    const [ currentCategories, setCurrentCategories ] = useState([])
    const { postId } = useParams()
    const navigate = useNavigate()
    
    const [ updatePost, setUpdatePost ] = useState({
        title: "",
        category: 1,
        content: "",
        meditator: 1
    })

    //UseEffect to update a specific post
    useEffect(() => {
        getSinglePost(postId).then(data => { 
            data.category = data.category.id
            setUpdatePost(data)})
    
    }, 
        [postId]
    )

    useEffect(() => {
        getAllCategories().then(data => setCurrentCategories(data))
    }, 
        []
    )

    const [ updateUrlImage, setUpdateUrlImage ] = useState("")
    
    const updatePostUrlImageString = (post) => {
        getBase64(post.target.files[0], (base64ImageString) => {
            setUpdateUrlImage(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const updatePostState = (evt) => {
        const copyPostUpdate = {...updatePost}
        copyPostUpdate[evt.target.name] = evt.target.value
        setUpdatePost(copyPostUpdate)
    }


    return (
        <>
        <h2 className="updatePostForm__title">Update Post</h2>
        <form className="updatePostForm">
            <section className="update-post-container">
                <div className="post-box">
            
            
            <fieldset-updatePost>
                <div className="form-group-title">
                    <label>Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={updatePost.title}
                        onChange={updatePostState} />
                </div>
            </fieldset-updatePost>
            <fieldset-updatePost>
                <div className="form-group-category">
                    <label htmlFor="category">Post Category: </label>
                    <select value={updatePost.category} name="category"
                        onChange={updatePostState} >
                            <option value="0">Select Category:</option>
                            {
                                currentCategories.map(category => {
                                return <option value={category.id} key={`category--${category.id}`}>{category.name}
                                </option> 
                                })
                            }
                    </select>
                </div>
            </fieldset-updatePost>

            {/* TODO: create the rest of the input fields */}
            <fieldset-updatePost>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea name="content" className="content"
                        value={updatePost.content}
                        onChange={updatePostState} />
                </div>
            </fieldset-updatePost>

            <fieldset-updatePost>
                <div className="form-group">
                    <label htmlFor="image_url">Upload Photo: </label>
                    <input type="file" id="url_image" onChange={updatePostUrlImageString} />
                    
                </div>
            </fieldset-updatePost>
            
            <div className="field">
              <div className="control">
                <div className="post-buttons">
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()

                    const editPost = {
                        title: updatePost.title,
                        category: parseInt(updatePost.category),
                        content: updatePost.content,
                        meditator: parseInt(updatePost.meditator),
                        post_image_url: updateUrlImage
                    }
                    // Send Post request to API
                    updateThePost(editPost, postId)
                        .then(()=> navigate('/posts'))
                }}
                  className="update-button">Update</button>
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