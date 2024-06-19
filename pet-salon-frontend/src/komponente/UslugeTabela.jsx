import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';  
import axios from 'axios';
import './UslugeTabela.css'; 
import useUsluge from './kuke/useUsluge';
import AddUslugaForm from './AddUslugaForm';  
import EditUslugaForm from './EditUslugaForm';

const UslugeTabela = () => {
  const { usluge, setUsluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');
  const [showForm, setShowForm] = useState(false);
  const [editUsluga, setEditUsluga] = useState(null);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('access_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsluge((prevUsluge) => prevUsluge.filter((usluga) => usluga.id !== id));
    } catch (error) {
      console.error("Greška prilikom brisanja usluge:", error);
    }
  };

  const handleEdit = (usluga) => {
    setEditUsluga(usluga);
    setShowForm(false);
  };

  const closeEditForm = () => {
    setEditUsluga(null);
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška: {error.message}</p>;

  return (
    <div className="usluge-tabela">
      <h2>Lista Usluga</h2>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? 'Zatvori Formu' : 'Dodaj Novu Uslugu'}
      </button>
      {showForm && <AddUslugaForm setUsluge={setUsluge} />}
      {editUsluga && <EditUslugaForm usluga={editUsluga} setUsluge={setUsluge} closeForm={closeEditForm} />}
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
                <button onClick={() => handleEdit(usluga)} className="edit-button">
                  <FaEdit />
                </button>
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
