import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddUslugaForm.css';

const EditUslugaForm = ({ usluga, setUsluge, closeForm }) => {
  const [naziv, setNaziv] = useState(usluga.naziv);
  const [opis, setOpis] = useState(usluga.opis);
  const [trajanje, setTrajanje] = useState(usluga.trajanje);
  const [tezina, setTezina] = useState(usluga.tezina);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('access_token');

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/services/${usluga.id}`, {
        naziv,
        opis,
        trajanje,
        tezina,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsluge((prevUsluge) => prevUsluge.map((u) => (u.id === usluga.id ? response.data.service : u)));
      closeForm();
    } catch (error) {
      setError('Greška prilikom ažuriranja usluge.');
      console.error(error);
    }
  };

  return (
    <div className="add-usluga-form">
      <h2>Uredi Uslugu</h2>
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
        <button type="submit">Sačuvaj Promene</button>
        <button type="button" onClick={closeForm}>Otkaži</button>
      </form>
    </div>
  );
};

export default EditUslugaForm;
