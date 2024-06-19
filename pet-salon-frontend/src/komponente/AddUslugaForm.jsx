import React, { useState } from 'react';
import axios from 'axios';
import './AddUslugaForm.css';

const AddUslugaForm = ({ setUsluge }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [trajanje, setTrajanje] = useState('');
  const [tezina, setTezina] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('access_token');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/services', {
        naziv,
        opis,
        trajanje,
        tezina,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsluge((prevUsluge) => [...prevUsluge, response.data.service]);
      setNaziv('');
      setOpis('');
      setTrajanje('');
      setTezina('');
    } catch (error) {
      setError('Greška prilikom dodavanja usluge.');
      console.error(error);
    }
  };

  return (
    <div className="add-usluga-form">
      <h2>Dodaj Novu Uslugu</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="naziv">Naziv:</label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="opis">Opis:</label>
          <input
            type="text"
            id="opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="trajanje">Trajanje:</label>
          <input
            type="text"
            id="trajanje"
            value={trajanje}
            onChange={(e) => setTrajanje(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tezina">Tezina:</label>
          <input
            type="text"
            id="tezina"
            value={tezina}
            onChange={(e) => setTezina(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dodaj Uslugu</button>
      </form>
    </div>
  );
};

export default AddUslugaForm;
