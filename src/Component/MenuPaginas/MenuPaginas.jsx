import React from 'react';
import './MenuPaginas.css';
import logoImage from '../Home/Logo4.png';

const MenuSeleccion = () => {
  const handleLogout = () => {
    window.location.href = '/Home';
  };

  return (
    <div className="menu-container">
      <div className="menu-form">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="App-logo" />
        </div>
        
        <div className="menu-card">
          <h1 className="menu-title">Seleccione una opción</h1>
          
          <div className="menu-options">
            <a href="/Pagina1" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <span className="option-text">Material adicional</span>
            </a>
            
            <a href="/PruebaAutomatica" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span className="option-text">Cuestionario</span>
            </a>

            <a href="/ListaVideos" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span className="option-text">Enlaces a videos</span>
            </a>
          </div>

          
          <p className="menu-disclaimer">
            Seleccione una opción para continuar
          </p>
        </div>

        <div className="card2">
          <button 
            className="upload-button logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSeleccion;