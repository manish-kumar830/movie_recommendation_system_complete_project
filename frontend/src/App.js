import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Navbar from './component/Navbar.jsx';
import Recommendation from './pages/Recommendation.jsx';
import Footer from './component/Footer.jsx';

function App() {
  return (
    <>

    <Navbar />

    <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/recommendation' element={<Recommendation />}/>


    </Routes>

    <Footer/>
    </>
  );
}

export default App;
