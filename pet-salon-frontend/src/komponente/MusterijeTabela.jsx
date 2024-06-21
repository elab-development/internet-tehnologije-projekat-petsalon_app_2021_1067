import React, { useState } from 'react';
import './MusterijeTabela.css';
import useMusterije from './kuke/useMusterije';
import AddMusterijaForm from './AddMusterijaForm';

const MusterijeTabela = () => {
    const { musterije, setMusterije, loading, error } = useMusterije('https://api.thedogapi.com/v1/breeds');
    const [showForm, setShowForm] = useState(false);

    const handleDelete = (id) => {
        const updatedMusterije = musterije.filter((musterija) => musterija.id !== id);
        setMusterije(updatedMusterije);
        sessionStorage.setItem('breeds', JSON.stringify(updatedMusterije));
    };

    const handleAddMusterija = (newMusterija) => {
        const updatedMusterije = [...musterije, newMusterija];
        setMusterije(updatedMusterije);
        sessionStorage.setItem('breeds', JSON.stringify(updatedMusterije));
    };

    if (loading) return <p>Učitavanje...</p>;
    if (error) return <p>Greška: {error.message}</p>;

    return (
        <div className="musterije-tabela">
            <h2>Lista Rasa Kućnih Ljubimaca</h2>
            <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
                {showForm ? 'Zatvori Formu' : 'Dodaj Novu Rasu'}
            </button>
            {showForm && <AddMusterijaForm onAddMusterija={handleAddMusterija} />}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bred For</th>
                        <th>Breed Group</th>
                        <th>Life Span</th>
                        <th>Temperament</th>
                        <th>Origin</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {musterije.map((musterija) => (
                        <tr key={musterija.id}>
                            <td>{musterija.name}</td>
                            <td>{musterija.bred_for}</td>
                            <td>{musterija.breed_group}</td>
                            <td>{musterija.life_span}</td>
                            <td>{musterija.temperament}</td>
                            <td>{musterija.origin}</td>
                            <td>
                                <button onClick={() => handleDelete(musterija.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MusterijeTabela;
