import React, { useState } from 'react';
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
import UslugeTabela from './komponente/UslugeTabela';
import MusterijeTabela from './komponente/MusterijeTabela';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('access_token'));
  const [isWorker, setIsWorker] = useState(sessionStorage.getItem('is_worker') === 'true');

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} isWorker={isWorker} setIsWorker={setIsWorker} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/o-nama" element={<ONama />} />
          <Route path="/usluge" element={<Usluge />} />
          <Route path="/musterije" element={<NaseMusterije />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setIsWorker={setIsWorker} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin/usluge" element={<UslugeTabela />} />
          <Route path="/admin/musterije" element={<MusterijeTabela />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
