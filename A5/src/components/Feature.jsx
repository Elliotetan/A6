import styleF from './Feature.module.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Feature() {
    const [movieList, movieSetter] = useState([]);
    const randmovie = Math.floor(Math.random() * 7);
    const randomPage = Math.floor(Math.random() * 100);
    const altMovie = 'https://as2.ftcdn.net/v2/jpg/02/12/52/91/1000_F_212529193_YRhcQCaJB9ugv5dFzqK25Uo9Ivm7B9Ca.jpg';
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    const api = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${randomPage}`;
    // The Monkey was on page 2 at the very bottom, last checked

    useEffect(() => {
        const fetchur = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                movieSetter(data.results.slice(randmovie, randmovie + 12));
            } catch (error) {
                setError('Failed to catch the bus to the Cinema');
                console.log("Failed to catch the bus to the Cinema")
            }
        };
        fetchur();
    }, [])

    return (
        <div className={styleF.movieDisplayWrap}>
            <div className={styleF.movieDisplayText}>Now Playing:</div>
            <div className={styleF.movieDisplay}>
                {movieList.map((movie) => {
                    const movieImg = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://img.freepik.com/premium-psd/action-movie-poster_1117895-516.jpg?w=740';
                    return (
                        <li>
                            <Link to={'/movies/' + movie.id}>
                                <img className={styleF.movies} src={movieImg} alt={altMovie} />
                                <div className={styleF.movieTitle}>{movie.title}</div>
                            </Link>
                        </li>
                    )
                })}
            </div>
        </div >
    )
    /* Something about MovieTileView */
}

export default Feature;