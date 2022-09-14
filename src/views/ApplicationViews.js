import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostList } from "../components/posts/PostList"
import { UpdatePost } from "../components/posts/UpdatePost"
import { NewPost } from "../components/posts/NewPost"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route element={ <Authorized />} />
            
            <Route path="/posts" element={ <PostList />} />
            <Route path="/posts/update/:postId" element={ <UpdatePost />} />
            <Route path="/posts/new" element={ <NewPost />} />
        </Routes>
    )
}