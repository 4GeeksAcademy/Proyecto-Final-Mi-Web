import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import logo from "../assets/img/logo.png";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'save_token', token: null });
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="100" height="auto" />
          Pooh & Tete
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/Perfumes" className="nav-link">Perfumes</Link>
            </li>
            <li className="nav-item">
              <Link to="/Maquillaje" className="nav-link">Maquillaje</Link>
            </li>
            <li className="nav-item">
              <Link to="/Cosmética" className="nav-link">Cosmética</Link>
            </li>
            {/*
            <li className="nav-item">
              <Link to="/Cabello" className="nav-link">Cabello</Link>
            </li>
            <li className="nav-item">
              <Link to="/Higiene" className="nav-link">Higiene</Link>
            </li>
            <li className="nav-item">
              <Link to="/Salud" className="nav-link">Salud</Link>
            </li>
            <li className="nav-item">
              <Link to="/Regalos" className="nav-link">Regalos</Link>
            </li>
              */}
          </ul>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {store.token ? (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Mi Cuenta <i className="bi bi-person-lines-fill"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link to="/mi-cuenta" className="dropdown-item dropdown-btn-outline-pink">Configuración <i className="bi bi-gear-fill"></i></Link></li>
                      <li><button className="dropdown-item dropdown-btn-outline-pink" onClick={handleLogout}>Cerrar sesión <i className="bi bi-door-open-fill"></i></button></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/carrito" className="nav-link">Mi carrito <i className="bi bi-cart4"></i></Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Identifícate / Regístrate
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to="/Login" className="dropdown-item dropdown-btn-outline-pink">Iniciar sesión</Link></li>
                    <li><Link to="/Signup" className="dropdown-item dropdown-btn-outline-pink">Registrarse</Link></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
