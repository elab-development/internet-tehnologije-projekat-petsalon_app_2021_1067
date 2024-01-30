import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NaseMusterije.css';

const NaseMusterije = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        setBreeds(response.data.slice(0, 9));
      } catch (error) {
        console.error('Greska u vracanju rasa pasa:', error);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div className="nase-musterije">
      <h2>Rase koje dolaze u naš salon</h2>
      <ul>
        {breeds.map((breed, index) => (
          <li key={index}>
            <h3>{breed.name}</h3>
            <p>Bred for: {breed.bred_for}</p>
            <p>Breed group: {breed.breed_group}</p>
            <p>Life span: {breed.life_span}</p>
            <p>Temperament: {breed.temperament}</p>
            <p>Origin: {breed.origin}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NaseMusterije;