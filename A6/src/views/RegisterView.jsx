import styleR from "./RegisterView.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import { Map as ImmutableMap } from 'immutable';

function RegisterView() {
    const { 
      setEmail, 
      setFirstName, 
      setLastName, 
      setPassword, 
      setGenres 
    } = useStoreContext();

    const [password, setPasswordLocal] = useState('');
    const [repassword, setRepassword] = useState('');
    const [firstName, setFirstNameLocal] = useState('');
    const [lastName, setLastNameLocal] = useState('');
    const [email, setEmailLocal] = useState('');
    const [selectedGenres, setSelectedGenres] = useState(new Map());

    const navigate = useNavigate();

    const availableGenres = [
        { id: "28", name: "Action" },
        { id: "12", name: "Adventure" },
        { id: "16", name: "Animation" },
        { id: "80", name: "Crime" },
        { id: "35", name: "Comedy" },
        { id: "27", name: "Horror" },
        { id: "36", name: "History" },
        { id: "14", name: "Fantasy" },
        { id: "53", name: "Thriller" },
        { id: "37", name: "Western" },
        { id: "10751", name: "Family" },
        { id: "10402", name: "Music" },
        { id: "10752", name: "War" },
        { id: "9648", name: "Mystery" },
        { id: "878", name: "Sci-Fi" }
    ];

    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        const genreName = event.target.dataset.name;

        setSelectedGenres(prev => {
            const newGenres = new Map(prev);
            if (newGenres.has(genreId)) {
                newGenres.delete(genreId);
            } else {
                newGenres.set(genreId, genreName);
            }
            return newGenres;
        });
    };

    function registration(e) {
        e.preventDefault();

        if (password !== repassword) {
            alert("Incorrect Password");
            return;
        }

        if (selectedGenres.size < 5) {
            alert("Please select at least 5 genres!");
            return;
        }

        // Set context values using correct functions
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPassword(password);
        setGenres(ImmutableMap(selectedGenres));

        navigate('/movies/genre');
    }

    return (
        <div className={styleR.body}>
            <div className={styleR.genreSelectContainer}>
                <h2 className={styleR.genreh2}>Select 5 Genres!</h2>
                {availableGenres.map((genre) => (
                    <div key={genre.id}>
                        <input
                            className={styleR.checkbox}
                            type="checkbox"
                            id={genre.id}
                            value={genre.id}
                            data-name={genre.name}
                            checked={selectedGenres.has(genre.id)}
                            onChange={handleGenreChange}
                        />
                        <label className={styleR.genreLabel} htmlFor={genre.id}>{genre.name}</label><br />
                    </div>
                ))}
            </div>

            <div className={styleR.registerBox}>
                <form onSubmit={registration}>
                    <h1 className={styleR.registerTitle}>Register An Account!</h1>
                    <div className={styleR.registerInputContainer}>
                        <h2>First Name:</h2>
                        <input type="text" value={firstName} onChange={(e) => setFirstNameLocal(e.target.value)} required />
                        <h2>Last Name:</h2>
                        <input type="text" value={lastName} onChange={(e) => setLastNameLocal(e.target.value)} required />
                        <h2>Email:</h2>
                        <input type="email" value={email} onChange={(e) => setEmailLocal(e.target.value)} required />
                        <h2>Password:</h2>
                        <input type="password" value={password} onChange={(e) => setPasswordLocal(e.target.value)} required />
                        <h2>Re-enter Password:</h2>
                        <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
                        <button type="submit" className={styleR.registerButton}>Enter</button>
                        <p className={styleR.loginHyperlink}>
                          Already have an account? <a href="/login">Login here!</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterView;
