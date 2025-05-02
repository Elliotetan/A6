import styleR from "./RegisterView.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterView() {
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const navigate = useNavigate();

    function passCheck(e) {
        e.preventDefault();
        if (password === repassword) {
            navigate('/movies/genre');
        } else {
            alert("Incorrect Password");
        }
    }

    return (
        <div className={styleR.body}>
            <form onSubmit={passCheck}>
                <h1 className={styleR.registerTitle}>Register An Account!</h1>
                <div className={styleR.registerInputContainer}>
                    <h2>First Name:</h2>
                    <input type="text" required />
                    <h2>Last Name:</h2>
                    <input type="text" required />
                    <h2>Email:</h2>
                    <input type="text" required />
                    <h2>Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <h2>Re-enter Password:</h2>
                    <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
                    <button type="submit" className={styleR.registerButton}>Enter</button>
                    <p className={styleR.loginHyperlink}>Already have an account? <a href="/login">Login here!</a></p>
                </div>
            </form>
        </div>
    );
}

export default RegisterView;