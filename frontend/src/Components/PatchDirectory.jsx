import React, { useState } from 'react';
import axios from 'axios';

const DirectoryUpdateForm = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [directory, setDirectory] = useState(null);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [emails, setEmails] = useState([]);

  const handleIdChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUpdate = async () => {
    if (!directory) {
      console.error('Directorio no encontrado');
      return;
    }

    const updatedDirectory = {
      ...directory,
      name: name
    };

    setLoading(true);

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/directories/${directory.id}`, updatedDirectory);
      const updatedData = response.data;
      setDirectory(updatedData);
      console.log('Directorio actualizado:', updatedData);
      // Realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error('Error al actualizar directorio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          ID del directorio:
          <input type="text" value={searchId} onChange={handleIdChange} />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}

      {directory && (
        <div>
          <p>Nombre actual del directorio: {directory.name}</p>
          <form>
            <label>
              Nuevo nombre:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="button" onClick={handleUpdate}>
              Actualizar
            </button>
          </form>
        </div>
      )}

      {!loading && directory === null && (
        <p>No se encontró el directorio.</p>
      )}
    </div>
  );
};

export default DirectoryUpdateForm;