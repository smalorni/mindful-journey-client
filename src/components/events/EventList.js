import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllEvents, deleteEvent, attendEvent, leaveEvent } from "../../managers/EventManager"
import "./Event.css"


//Goal: A list of events can be viewed
export const EventList = () => {
    const [ currentEvents, setCurrentEvents ] = useState([])
    const navigate = useNavigate()

    //Fetch all events
    const fetchEvents = () => getAllEvents().then(data => setCurrentEvents(data))

    //Use effect
    useEffect(() => {
        fetchEvents() 
    }, 
    [])

    //map using initial state variable above
    return <>
        <h1>Discover the Perfect Retreat for You</h1>
        <button className="create-event-btn"
                onClick={() => navigate(`/events/new`)}>➕ New Event</button>
            <article className="events">
            
            {
                currentEvents.map(event => {
                    return <section key={`event--${event.id}`} className="events-list-container">
                        <div className="card">
                        <div div className="event__image-header">
                            <img src={`http://localhost:8000${event.event_image_url}`}width={250} height={250} alt={event.name} />
                        </div>
                        <div className="card-body">
                        <div className="event-list">
                        <h4>Name of Event</h4><p>{event.name}</p>
                        <h4>Location</h4><p>{event.location}</p>
                        <h4>Date of Event</h4><p>{event.readable_start_date} - {event.readable_end_date}</p>
                        <h4>Host's Name</h4><p>{event.host}</p>
                        <h4>Description</h4><p className="description">{event.description}</p>
                        <h4>Price</h4><p>${event.price}</p>
                        <h4>Activity Level</h4><p>{event.activity_level}</p>
                        </div>
                        </div>
                    
                        
                    <div className="edit_delete_buttons">
                    <button className="delete-event-btn" key={`delete--${event.id}`}
                        onClick={() => {const confirmBox = window.confirm("Are you sure you want to delete this event? This action cannot be undone.")
                            if(confirmBox === true) {
                            deleteEvent(event.id)
                            .then(()=>getAllEvents())
                            .then(setCurrentEvents)
                    }}}>❌</button>

                    <button onClick={() => navigate(`/events/update/${event.id}`)}>📝</button>
                    </div>

                    {
                        event.attending ? 
                        <button className="leave-event-btn" onClick= {() => {leaveEvent(event.id)
                            .then(()=> getAllEvents().then(setCurrentEvents))}}>Leave Event</button>
                         :
                        <button className="attend-event-btn" onClick= {() => {attendEvent(event.id)
                            .then(()=> getAllEvents().then(setCurrentEvents))}}>Attend Event</button>
                        
                        }
                        </div>
                </section>
                })}
        </article>
    </>
}