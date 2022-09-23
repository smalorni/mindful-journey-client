import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateTheEvent, getSingleEvent } from "../../managers/EventManager"
import "./UpdateEvent.css"

export const UpdateEvent = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()

    const [ updateEvent, setUpdateEvent ] = useState({
        name: "",
        location: "",
        start_date: "2022-09-13",
        end_date: "2022-10-01",
        host: "",
        description: "",
        price: 0.00,
        activity_level: 1,
    })

    //UseEffect to update a specific post
    useEffect(() => {
        getSingleEvent(eventId).then(data => setUpdateEvent(data))
    }, 
        [eventId]
    )

    const [ eventUrlImage, setEventUrlImage ] = useState("")
    
    const updateEventUrlImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setEventUrlImage(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const updateEventState = (evt) => {
        const copyEventUpdate = {...updateEvent}
        copyEventUpdate[evt.target.name] = evt.target.value
        setUpdateEvent(copyEventUpdate)
    }

    return (
        <>
        <h2 className="updateEventForm__title">Update Event</h2>
            <form className="updateEventForm">
                <section className="update-event-container">
                    <div className="event-box">
            
                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Name of Event: </label>
                                    <input type="text" name="name" required autoFocus className="form-control"
                                    value={updateEvent.name}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Location: </label>
                                    <input type="text" name="location" required autoFocus className="form-control"
                                    value={updateEvent.location}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group-start_date-end_date">
                                <label>Date of Event: </label>
                                    <br></br>
                                    <br></br>
                                Start Date: <input type="date" name="start_date"
                                value={updateEvent.start_date}
                                onChange={updateEventState} />
                                    <br></br>
                                    <br></br>
                                End Date: <input type="date" name="end_date"
                                value={updateEvent.end_date}
                                onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Host's Name: </label>
                                    <input type="text" name="host" required autoFocus className="form-control"
                                    value={updateEvent.host}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Description: </label>
                                    <textarea name="description" className="form-control"
                                    value={updateEvent.description}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Total Price: </label>
                                    <input type="text" name="price" required autoFocus className="form-control"
                                    value={updateEvent.price}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label>Activity Level: </label>
                                    <input type="number" min="1" max="4" name="activity_level"
                                className="form-control"
                                    value={updateEvent.activity_level}
                                    onChange={updateEventState} />
                            </div>
                        </fieldset-update-event>

                        <fieldset-update-event>
                            <div className="form-group">
                                <label htmlFor="event_image_url">Upload Photo: </label>
                                    <input type="file" id="url_image" onChange={updateEventUrlImageString} />
                            </div>
                        </fieldset-update-event>
            
            <div className="field">
              <div className="control">
                <div className="event-buttons">
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()

                    const newEvent = {
                        name: updateEvent.name,
                        location: updateEvent.location,
                        start_date: updateEvent.start_date,
                        end_date: updateEvent.end_date,
                        host: updateEvent.host,
                        description: updateEvent.description,
                        price: updateEvent.price,
                        activity_level: updateEvent.activity_level,
                        event_image_url: eventUrlImage
                    }

                    // Send Post request to API
                    updateTheEvent(newEvent, eventId)
                        .then(()=> navigate('/events'))
                }}
                  className="save-button">Save Event</button>
                  <button className="cancel-event" onClick={() => navigate('/events')}>Cancel</button>
                  </div>
                </div>
                </div>
                </div>
            </section>
        </form>
        </>
    )
}