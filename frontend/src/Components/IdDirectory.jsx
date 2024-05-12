import React, { useState } from 'react';
import axios from 'axios';

const DirectorySearch = () => {
  const [searchId, setSearchId] = useState('');
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/directories/${searchId}`);
      const directoryData = response.data;
      setDirectory(directoryData);
    } catch (error) {
      console.error('Error al buscar directorio:', error);
      setDirectory(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Buscar directorio por ID</h2>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Ingrese el ID del directorio"
      />
      <button onClick={handleSearch} disabled={loading}>
        Buscar
      </button>
      {loading && <div>Cargando...</div>}
      {directory && (
        <div>
          <h3>Directorio encontrado:</h3>
          <p>ID: {directory.id}</p>
          <p>Nombre: {directory.name}</p>
          <p>Ruta: {directory.path}</p>
          <p>Emails: {directory.emails.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default DirectorySearch;