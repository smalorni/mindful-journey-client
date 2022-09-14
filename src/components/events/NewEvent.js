import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createEvent } from "../../managers/EventManager"

export const NewEvent = () => {
    const navigate = useNavigate()

    const [ currentEvent, setCurrentEvent ] = useState({
        name: "",
        location: "",
        date: "2022-09-13",
        host: "",
        description: "",
        price: 0.00,
        activity_level: 1,
    })

    // useEffect(() => {
    //     getAllEvents().then(data => setPostCategories(data))
    // }, 
    //     []
    // )

    const [ eventUrlImage, setEventUrlImage ] = useState("")
    
    const createEventUrlImageString = (post) => {
        getBase64(post.target.files[0], (base64ImageString) => {
            setEventUrlImage(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const changeEventState = (evt) => {
        const copyNewEvent = {...currentEvent}
        copyNewEvent[evt.target.name] = evt.target.value
        setCurrentEvent(copyNewEvent)
    }

    return (
        <form className="newEventForm">
            <h2 className="newEventForm__title">New Event</h2>
            
            <fieldset>
                <div className="form-group">
                <label>Name of Event: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Date of Event: </label>
                    <input type="date" name="name" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Host's Name:</label>
                    <input type="text" name="host" required autoFocus className="form-control"
                        value={currentEvent.host}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="textarea" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Total Price: </label>
                    <span>$</span>
                    <input type="number" name="price" required autoFocus className="form-control"
                        value={currentEvent.price}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Activity Level: </label>
                    <input type="number" min="1" max="4" name="activity_level" required autoFocus className="form-control"
                        value={currentEvent.activity_level}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_image_url">Image url: </label>
                    <input type="file" id="url_image" onChange={createEventUrlImageString} />
                    
                </div>
            </fieldset>
            
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()

                    const newEvent = {
                        name: currentEvent.name,
                        location: currentEvent.location,
                        date: currentEvent.date,
                        host: currentEvent.host,
                        description: currentEvent.description,
                        price: currentEvent.price,
                        activity_level: currentEvent.activity_level,
                        event_image_url: eventUrlImage
                    }

                    // Send Post request to API
                    createEvent(newEvent)
                        .then(()=> navigate('/events'))
                }}
                  className="save-button">Save Event</button>
            </div>
            </div>
        </form>
    )
}