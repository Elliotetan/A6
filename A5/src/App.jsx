import { useState } from 'react'
// import AxiosEg from './components/AxiosExample'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ErrorView from './views/ErrorView';
import MovieView from './views/MovieView';
import GenreView from './views/GenreView';
import DetailView from './views/DetailView';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="*" element={<ErrorView />} />
        <Route path="/movies" element={<MovieView />}>
          <Route path="genre" element={<GenreView />} />
          <Route path=":id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

  //   <div className='page'>
  //   <Header />
  //   <Hero />
  //   </div>

  // <AxiosEg />

  // const [count, setCount] = useState(0)
  // console.log(import.meta.env.VITE_TMDB_KEY);

  // return (
  //   <div>
  //   </div>
  // )
}

export default App
