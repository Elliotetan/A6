import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styleSB from './SearchBar.module.css';

function SearchBar() {
    const [query, setQuery] = useState("");
    const [movieList, movieSetter] = useState([]);
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    const debounceRef = useRef();

    // Define a stable version of the debounced function
    const handleSearch = useCallback(async (searchQuery) => {
        if (!searchQuery) return;

        const cleanedSearch = searchQuery
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .split(" ")
            .filter(word => word.length > 0)
            .join("%20");

        const searchLink = `https://api.themoviedb.org/3/search/movie?query=${cleanedSearch}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

        try {
            const response = await fetch(searchLink);
            const data = await response.json();
            movieSetter(data.results.slice(0, 4));
        } catch (error) {
            console.log("Failed to catch the bus to the Cinema");
        }
    }, [apiKey]);

    // Debounced input handler
    const handleInput = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            handleSearch(value);
        }, 400);
    };

    const navigateSearch = (e) => {
        e.preventDefault();

        const cleaned = query
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .split(" ")
            .filter(word => word.length > 0)
            .join("%20");

        if (cleaned.length > 0) {
            navigate(`/movies/search/${cleaned}`);
        }
    };

    return (
        <div className={styleSB.hero}>
            <div className={styleSB.heroInput}>
                <form onSubmit={navigateSearch}>
                    <input
                        type="text"
                        placeholder="Search Films. . ."
                        onInput={handleInput}
                        required
                    />
                    <button className={styleSB.searchButton} type='submit'>Search</button>
                </form>
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
}

export default SearchBar;
