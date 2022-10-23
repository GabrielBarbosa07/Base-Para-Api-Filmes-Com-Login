import React, { useContext } from 'react';

import { AuthContext } from "../../contexts/auth"

function HomePage() {
    const {authenticated ,logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <h1>Home Page para usuario logado</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HomePage;