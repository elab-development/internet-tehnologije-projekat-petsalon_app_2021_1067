import React from 'react';
import { FaTrash } from 'react-icons/fa';  
import axios from 'axios';
import './UslugeTabela.css'; 
import useUsluge from './kuke/useUsluge';

const UslugeTabela = () => {
  const { usluge, setUsluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('access_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Ažuriramo lokalnu memoriju tako što filtriramo obrisanu uslugu
      setUsluge((prevUsluge) => prevUsluge.filter((usluga) => usluga.id !== id));
    } catch (error) {
      console.error("Greška prilikom brisanja usluge:", error);
    }
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška: {error.message}</p>;

  return (
    <div className="usluge-tabela">
      <h2>Lista Usluga</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Trajanje</th>
            <th>Tezina</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {usluge.map((usluga) => (
            <tr key={usluga.id}>
              <td>{usluga.id}</td>
              <td>{usluga.naziv}</td>
              <td>{usluga.opis}</td>
              <td>{usluga.trajanje}</td>
              <td>{usluga.tezina}</td>
              <td>
                <button onClick={() => handleDelete(usluga.id)} className="delete-button">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UslugeTabela;
