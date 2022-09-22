import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Register.css"


export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

            const newUser = {
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                username: username.current.value,
                password: password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("meditator_token", res.token)
                        localStorage.setItem('user_id', res.user_id)
                        navigate("/login")
                    }
                })
     }

    return (
        <main className="container-register">

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

        <div className="register-container">
            <form className="form--login" onSubmit={handleRegister}>
                <img className="solo-logo" src={process.env.PUBLIC_URL + "/Images/Solo Logo-cropped.png"} alt="mindful-journey-logo"/>
                <h1 className="register-title">Create Account</h1>
                <div className="inside-register-container"></div>
                    <fieldset className="reg-fieldset">
                        <label htmlFor="firstName"> First Name </label>
                        <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
                    </fieldset>

                    <fieldset className="reg-fieldset">
                        <label htmlFor="lastName"> Last Name </label>
                        <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" required />
                    </fieldset>

                    <fieldset className="reg-fieldset">
                        <label htmlFor="email"> Email </label>
                        <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                    </fieldset>

                    <fieldset className="reg-fieldset">
                        <label htmlFor="username"> Username </label>
                        <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                    </fieldset>

                    <fieldset className="reg-fieldset">
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                    </fieldset>

                    <fieldset className="reg-fieldset">
                        <button className="submit-btn" type="submit">Sign Up</button>
                    </fieldset> 
            </form>
        </div>
            
            <div className="login-account">
                <p>Already have an account?</p>
                <Link className="login" to="/login">Log in</Link>
            </div>
        </main>
    )
}
