import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const Signup = () => {
  const {dispatch} = useGlobalReducer();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const BackendURL = 'https://fluffy-telegram-x5qpxwxp49jf96jj-3001.app.github.dev/api/singup'
    fetch(BackendURL, {
      method: 'POST',
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify(formData)
    })
    dispatch({
      type: 'save_user',
      user: {email:formData.email}
    })
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100 py-2">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
