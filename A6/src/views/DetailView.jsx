import styleDV from './DetailView.module.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DetailView() {
    const [movie, setMovie] = useState(null); // Initializing with null
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`;

    useEffect(() => {
        async function getMovie() {
            const response = await axios.get(
                api
            );
            setMovie(response.data);
        }

        getMovie();
    }, [id]); // Dependency on id to trigger the effect when the movie id changes

    // Early return if the movie data is not loaded
    if (!movie) {
        return <div>Loading...</div>;
    }

    const duration = movie.runtime;
    const hours = Math.floor(duration / 60) || 0;
    const minutes = duration % 60 || 0;

    const movieBudget = movie.budget ? movie.budget.toLocaleString() : 'N/A';
    const movieRevenue = movie.revenue ? movie.revenue.toLocaleString() : 'N/A'; // Fixed typo here
    const originalLanguage = movie.original_language ? movie.original_language.toUpperCase() : 'N/A';
    const movieTitle = movie.original_title || 'Untitled Movie'; // Ensure movieTitle is assigned properly

    return (
        <div className={styleDV.body}>
            <Header />
            <div className={styleDV.viewContainer}>
                <div className={styleDV.detailheader}>
                    <h2 className={styleDV.movieTitle}>{movieTitle}</h2>
                    <p className={styleDV.infoHeader}>
                        <span>{isNaN(hours) ? "0" : hours}hr {isNaN(minutes) ? "0" : minutes}min</span>
                        <span>{movie.release_date || 'Unknown release date'}</span>
                        <span>{originalLanguage}</span>
                    </p>

                </div>
                <div className={styleDV.posterSection}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title || 'Movie Poster'}
                    />
                    <div className={styleDV.overviewBox}>
                        <p className={styleDV.aboutInfo}>{movie.overview || 'No overview available'}</p>
                        <p className={styleDV.smallDetail}>
                            <span className={styleDV.budgetRevenueContainer}>
                                Budget: ${movieBudget}
                                <span></span>
                                Revenue: ${movieRevenue}
                                <span></span>
                                <a href={movie.homepage || '#'} target="_blank" rel="noopener noreferrer">
                                    Website
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
                <div className={styleDV.trailerView}>
                    <h3 className={styleDV.trailerText}>Trailers</h3>
                    <div className={styleDV.trailerGrid}>
                        {movie.videos && movie.videos.results.map((trailer) => (
                            <div key={trailer.id} className={styleDV.trailerTile}>
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className={styleDV.trailerThumbnail}
                                        src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                                        alt={trailer.name}
                                    />
                                    <h4>{trailer.name}</h4>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default DetailView;
