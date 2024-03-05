import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
interface CH{
    children:ReactNode
}
 const PublicRoutes:React.FC<CH> = ({children}) => {
       const auth=localStorage.getItem("LoggedInUser");
       if(auth){
        return <Navigate to="/" />
       }
    return <>{children}</>;
}
export default PublicRoutes;

