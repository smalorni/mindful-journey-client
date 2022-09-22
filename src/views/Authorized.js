import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"

//changed token name
export const Authorized = () => {
  if (localStorage.getItem("meditator_token")) {
    return <> <NavBar /> <Outlet /> </>
  }
  return <Navigate to='/login' replace />
}