import { Outlet } from "react-router-dom";
import styles from './MovieView.module.css';

function MoviesView() {
  return (
    <div className={styles.appcontainer}>
      <Outlet />
    </div>
  );
}

export default MoviesView;
