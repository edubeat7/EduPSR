import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Pagina1.css';
import Navbar from '../Navbar/Navbar';
import logoA from '../Home/Logo4.png';

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

export default function FileInterface() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPath, setCurrentPath] = useState('ArchivoCarpeta');
  const [pathHistory, setPathHistory] = useState([]);
  const [isEmptyFolder, setIsEmptyFolder] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetchFolderContent();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentPath]);

  const fetchFolderContent = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setIsEmptyFolder(false);
      setItems([]);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const { data, error } = await supabase.storage
        .from('archivos')
        .list(currentPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;

      if (!data || data.length === 0) {
        timeoutRef.current = setTimeout(() => {
          setIsEmptyFolder(true);
          setIsLoading(false);
        }, 5000);
        return;
      }

      const processedItems = await Promise.all(
        data.map(async (item) => {
          if (item.id === null) {
            const { data: folderContent } = await supabase.storage
              .from('archivos')
              .list(`${currentPath}/${item.name}`);

            if (!folderContent || folderContent.length === 0) return null;

            return { ...item, isFolder: true, name: item.name };
          } else {
            const { data: urlData } = supabase.storage
              .from('archivos')
              .getPublicUrl(`${currentPath}/${item.name}`);

            const originalName = item.name.split('-').slice(1).join('-') || item.name;

            return {
              ...item,
              isFolder: false,
              originalName,
              url: urlData.publicUrl
            };
          }
        })
      );

      const validItems = processedItems.filter(item =>
        item !== null && (item.isFolder || item.name.endsWith('.pdf'))
      );

      if (validItems.length === 0) {
        timeoutRef.current = setTimeout(() => {
          setIsEmptyFolder(true);
          setIsLoading(false);
        }, 5000);
      } else {
        setItems(validItems);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al cargar el contenido');
      setIsLoading(false);
    }
  };

  const handleNavigate = (folderName) => {
    setPathHistory(prev => [...prev, currentPath]);
    setCurrentPath(`${currentPath}/${folderName}`);
  };

  const handleGoBack = () => {
    if (pathHistory.length === 0) return;
    const prevPath = pathHistory[pathHistory.length - 1];
    setPathHistory(prev => prev.slice(0, -1));
    setCurrentPath(prevPath);
  };

  const handleDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>

      <div className="logo-container">
        <img src={logoA} className="App-logo" alt="logo" />
      </div>

      <div className="card2">
        <div className="header-wrapper">
          <h1>Biblioteca de Documentos</h1>
          {pathHistory.length > 0 && (
            <button
              className="upload-button"
              onClick={handleGoBack}
              style={{ marginBottom: '20px' }}
            >
              ↩ Volver atrás
            </button>
          )}
        </div>

        <div className="file-list">
          {items.map(item => (
            <div key={item.id || item.name} className="audio-item">
              {item.isFolder ? (
                <button
                  className="upload-button folder"
                  onClick={() => handleNavigate(item.name)}
                >
                  📁 {item.name}
                </button>
              ) : (
                <div className="controls">
                  <span className="play-button">📄</span>
                  <span className="filename">{item.originalName}</span>
                  <div className="actions">
                    <button
                      className="button download-button"
                      onClick={() => handleDownload(item.url, item.originalName)}
                    >
                      Descargar
                    </button>
                    <button
                      className="button view-button"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isEmptyFolder && (
          <div className="audio-item" style={{ justifyContent: 'center', flexDirection: 'column' }}>
            <p>La carpeta está vacía</p>
            {pathHistory.length > 0 && (
              <button
                className="upload-button"
                onClick={handleGoBack}
              >
                ↩ Volver atrás
              </button>
            )}
          </div>
        )}

        {isLoading && (
          <div className="audio-item" style={{ justifyContent: 'center', flexDirection: 'column' }}>
            <div className="play-button" style={{ animation: 'spin 1s ease-in-out infinite' }}>🔄</div>
            <p>Cargando contenido...</p>
          </div>
        )}

        {errorMessage && (
          <div className="audio-item" style={{ backgroundColor: 'rgba(220, 53, 69, 0.2)', borderLeft: '5px solid #dc3545' }}>
            <p>⚠️ {errorMessage}</p>
            <button
              className="upload-button"
              onClick={fetchFolderContent}
              style={{ marginLeft: 'auto' }}
            >
              🔄 Intentar nuevamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}