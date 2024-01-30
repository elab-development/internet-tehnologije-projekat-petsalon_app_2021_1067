import React, { useState } from 'react';
import './ONama.css'; 

const ONama = () => {
    const telefon = "+3816544321";
    const adresa = "Jove Ilica 120";
    const radnoVreme = "Ponedeljak - Petak: 9:00 - 18:00, Subota: 9:00 - 15:00";

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className='o-nama-stranica'>
        <div className="o-nama">
            <h2>O nama</h2>
            <p>
                Naš pet salon je osnovan sa ciljem da pruži najbolju moguću negu i pažnju vašim ljubimcima.
                Sa našim timom stručnih frizera i ljubaznim osobljem, 
                vaši kućni ljubimci će dobiti vrhunsku negu
                i izgledati sjajno.
            </p>
            <button onClick={toggleModal}>Prikaži kontakt informacije</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h3>Kontakt informacije:</h3>
                        <p>Kontakt telefon: {telefon}</p>
                        <p>Adresa: {adresa}</p>
                        <p>Radno vreme: {radnoVreme}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default ONama;