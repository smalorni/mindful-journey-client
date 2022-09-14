//Managed all the fetch calls for posts

//Get list of posts
export const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
    })
        .then(response => response.json())
}

//Delete single post
export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
 })
}

//Update Post
export const updateThePost = (post, postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

//Single Post
export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
     })
        .then(response => response.json())
}

//Create new post
export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
  }