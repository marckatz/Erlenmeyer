import React, { useContext } from "react";
import { UserContext } from "../context/user";

function Home(){
    const {user} = useContext(UserContext)

    return (
        <div>
            {user ? (
                'Logged In'
            ) : (
                'Not Logged In'
            )}
        </div>
    )
}

export default Home