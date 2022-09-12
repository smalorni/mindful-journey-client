import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getSinglePost, updatePost } from "../../managers/PostManager"

export const UpdatePost = () => {
    const [ categories, setCategories ] = useState([])
    const { postId } = useParams()
    const navigate = useNavigate()
    const [ currentPost, setCurrentPost ] = useState([])

    useEffect(() => {
        getSinglePost(postId).then(data => setCurrentPost(data))
    }, 
        [postId]
    )

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, 
        []
    )
    
    const changePostState = (evt) => {
        const copyPostUpdate = {...currentPost}
        copyPostUpdate[evt.target.name] = evt.target.value
        setCurrentPost(copyPostUpdate)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        updatePost(currentPost, postId).then((data) => {
            navigate(`/posts/${postId}`)
        })
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Update Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Post Category:</label>
                    <select name="category"
                        onChange={changePostState} >
                            <option value="0">Select Category:</option>
                            {
                                categories.map(category => {
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
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changePostState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <input type="number" name="created_on"
                        value={currentPost.created_on}
                        onChange={changePostState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <input type="text" name="meditator"
                        value={currentPost.meditator.user.first_name}{...currentPost.meditator.user.last_name}
                        onChange={changePostState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <input type="text" name="post_image_url"
                        value={currentPost.post_image_url}
                        onChange={changePostState} />
                </div>
            </fieldset>
            
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={handleSubmit}
                  className="button is-success">Save</button>
            </div>
            </div>
        </form>
    )
}