import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectoryList = () => {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/directories');
      const directoryList = response.data;
      setDirectories(directoryList);
    } catch (error) {
      console.error('Error al obtener la lista de directorios:', error);
      setDirectories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (directoryId) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/directories/${directoryId}`);
      fetchDirectories();
    } catch (error) {
      console.error('Error al eliminar el directorio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Lista de directorios</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ul>
          {directories.map((directory) => (
            <li key={directory.id}>
              {directory.name}
              <button onClick={() => handleDelete(directory.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DirectoryList;