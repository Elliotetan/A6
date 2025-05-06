import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
    const Navigate = useNavigate();

    return (
        <div className="top">
            <div className="logo">
                <h2 className="title">10//10 Films</h2>
            </div>
            <div className="menu">
                {/* <ul className="options">
                    <li><a href="/movies/genre">Movies</a></li>
                    <li><a href="/movies/genre">TV Series</a></li>
                    <li><a href="/movies/genre">Most Popular</a></li>
                </ul> */}

                {/*  https://developer.themoviedb.org/reference/movie-top-rated-list
                Postman that sheet*/}
                {/* https://api.themoviedb.org/3/movie/top_rated?api_key=import.meta.env.VITE_TMDB_KEY*/}
                {/* https://api.themoviedb.org/3/movie/popular?api_key=import.meta.env.VITE_TMDB_KEY */}
            </div>
            <div className="login">
                <button className="loginButton" onClick={() => Navigate('/login')}>Login</button>
                <button className="registerButton" onClick={() => Navigate('/register')}>Register</button>
            </div>
        </div>
    )
}

export default Header;