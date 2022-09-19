import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostList } from "../components/posts/PostList"
import { UpdatePost } from "../components/posts/UpdatePost"
import { NewPost } from "../components/posts/NewPost"
import { EventList } from "../components/events/EventList"
import { NewEvent } from "../components/events/NewEvent"
import { UpdateEvent } from "../components/events/UpdateEvent"
import { NewComment } from "../components/postcomments/NewComment"
import { HomePage } from "../components/home/Homepage"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route element={ <Authorized />} />

            <Route path="/home" element={ <HomePage />} />
            
            <Route path="/posts" element={ <PostList />} />
            <Route path="/posts/update/:postId" element={ <UpdatePost />} />
            <Route path="/posts/new" element={ <NewPost />} />
            <Route path="/events" element={ <EventList />} />
            <Route path="/events/new" element={ <NewEvent />} />
            <Route path="/events/update/:eventId" element={ <UpdateEvent />} />

            <Route path="/posts/:postId/add/postComment" element={ <NewComment />} />
            
        </Routes>
    )
}