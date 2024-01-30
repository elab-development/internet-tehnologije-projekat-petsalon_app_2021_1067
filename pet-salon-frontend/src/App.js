import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './komponente/Footer';
import Navbar from './komponente/Navbar';
import Pocetna from './komponente/Pocetna';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Pocetna/>} />
      
      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
