import { Navigate, Outlet } from "react-router-dom"

//changed token name
export const Authorized = () => {
  if (localStorage.getItem("meditator_token")) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}