import React from 'react';
import useUsluge from './kuke/useUsluge';
import './Usluge.css'; 
import { useState } from 'react';

const Usluge = () => {
  const { usluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');
  
  const [filter, setFilter] = useState({ naziv: '', trajanje: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(3);

  if (loading) return <p>Ucitavaju se usluge...</p>;
  if (error) return <p>Greska u ucitavanju usluga: {error.message}</p>;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleReset = () => {
    setFilter({ naziv: '', trajanje: ''});
  };

  const filteredServices = usluge.filter(usluga => {
    const nazivMatch = filter.naziv === '' || usluga.naziv.toLowerCase().includes(filter.naziv.toLowerCase());
    const trajanjeMatch = filter.trajanje === '' || usluga.trajanje === parseInt(filter.trajanje);
    return nazivMatch && trajanjeMatch;
  });

  const indexLastService = currentPage * servicesPerPage;
  const indexFirstService = indexLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexFirstService, indexLastService);

  const paginate = brojStrane => setCurrentPage(brojStrane);


  return (
    <div className='cela-stranica'>
    <div className="usluge-stranica">
        <div className="pretraga">
            <input
              type="text"
              placeholder="Pretraži po nazivu"
              name="naziv"
              value={filter.naziv}
              onChange={handleInputChange}
            />
            <select name="trajanje" value={filter.trajanje} onChange={handleInputChange}>
              <option value="">Sva trajanja</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
              <option value="75">75 min</option>
              <option value="90">90 min</option>
            </select>
            <button onClick={handleReset}>Resetuj filter</button>
          </div>
    
          <ul className="usluge-lista">
            {currentServices.map((usluga, index) => (
              <li key={index}>
                <h3>{usluga.naziv}</h3>
                <p>{usluga.opis}</p>
                <p>Trajanje: {usluga.trajanje} min</p>
                <p>Tezina usluge: {usluga.tezina}</p>
              </li>
            ))}
          </ul>
    
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
     </div>
    
  );
};

export default Usluge;