import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
interface CH{
    children:ReactNode
}
const PrivateRoutes:React.FC<CH> = ({children}) => {
    const auth=localStorage.getItem("LoggedInUser");
    if(!auth){
        return <Navigate to="/Login" replace/>
    }
  return <>{children}</>
}
export default PrivateRoutes;

