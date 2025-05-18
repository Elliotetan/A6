import styleGV from './GenreView.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenrePanel from '../components/GenrePanel';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStoreContext } from '../context';

function GenreView() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedGenreId, setSelectedGenreId] = useState(28);
    const { cart, firstName, addToCart, genres } = useStoreContext();

    // Convert genres Map to an array of objects
    const genreList = Array.from(genres.entries()).map(([id, genre]) => ({
        id,
        genre,
    }));

    // Function to add movie to cart
    const cartAdd = (movie) => {
        if (cart.has(movie.id)) {
            alert("Movie has already been added");
        } else {
            addToCart(movie);
        }
    };

    // Function to fetch movies from the API
    const fetchMovies = async (page, genreId) => {
        const api = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genreId}&page=${page}`;
        const response = await axios.get(api);
        setMovies(response.data.results);
    };

    // Fetch movies when page or genre changes
    useEffect(() => {
        fetchMovies(page, selectedGenreId);
    }, [page, selectedGenreId]);

    // Function to handle genre selection
    const handleClick = (genreId) => {
        setSelectedGenreId(genreId);
        setPage(1); // Reset to page 1 whenever a new genre is selected
    };

    // Pagination handlers
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        <>
            <Header />
            <div className={styleGV.welcome}>Welcome {firstName}</div>
            <div className={styleGV.mainSection}>
                <div className={styleGV.genrePanel}>
                    <GenrePanel className = {styleGV.genreList} genreList={genreList} genreClick={handleClick} />
                    <div className={styleGV.paginationContainer}>
                        <p className={styleGV.pageNumber}>Page {page}</p>
                        <div className={styleGV.pageTurning}>
                            <button onClick={handlePrevPage} className={styleGV.pageButton}>Last Page</button>
                            <button onClick={handleNextPage} className={styleGV.pageButton}>Next Page</button>
                        </div>
                    </div>
                </div>
                <div className={styleGV.movieDisplay}>
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <Link to={'/movies/' + movie.id}>
                                    <img className={styleGV.movies} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <div className={styleGV.movieTitle}>{movie.title}</div>
                                </Link>
                                <div className={styleGV['button-container']}>
                                    <div onClick={() => cartAdd(movie)} className={styleGV.buyButton}>
                                        {cart.has(movie.id) ? "Added" : "Buy"}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GenreView;
