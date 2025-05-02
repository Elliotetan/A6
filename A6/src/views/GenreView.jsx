import styleGV from './GenreView.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenrePanel from '../components/GenrePanel';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function GenreView() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedGenreId, setSelectedGenreId] = useState(28);
    const altMovie = 'https://img.freepik.com/premium-psd/action-movie-poster_1117895-516.jpg?w=740';

    const genre = [
        { genre: "Action", id: 28 },
        { genre: "Adventure", id: 12 },
        { genre: "Animation", id: 16 },
        { genre: "Crime", id: 80 },
        { genre: "Family", id: 10751 },
        { genre: "Fantasy", id: 14 },
        { genre: "History", id: 36 },
        { genre: "Mystery", id: 9648 },
        { genre: "Sci-Fi", id: 878 },
        { genre: "Western", id: 37 }
    ];

    const fetchMovies = async (page, genreId) => {
        const api = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genreId}&page=${page}`;
        const response = await axios.get(api);
        setMovies(response.data.results);
    };

    useEffect(() => {
        fetchMovies(page, selectedGenreId);
    }, [page, selectedGenreId]);

    const handleClick = (genreId) => {
        setSelectedGenreId(genreId);
        setPage(1); // Reset to page 1 whenever a new genre is selected
    };

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
            <div className={styleGV.mainSection}>
                <div className={styleGV.genrePanel}>
                    <GenrePanel genreList={genre} genreClick={handleClick} />
                    <div className={styleGV.paginationContainer}>
                        <p className={styleGV.pageNumber}>Page {page}</p>
                        <div className={styleGV.pageTurning}>
                            <button onClick={handlePrevPage} className={styleGV.pageButton}>Last Page</button>
                            <button onClick={handleNextPage} className={styleGV.pageButton}>Next Page</button>
                        </div>
                    </div>
                </div>
                <div className={styleGV.movieDisplay}>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={'/movies/' + movie.id}>
                                <img className={styleGV.movies} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={altMovie} />
                                <div className={styleGV.movieTitle}>{movie.title}</div>
                            </Link>
                        </li>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GenreView;
