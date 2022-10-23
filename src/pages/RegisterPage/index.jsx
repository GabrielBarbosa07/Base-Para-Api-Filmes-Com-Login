import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Register() {
    const { register } = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Cê errou aí, dá uma olhada, manin");
        } else {
            register(userName, email, password);
        }
    };

    return (
        <>
            <input type="text"
                placeholder="Nome do pai"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} />
            <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <input type="password"
                placeholder="Confirme sua senha!"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />

            <button
                onClick={handleRegister}
            >Registrar</button>
        </>
    )
}