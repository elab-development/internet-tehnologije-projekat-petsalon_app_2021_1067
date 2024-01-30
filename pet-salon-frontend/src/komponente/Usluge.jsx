import React from 'react';
import useUsluge from './kuke/useUsluge';
import './Usluge.css'; 

const Usluge = () => {
  const { usluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/usluge');

  if (loading) return <p>Ucitavaju se usluge...</p>;
  if (error) return <p>Greska u ucitavanju usluga: {error.message}</p>;

  return (
    <div className="usluge-stranica">
     
    </div>
    
  );
};

export default Usluge;