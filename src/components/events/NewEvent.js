import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { createEvent } from "../../managers/EventManager"
import "./NewEvent.css"

export const NewEvent = () => {
    const navigate = useNavigate()

    const [ currentEvent, setCurrentEvent ] = useState({
        name: "",
        location: "",
        start_date: "2022-09-13",
        end_date: "2022-10-01",
        host: "",
        description: "",
        price: 0.00,
        activity_level: 1,
    })

    const [ eventUrlImage, setEventUrlImage ] = useState("")
    
    const createEventUrlImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
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
        <>

        <h2 className="newEventForm__title">New Event</h2>
            <form className="newEventForm">
                <section className="new-event-container">
                    <div className="event-box">
            
                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Name of Event </label>
                                    <input type="text" name="name" required autoFocus className="form-control"
                                    value={currentEvent.name}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Location </label>
                                    <input type="text" name="location" required autoFocus className="form-control"
                                    value={currentEvent.location}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group-start_date-end_date">
                                <label className="date-event">Date of Event: </label>
                                    <br></br> 
                                    <br></br>
                                Start Date <input type="date" name="start_date"
                                value={currentEvent.start_date}
                                onChange={changeEventState} />
                                    <br></br>
                                    <br></br>
                                End Date <input type="date" name="end_date"
                                value={currentEvent.end_date}
                                onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Host's Name</label>
                                    <input type="text" name="host" required autoFocus className="form-control"
                                    value={currentEvent.host}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Description </label>
                                    <textarea name="description" className="form-control" placeholder="Enter details of your event"
                                    value={currentEvent.description}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Total Price </label>
                                    <input type="text" name="price" placeholder="0.00" className="form-control"
                                    value={currentEvent.price}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label>Activity Level </label>
                                    <input type="number" min="1" max="4" name="activity_level" required autoFocus className="form-control"
                                    value={currentEvent.activity_level}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset-new-event>

                        <fieldset-new-event>
                            <div className="form-group">
                                <label htmlFor="event_image_url">Upload Photo </label>
                                    <input type="file" id="url_image" onChange={createEventUrlImageString} />  
                            </div>
                        </fieldset-new-event>

            <div className="field">
              <div className="control">
                <div className="event-buttons">
                <button type="submit"
                  onClick={evt => {
                    evt.preventDefault()

                    const newEvent = {
                        name: currentEvent.name,
                        location: currentEvent.location,
                        start_date: currentEvent.start_date,
                        end_date: currentEvent.end_date,
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
                  className="save-button">Post Event</button>
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