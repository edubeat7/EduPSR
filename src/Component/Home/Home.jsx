import { Link } from 'react-router-dom';
import './Home.css'; // Reutilizamos los mismos estilos
import logoA from '../Home/Logo4.png';

function Landing() {
  return (
    <div className="container login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={logoA} className="App-logo" alt="logo" />
        </div>

        <div className="login-card">
          <h1 className="login-title">Bienvenido a EduAbstract</h1>
          
          <div className="landing-content">
            <p className="login-disclaimer" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Mejora tu aprendizaje con el contenido multimedia interactivo.
            </p>

            <div className="features-grid">
              
              <div className="feature-item">
                <h3>📝 Pruebas Autocorregidas</h3>
                <p>Banco de ejercicios interactivos con corrección automática y retroalimentación inmediata</p>
              </div>
              
              <div className="feature-item">
                <h3>👨‍🎓 Link y enlaces para videos de youtube</h3>
                <p>Acceso a una lista de videos útiles para comprender la materia</p>
              </div>
            </div>

            <a href="/MenuPaginas" className="upload-button login-button" style={{ maxWidth: '200px', margin: '2rem auto' }} >Comenzar Ahora</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;