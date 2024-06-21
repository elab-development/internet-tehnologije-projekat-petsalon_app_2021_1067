import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';
import './UslugeTabela.css';
import useUsluge from './kuke/useUsluge';
import AddUslugaForm from './AddUslugaForm';
import EditUslugaForm from './EditUslugaForm';

const UslugeTabela = () => {
  const { usluge, setUsluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');
  const [showForm, setShowForm] = useState(false);
  const [editUsluga, setEditUsluga] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

  const sortedUsluge = React.useMemo(() => {
    let sortableUsluge = [...usluge];
    if (sortConfig.key !== null) {
      sortableUsluge.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsluge;
  }, [usluge, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
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
            <th onClick={() => requestSort('id')}>ID {getSortIcon('id')}</th>
            <th onClick={() => requestSort('naziv')}>Naziv {getSortIcon('naziv')}</th>
            <th onClick={() => requestSort('opis')}>Opis {getSortIcon('opis')}</th>
            <th onClick={() => requestSort('trajanje')}>Trajanje {getSortIcon('trajanje')}</th>
            <th onClick={() => requestSort('tezina')}>Težina {getSortIcon('tezina')}</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsluge.map((usluga) => (
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
