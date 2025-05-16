import styleCV from './CartView.module.css';
import { useStoreContext } from "../context";
import { Link } from "react-router-dom";
import Header from '../components/Header';

function CartView() {
    const { cart, setCart, firstName } = useStoreContext();

    return (
        <>
            <Header />
            <h1 className={styleCV.header}>{firstName}'s Cart</h1>
            <div className={styleCV.cartItems}>
                {
                    cart.entrySeq().map(([key, movie]) => {
                        return (
                            <div className={styleCV.cartItem} key={key}>

                                <Link to={`/movies/` + movie.id} className={styleCV.linkWrapper}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className={styleCV.poster}
                                    />
                                    <h2 className={styleCV.itemName}>{movie.title}</h2>
                                    <p className={styleCV.info}>{movie.overview}</p>
                                </Link>
                                <button className={styleCV.removeButton} onClick={() => setCart(prevCart => prevCart.delete(key))}>
                                    Remove
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default CartView;