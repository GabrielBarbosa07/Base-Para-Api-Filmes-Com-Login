import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

function generateID(users) {
    if (users.length === 0) {
        return 1;
    }

    const lastUser = users.at(-1);
    return lastUser.id + 1;
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false)

    }, [])

    const register = (userName, email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) ?? [];

        users.push({
            id: generateID(users),
            userName,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        login(email, password);
    };

    const login = (email, password) => {
        console.log("Login", { email, password });
        const users = JSON.parse(localStorage.getItem("users"));

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            console.log("senha ou email inválidos");
        } else {
            const loggedUser = {
                id: user.id,
                userName: user.userName,
                email,
                password,
            }

            setUser(loggedUser)
            navigate("/")
        }
    }

    const logout = () => {
        console.log("Logout");
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}