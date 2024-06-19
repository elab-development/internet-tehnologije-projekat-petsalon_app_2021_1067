import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Koristimo isti CSS kao za login

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password
            });

            const { access_token, token_type, user } = response.data;

            // Save the token and user information in session storage
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('token_type', token_type);

            // Optionally, redirect the user or do something else
            console.log('Registration successful');
        } catch (error) {
            setError('Neuspešna registracija. Proverite podatke i pokušajte ponovo.');
        }
    };

    return (
        <div className="login-form">
            <h2>Registracija</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Ime:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Lozinka:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registracija</button>
            </form>
        </div>
    );
};

export default RegisterForm;
