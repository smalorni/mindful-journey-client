//fetch calls for comments
export const getAllPostComments = () => {
    return fetch("http://localhost:8000/postComments", {
      headers: {
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      }
    })
      .then(res => res.json())
  }

export const newPostComment = (comment) => {
    return fetch(`http://localhost:8000/postComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      },
      body: JSON.stringify(comment)
    }).then(res => res.json())
  }
  
  //might be postId or post.id
  export const getPostCommentsByPostId = (id) => {
    return fetch(`http://localhost:8000/postComments?post_id=${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      }
    }).then(res => res.json())
  }
  
  export const deletePostComment = (commentId) => {
    return fetch(`http://localhost:8000/postComments/${commentId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      }
    })
  }
  
  export const updatePostComment = (comment) => {
    return fetch(`http://localhost:8000/postComments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      },
      body: JSON.stringify(comment)
    })
  }
  
  export const getSinglePostComment = (id) => {
    return fetch(`http://localhost:8000/postComments/${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      }
    })
      .then(res => res.json())
  }
  