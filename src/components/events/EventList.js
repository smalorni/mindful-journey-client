import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllEvents, deleteEvent, attendEvent, leaveEvent } from "../../managers/EventManager"


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
    return (
        <article className="events">
            <button className="create-event-btn"
                onClick={() => navigate(`/events/new`)}>Create New Event</button>
            {
                currentEvents.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div div className="event__image">
                            <img src={`http://localhost:8000${event.event_image_url}`}width={250} height={250} alt={event.name} />
                        </div>
                        <div className="event__name">Name of Event: {event.name}</div>
                        <div className="event__location">Location: {event.location}</div>
                        <div className="event__date">Date of Event: {event.readable_start_date} - {event.readable_end_date}</div>
                        <div className="event__host">Host: {event.host}</div>
                        <div className="event__description">Description: {event.description}</div>
                        <div className="event__price">Price: ${event.price}</div>
                        <div className="event__activity_level">Activity Level: {event.activity_level}</div>
                        
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
                </section>
                })}
        </article>
    )
}