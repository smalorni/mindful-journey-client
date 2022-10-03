//Managed all the fetch calls for events

//Get list of events
export const getAllEvents = () => {
    return fetch(`http://localhost:8000/events`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
    })
        .then(response => response.json())
}

//Delete single event
export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
 })
}

//Update Event
export const updateTheEvent = (updateEvent, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateEvent)
    })
}

//Single Event
export const getSingleEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
     })
        .then(response => response.json())
}

//Create new event
export const createEvent = (event) => {
    return fetch(`http://localhost:8000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('meditator_token')}`
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
  }

  
  //leave event
  export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`
        }
    })
}

//attend event
export const attendEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("meditator_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventId)
    })
  }
 
//search events by location, description from list on server side
export const getSearchEvents = (search) => {
    return fetch(`http://localhost:8000/events?search=${search}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem("meditator_token")}`,
        }
    })
        .then(response => response.json())
}