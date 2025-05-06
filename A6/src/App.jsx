import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from './context';
import './App.css';

import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ErrorView from './views/ErrorView';
import MovieView from './views/MovieView';
import GenreView from './views/GenreView';
import DetailView from './views/DetailView';
import SettingsView from './views/SettingsView';
import CartView from './views/CartView';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/cart" element={<CartView />} />
          
          <Route path="/movies" element={<MovieView />}>
            <Route path="genre" element={<GenreView />} />
            <Route path=":id" element={<DetailView />} />
          </Route>

          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
