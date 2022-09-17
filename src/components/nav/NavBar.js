import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div class="nav-container">
                <ul className="navbar">
                    <li className="navbar__item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/events">Events</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/posts">Posts</Link>
                    </li>
        
            {
                (localStorage.getItem("meditator_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }   </ul>
        </div>
    )
}
