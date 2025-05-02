import { Link } from "react-router-dom";
import "./HomeView.css";
import Header from '../components/Header';
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Feature from "../components/Feature";

function HomeView() {
  return (
    <div>
      <Header />
      <Hero />
      <Feature />
      <Footer />
    </div>
  );
}

export default HomeView;
