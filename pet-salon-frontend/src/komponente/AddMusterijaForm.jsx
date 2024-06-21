import React, { useState } from 'react';

const AddMusterijaForm = ({ onAddMusterija }) => {
    const [name, setName] = useState('Test Breed');
    const [bred_for, setBredFor] = useState('Hunting');
    const [breed_group, setBreedGroup] = useState('Hound');
    const [life_span, setLifeSpan] = useState('10 - 12 years');
    const [temperament, setTemperament] = useState('Friendly, Energetic');
    const [origin, setOrigin] = useState('Testland');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMusterija = {
            id: Date.now(),
            name,
            bred_for,
            breed_group,
            life_span,
            temperament,
            origin
        };
        onAddMusterija(newMusterija);
      
        setName('');
        setBredFor('');
        setBreedGroup('');
        setLifeSpan('');
        setTemperament('');
        setOrigin('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Bred For" value={bred_for} onChange={(e) => setBredFor(e.target.value)} />
            <input type="text" placeholder="Breed Group" value={breed_group} onChange={(e) => setBreedGroup(e.target.value)} />
            <input type="text" placeholder="Life Span" value={life_span} onChange={(e) => setLifeSpan(e.target.value)} required />
            <input type="text" placeholder="Temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)} />
            <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default AddMusterijaForm;
