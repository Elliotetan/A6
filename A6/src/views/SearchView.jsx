import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styleSearch from './SearchView.module.css';
import Header from '../components/Header';
import { useStoreContext } from '../context';

function SearchView() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const { cart, addToCart } = useStoreContext();

    useEffect(() => {
        const decoded = decodeURIComponent(id);
        const api = `https://api.themoviedb.org/3/search/movie?query=${decoded}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_KEY}`;

        const fetchMovies = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                setMovies(data.results.slice(0, 20));
            } catch (error) {
                setError('Failed to catch the bus to the Cinema');
                console.log("Failed to catch the bus to the Cinema");
            }
        };
        fetchMovies();
    }, [id]);

    return (
    <>
        <Header />
        <div className={styleSearch.movieDisplay}>
            <ul className={styleSearch.movieGrid}>
                {movies.map((movie) => (
                    <li key={movie.id} className={styleSearch.movieItem}>
                        <Link to={`/movies/${movie.id}`}>
                            <img
                                className={styleSearch.movies}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`Poster of ${movie.title}`}
                            />
                            <div className={styleSearch.movieTitle}>{movie.title}</div>
                        </Link>
                        <div className={styleSearch['button-container']}>
                            <div
                                onClick={() => addToCart(movie)}
                                className={styleSearch.buyButton}
                                style={cart.has(movie.id) ? { pointerEvents: 'none', opacity: 0.75, backgroundColor: '#26BA6B' } : {}}
                            >
                                {cart.has(movie.id) ? "Added" : "Buy"}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

}

export default SearchView;
