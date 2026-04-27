import { Link } from 'react-router-dom';
import './Home.css';
import logoA from '../Home/Logo5psr.png';

function Landing() {
  return (
    <div className="landing-wrapper fade-in">
      <div className="landing-container">
        
        <div className="hero-section">
          <div className="hero-logo-wrapper slide-up">
            <img src={logoA} className="hero-logo" alt="EduAbstract Logo" />
          </div>
          
          <div className="hero-content slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="hero-title">
              Bienvenido a <span className="highlight-text">EduAbstract</span>
            </h1>
            
            <p className="hero-subtitle">
              Eleva tu aprendizaje con nuestra plataforma de contenido multimedia interactivo y herramientas de vanguardia.
            </p>

            <a href="/MenuPaginas" className="btn-start">
              Comenzar Ahora
              <span className="btn-icon">→</span>
            </a>
          </div>
        </div>

        <div className="features-section slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📝</span>
            </div>
            <h3>Pruebas Autocorregidas</h3>
            <p>Banco de ejercicios interactivos con corrección automática y retroalimentación inmediata para medir tu progreso.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">👨‍🎓</span>
            </div>
            <h3>Recursos Audiovisuales</h3>
            <p>Acceso a una biblioteca curada de videos educativos y material complementario para comprender la materia a fondo.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Landing;