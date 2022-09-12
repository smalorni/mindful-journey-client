//Fetch all categories, don't need other fetch calls for drop down menu
export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem("meditator_token")}`
      }
    }).then(res => res.json())
}