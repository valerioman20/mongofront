import React, { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx';
import './Login.css'; // Assicurati di creare questo file CSS nella stessa cartella del componente

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          login(data.token);
          navigate('/');
        } else {
          setMessageType('danger');
          setMessage(data.message || 'Credenziali non valide');
        }
      })
      .catch((error) => {
        setMessageType('danger');
        setMessage('Errore durante il login');
      });
  };

  return (
    <Container>
      <h1 className="my-4">Login</h1>
      {message && <Alert variant={messageType}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary mt-3 mr-2" type="submit">
          Login
        </Button>
        <Button variant="light" className="ml-2 google-btn mt-3" onClick={() => window.location.href = 'http://localhost:5001/api/auth/google'}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google sign-in" />
          Accedi con Google
        </Button>
      </Form>
    </Container>
  );
}
