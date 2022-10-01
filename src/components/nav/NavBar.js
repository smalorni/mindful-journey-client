import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav class="navbar">
            <img className="logo" src={process.env.PUBLIC_URL + "/Images/Journey-Logo.png"} alt="mindful-journey-logo"/>
                <ul className="all_nav_links">
                    <li className="navbar__items">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/events">Events</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
            {
                (localStorage.getItem("meditator_token") !== null) ?
                    <li className="nav-item">
                        <button className="log-out-btn"
                            onClick={() => {
                                localStorage.removeItem("meditator_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    
                        </>
            
            }  
            </li>
        </ul> 
           
    </nav>
    )
}
