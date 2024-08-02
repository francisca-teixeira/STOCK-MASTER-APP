import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

function RegisterForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Sending...');

    fetch('http://summercamp24.ddns.net:4000/game/register-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setMessage('Registration successful!');
      navigate('/home', { state: { player: data } }); // Pass the entire player object as state
    })
    .catch(error => {
      setMessage(`Registration failed: ${error.message}`);
    });
  };

  return (
    <div className="container">
      <div className="image-section"></div>
      <div className="form-section">
        <form onSubmit={handleSubmit} className="Register-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;
