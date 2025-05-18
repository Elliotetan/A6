import styleSV from './SettingsView.module.css';
import { useStoreContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

function SettingsView() {
    const { email, firstName, setFirstName, lastName, setLastName, genres, setGenres } = useStoreContext();
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [selectedGenres, setSelectedGenres] = useState(new Map());
    const navigate = useNavigate();

    useEffect(() => {
        const initGenres = new Map();
        genres.forEach((value, key) => {
            initGenres.set(key, value);
        });
        setSelectedGenres(initGenres);
    }, [genres]);

    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        const genreName = event.target.name;

        const updatedSelectedGenres = new Map(selectedGenres);

        if (event.target.checked) {
            updatedSelectedGenres.set(genreId, genreName);
        } else {
            updatedSelectedGenres.delete(genreId);
        }

        setSelectedGenres(updatedSelectedGenres);
    };

    const handleSaveChanges = () => {
        setFirstName(newFirstName);
        setLastName(newLastName);
        setGenres(selectedGenres);
        navigate('/movies/genre');
    }

    return (
        <div className={styleSV.container}>
            <h1 className={styleSV.welcomeInfo}>Welcome {firstName} {lastName}</h1>
            <h2 className={styleSV.email}>Email: {email}</h2>
            <div className={styleSV.nameContainer}>
                <div className={styleSV.nameChangeContainer}>
                    <label>Change First Name:</label>
                    <input
                        type="text"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        placeholder={firstName}
                    />
                </div>

                <div className={styleSV.nameChangeContainer}>
                    <label>Change Last Name:</label>
                    <input
                        type="text"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                        placeholder={lastName}
                    />
                </div>
            </div>

            <div className={styleSV.genresContainer}>
                <h3>Select Genres</h3>
                <div className={styleSV.checkboxContainer}>
                    {availableGenres.map((genre) => (
                        <div key={genre.id}>
                            <input
                                type="checkbox"
                                id={genre.name}
                                name={genre.name}
                                value={genre.id}
                                checked={selectedGenres.has(genre.id)}
                                onChange={handleGenreChange}
                            />
                            <label className={styleSV.genreLabel} htmlFor={genre.name}>{genre.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button className={styleSV.saveButton} onClick={handleSaveChanges}>
                Save Changes
            </button>

        </div>
    );



}

export default SettingsView;