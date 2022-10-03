import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllEvents, deleteEvent, attendEvent, leaveEvent, getSearchEvents } from "../../managers/EventManager"
import "./Event.css"
//Material UI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';


//Goal: A list of events can be viewed
export const EventList = () => {
    const [ currentEvents, setCurrentEvents ] = useState([]);
    const navigate = useNavigate();
    //Filter search by location, description
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ filteredEvents, setFilteredEvents ] = useState([])

    //Fetch all events
    const fetchEvents = () => getAllEvents().then(data => setCurrentEvents(data))

    //Use effect
    useEffect(() => {
        fetchEvents()
    }, 
    [])

    //Use effect for search-filter
    useEffect(
        () => {
            if (searchTerm !== "") {
                getSearchEvents(searchTerm).then(data => setFilteredEvents(data))
            }
            else {
                setFilteredEvents(currentEvents)
            }
        },
        [currentEvents, searchTerm]
    )

    //map using initial state variable above
    return <>
        <h1 className="event-title">Discover the Perfect Retreat for You</h1>
        <button className="create-event-btn"
                onClick={() => navigate(`/events/new`)}><AddIcon/>New Event</button>

            <div>
                <input className="search-input" 
                type="text"
                placeholder="Search Events"
                onChange={
                    (changeEvent) => {
                        let search = changeEvent.target.value
                        setSearchTerm(search)
                    }   
                }
                />
            </div>
            


            <article className="events">
            
            {
                filteredEvents.map(event => {
                    return <section key={`event--${event.id}`} className="events-list-container">
                        <div className="card">
                        <div div className="event__image-header">
                            <img className="event-image" src={`http://localhost:8000${event.event_image_url}`} alt={event.name} />
                        </div>
                        
                        <div className="event-list">
                        <h4>Name of Event</h4><p>{event.name}</p>
                        <h4>Location</h4><p>{event.location}</p>
                        <h4>Date of Event</h4><p>{event.readable_start_date} - {event.readable_end_date}</p>
                        <h4>Host's Name</h4><p>{event.host}</p>
                        <h4>Description</h4><p className="description">{event.description}</p>
                        <h4>Price</h4><p>${event.price}</p>
                        <div className="level-image">
                        <img className="vertical-level-crop" src={process.env.PUBLIC_URL + "/Images/vertical-level-crop.png"} alt ="activity-level-gauge" />
                        <h4>Activity Level</h4><p>{event.activity_level}</p></div>
                        </div>
                    
                    
                    {/* Attending/Not Attending Buttons */}
                    {
                        event.attending ? 
                        <button className="leave-event-btn" onClick= {() => {leaveEvent(event.id)
                            .then(()=> getAllEvents().then(setCurrentEvents))}}><HighlightOffIcon/>Not Attending Event</button>
                         :
                        <button className="attend-event-btn" onClick= {() => {attendEvent(event.id)
                            .then(()=> getAllEvents().then(setCurrentEvents))}}><CheckCircleIcon/>Attending Event</button>
                        
                        }

                    {/* local storage access to certain buttons */}
                    
                    {parseInt(localStorage.getItem('user_id')) === event.meditator ?
                    <>
                    <button className="edit-icon" onClick={() => navigate(`/events/update/${event.id}`)}><EditIcon/></button>

                    <button className="delete-event-btn" key={`delete--${event.id}`}
                        onClick={() => {const confirmBox = window.confirm("Delete this event? This action can't be undone.")
                            if(confirmBox === true) {
                            deleteEvent(event.id)
                            .then(()=>getAllEvents())
                            .then(setCurrentEvents)
                            }}}><DeleteIcon/></button>

                        </>
                        : 
                        ""
                    }

                    </div>
                </section>
                })}
        </article>
    </>
}