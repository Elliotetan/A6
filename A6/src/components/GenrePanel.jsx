import styleGP from './GenrePanel.module.css';

function GenrePanel({ genreList, genreClick }) {
    return (
        <div className={styleGP.panelContainer}>
            {genreList.map((genre) => (
                <li key={genre.id} onClick={() => genreClick(genre.id)}>{genre.genre}</li>
            ))}
        </div>
    )
}

export default GenrePanel;