import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './komponente/Footer';
import Navbar from './komponente/Navbar';
import Pocetna from './komponente/Pocetna';
import ONama from './komponente/ONama';
import Usluge from './komponente/Usluge';
import NaseMusterije from './komponente/NaseMusterije';
import LoginForm from './komponente/LoginForm';
import RegisterForm from './komponente/RegisterForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Pocetna/>} />
          <Route path="/o-nama" element={<ONama/>} />
          <Route path="/usluge" element={<Usluge/>} />
          <Route path="/musterije" element={<NaseMusterije/>} />

          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>} />


        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
