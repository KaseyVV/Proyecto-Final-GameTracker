import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BibliotecaJuegos from "./pages/BibliotecaJuegos.jsx";
import './App.css';



function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biblioteca" element={<BibliotecaJuegos />} />
     
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;