import React, { useState } from 'react';
import axios from 'axios';

const DirectoryUpdate = () => {
  const [searchId, setSearchId] = useState('');
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [emails, setEmails] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/directories/${searchId}`);
      const directoryData = response.data;
      setDirectory(directoryData);
      setName(directoryData.name);
      setPath(directoryData.path);
      setEmails(directoryData.emails);
    } catch (error) {
      console.error('Error al buscar directorio:', error);
      setDirectory(null);
      setName('');
      setPath('');
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedDirectory = {
        id: directory.id,
        name,
        path,
        emails,
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/directories/${directory.id}`,
        updatedDirectory
      );
      const updatedData = response.data;
      setDirectory(updatedData);
    } catch (error) {
      console.error('Error al actualizar directorio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  return (
    <div>
      <h2>Actualizar directorio</h2>
      <div>
        <label>Ingrese el ID del directorio:</label>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          Buscar
        </button>
      </div>
      {loading && <div>Cargando...</div>}
      {directory && (
        <div>
          <h3>Directorio actual:</h3>
          <p>ID: {directory.id}</p>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Ruta:</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>
          <p>Emails actuales:</p>
          <ul>
            {emails.map((email, index) => (
              <li key={index}>
                {email}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                />
                <button onClick={() => handleRemoveEmail(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={handleUpdate} disabled={loading}>
            Actualizar
          </button>
        </div>
      )}
    </div>
  );
};

export default DirectoryUpdate;