import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children} : {children: React.ReactNode}) {

    if(localStorage.getItem('jwt') === null){
        return <Navigate to="/signin" />
    }

    return (
        <>
            {children}
        </>
    )
};

