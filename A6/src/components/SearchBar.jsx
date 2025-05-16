import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styleSB from './SearchBar.module.css';

function SearchBar() {
    const [movieList, movieSetter] = useState([]);
    const apiKey = import.meta.env.VITE_TMDB_KEY;

    function debounce(func, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    const handleSearch = debounce(async (query) => {
        if (!query) return;

        const cleanedSearch = query
            .replace(/[^a-zA-Z0-9 ]/g, "") // remove all but letters, numbers, spaces
            .trim()
            .split(" ")
            .filter(word => word.length > 0)
            .join("%20");

        const searchLink = `https://api.themoviedb.org/3/search/movie?query=${cleanedSearch}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

        console.log(searchLink);

        try {
            const response = await fetch(searchLink);
            const data = await response.json();
            movieSetter(data.results.slice(0, 4)); // Adjust as needed
        } catch (error) {
            console.log("Failed to catch the bus to the Cinema");
        }
    }, 1000);

    const handleInput = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    // const navigateSearch = useNavigate(`/`);
    // const navigateSearch = useNavigate(`/movies/`);
    // Add navigate to searchView

    return (
        <div className={styleSB.hero}>
            <div className={styleSB.heroInput}>
                {/* <form onSubmit={navigateSearch}> */}
                <input
                    type="text"
                    placeholder="Search Films. . ."
                    onInput={handleInput}
                    required
                />
                <button className={styleSB.searchButton} type="button">Search</button>
                {/* </form> */}
            </div>

            <ul className={styleSB.searchResults}>
                {movieList.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>
                            <div className={styleSB.movieTitle}>{movie.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
