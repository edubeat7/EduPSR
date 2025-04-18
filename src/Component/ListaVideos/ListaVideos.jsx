import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import './estiloLista.css';
import Navbar from '../Navbar/Navbar';

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

export default function ListaVideosBiofisica() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isExcelLoaded, setIsExcelLoaded] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [temaFilter, setTemaFilter] = useState('');
  const [temas, setTemas] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchExcelFile();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    
    let filtered = [...videos];
    
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(video => 
        (video.contenido && video.contenido.toLowerCase().includes(searchLower)) ||
        (video.tema && video.tema.toLowerCase().includes(searchLower))
      );
    }
    
    if (temaFilter) {
      filtered = filtered.filter(video => 
        video.tema && video.tema === temaFilter
      );
    }
    
    setFilteredVideos(filtered);
  }, [searchTerm, temaFilter, videos]);

  const fetchExcelFile = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const { data, error } = await supabase.storage
        .from('linkdeposito')
        .list('', { limit: 100 });

      if (error) throw error;

      const excelFile = data.find(file => 
        file.name.toLowerCase() === 'listadevideosbiofisica.xlsx'
      );
      
      if (!excelFile) {
        setErrorMessage('No se encontró el archivo de videos');
        setIsLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('linkdeposito')
        .getPublicUrl(excelFile.name);
        
      await loadExcelData(`${urlData.publicUrl}?t=${Date.now()}`);
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error al cargar el archivo: ${error.message}`);
      setIsLoading(false);
    }
  };

  const loadExcelData = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
      // Convertir a JSON incluyendo headers
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Validar estructura del archivo
      if (jsonData.length < 1) throw new Error('El archivo está vacío');
      
      const headers = jsonData[0].map(h => h.trim());
      const expectedHeaders = ['Materia', 'Tema', 'Contenido', 'Link'];
      
      if (!expectedHeaders.every(h => headers.includes(h))) {
        throw new Error('Estructura de archivo incorrecta. Encabezados requeridos: Materia, Tema, Contenido, Link');
      }
      
      // Mapear datos
      const normalizedData = jsonData.slice(1).map((row, index) => {
        // Saltar filas vacías
        if (row.every(cell => cell === null || cell === '')) return null;
        
        return {
          materia: row[headers.indexOf('Materia')] || '',
          tema: row[headers.indexOf('Tema')]?.toString() || '',
          contenido: row[headers.indexOf('Contenido')]?.toString() || '',
          link: row[headers.indexOf('Link')]?.toString() || ''
        };
      }).filter(Boolean); // Eliminar filas vacías

      if (normalizedData.length === 0) {
        throw new Error('El archivo no contiene datos válidos');
      }

      // Extraer temas únicos
      const uniqueTemas = [...new Set(normalizedData.map(video => video.tema))]
        .filter(t => t)
        .sort((a, b) => a.localeCompare(b));

      setVideos(normalizedData);
      setFilteredVideos(normalizedData);
      setTemas(uniqueTemas);
      setIsExcelLoaded(true);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTemaChange = (e) => setTemaFilter(e.target.value);
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setTemaFilter('');
  };

  const showScrollHint = isExcelLoaded && windowWidth < 1000;

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>

      <div className="proveedores-container">
        <div className="header-wrapper">
          <div className="header-content">
            <h1 className="main-title">🎥 Videos de Biofísica externos recomendados en youtube</h1>
            <p className="welcome-message">Encuentra recursos de aprendizaje seleccionados por tus profesores.</p>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar contenido..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            
            <div className="category-filter">
              <select 
                value={temaFilter} 
                onChange={handleTemaChange}
                className="category-select"
              >
                <option value="">Todos los temas</option>
                {temas.map((tema, index) => (
                  <option key={index} value={tema}>
                    {tema}
                  </option>
                ))}
              </select>
            </div>
            
            {(searchTerm || temaFilter) && (
              <button 
                className="upload-button clear-filter-button" 
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {showScrollHint && (
          <div className="scroll-hint">
            <small>← Desliza horizontalmente para ver todos los datos →</small>
          </div>
        )}

        {isExcelLoaded && filteredVideos.length > 0 && (
          <div className="proveedores-table-wrapper">
            <div className="results-count">
              Mostrando {filteredVideos.length} de {videos.length} videos
            </div>
            
            <div className="proveedores-table">
              <div className="table-header">
                <div className="header-cell">Tema</div>
                <div className="header-cell">Contenido</div>
                <div className="header-cell">Enlace</div>
              </div>
              
              <div className="table-body">
                {filteredVideos.map((video, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell empresa-cell" data-label="Tema">
                      <span className="category-badge">{video.tema}</span>
                    </div>
                    <div className="table-cell" data-label="Contenido">
                      {video.contenido}
                    </div>
                    <div className="table-cell" data-label="Enlace">
                      <a 
                        href={video.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="upload-button"
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                      >
                        Ver video
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando videos...</p>
          </div>
        )}

        {errorMessage && (
          <div className="error-container">
            <p>⚠️ {errorMessage}</p>
            <button
              className="retry-button upload-button"
              onClick={fetchExcelFile}
            >
              Intentar nuevamente
            </button>
          </div>
        )}
        
        {isExcelLoaded && filteredVideos.length === 0 && !isLoading && (
          <div className="no-results">
            <p>No se encontraron videos que coincidan con tu búsqueda.</p>
            <button 
              className="upload-button clear-filter-button" 
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}