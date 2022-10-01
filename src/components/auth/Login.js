import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Login.css"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("meditator_token", res.token)
                    localStorage.setItem('user_id', res.user_id)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (

        <main className="container--login">
            
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>


            <div className="first-container">
                <form className="form--login" onSubmit={handleLogin}>
                <img className="solo-logo" src={process.env.PUBLIC_URL + "/Images/Solo Logo-cropped.png"} alt="mindful-journey-logo"/>
                    <h2 className="sign-in-title">Welcome Back Meditator</h2>
                    <p className="login-title">Please enter your username and password</p>
                    <div className="inside-container">
                    <fieldset-login>
                        
                        <label htmlFor="inputUsername">Username</label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
        
                    </fieldset-login>
                    <fieldset-login>

                       <label htmlFor="inputPassword">Password</label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />

                    </fieldset-login>
                    </div>
                    
                    <fieldset-login style={{
                        textAlign: "center"
                    }}>
                        <button className="submit-btn" type="submit">Log In</button>
                    </fieldset-login>
                </form>
            </div>
                    <div className="reg-account">
                        <p>Don't have an account yet?</p>
                    <Link className="register" to="/register"> Join Mindful Journey</Link>
                    </div>
        </main>
    )
}
