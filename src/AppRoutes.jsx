import { useState, useContext } from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"

import { AuthProvider, AuthContext } from "./contexts/auth"
import Register from "./pages/RegisterPage"


const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/register" />
        }
        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Private><HomePage /></Private>} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes