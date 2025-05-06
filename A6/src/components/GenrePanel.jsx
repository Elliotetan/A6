import styleGP from './GenrePanel.module.css';

function GenrePanel({ genreList, genreClick }) {
    return (
        <div className={styleGP.panelContainer}>
            <ul>
                {genreList.map((genre) => (
                    <li key={genre.id} onClick={() => genreClick(genre.id)}>
                        {genre.genre}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenrePanel;
