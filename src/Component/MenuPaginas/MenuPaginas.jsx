import React from 'react';
import './MenuPaginas.css';
import logoImage from '../Home/Logo5psr.png';
import { Link } from 'react-router-dom';

const MenuSeleccion = () => {
  const handleLogout = () => {
    window.location.href = '/Home';
  };

  return (
    <div className="menu-dashboard fade-in">
      <div className="dashboard-header">
        <img src={logoImage} alt="EduAbstract Logo" className="dashboard-logo" />
        <button onClick={handleLogout} className="btn-logout-small">
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-content slide-up">
        <div className="dashboard-title-area">
          <h1 className="dashboard-title">Panel de Control</h1>
          <p className="dashboard-subtitle">Selecciona una herramienta para continuar con tu aprendizaje</p>
        </div>

        <div className="dashboard-grid">
          <a href="/Pagina1" className="dashboard-card action-card">
            <div className="card-icon-wrapper" style={{ background: 'rgba(8, 39, 86, 0.4)' }}>
              <span className="card-icon">📚</span>
            </div>
            <div className="card-text">
              <h3>Material Adicional</h3>
              <p>Accede a documentos y recursos de estudio complementarios.</p>
            </div>
            <div className="card-arrow">→</div>
          </a>

          <a href="/PruebaAutomatica" className="dashboard-card action-card">
            <div className="card-icon-wrapper" style={{ background: 'rgba(67, 179, 152, 0.4)' }}>
              <span className="card-icon">🎯</span>
            </div>
            <div className="card-text">
              <h3>Cuestionario</h3>
              <p>Pon a prueba tus conocimientos con ejercicios interactivos.</p>
            </div>
            <div className="card-arrow">→</div>
          </a>

          <a href="/ListaVideos" className="dashboard-card action-card">
            <div className="card-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.4)' }}>
              <span className="card-icon">▶️</span>
            </div>
            <div className="card-text">
              <h3>Enlaces a Videos</h3>
              <p>Explora nuestra biblioteca de contenido audiovisual.</p>
            </div>
            <div className="card-arrow">→</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuSeleccion;