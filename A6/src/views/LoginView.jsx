import styleL from "./LoginView.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginView() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        if (password === "YouLikeJazz") {
            navigate('/movies/genre');
        } else {
            alert("Incorrect Password");
        }
    }

    return (
        <div className={styleL.body}>
            <h1 className={styleL.loginTitle}>Login To Your Account</h1>
            <div className={styleL.loginInputContainer}>
                <form onSubmit={login}>
                    <h2>Enter Email:</h2>
                    <input type="text" required />
                    <h2>Enter Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className={styleL.loginButton}>Enter</button>
                </form>
                <p className={styleL.registerHyperlink}>Need an account? <a href="/register">Register here!</a></p>
            </div>
        </div>
    );
}

export default LoginView;
