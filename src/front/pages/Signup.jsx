import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const Signup = () => {
  const { dispatch } = useGlobalReducer();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    birthdate: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BackendURL = 'https://fluffy-telegram-x5qpxwxp49jf96jj-3001.app.github.dev/api/signup';
      const response = await fetch(BackendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Error al registrar usuario");
        return;
      }

      const data = await response.json();
      
      if (data.token) {
        dispatch({
          type: 'save_token',
          token: data.token,
        });
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor. Verifica que el backend esté corriendo y CORS esté configurado.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Nuevo usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthdate" className="form-label">Fecha de nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-pink w-100 py-2">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
