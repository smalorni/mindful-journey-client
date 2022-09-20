import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getSinglePost, updateThePost } from "../../managers/PostManager"

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
        <form className="newPostForm">
            <h2 className="newPostForm__header">New Post</h2>
            
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={updatePost.title}
                        onChange={updatePostState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
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
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea name="content" className="content"
                        value={updatePost.content}
                        onChange={updatePostState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url">Image url: </label>
                    <input type="file" id="url_image" onChange={updatePostUrlImageString} />
                    
                </div>
            </fieldset>
            
            <div className="field">
              <div className="control">
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
                  <button className="cancel" onClick={() => navigate('/posts')}>Cancel</button>
            </div>
            </div>
        </form>
    )
}