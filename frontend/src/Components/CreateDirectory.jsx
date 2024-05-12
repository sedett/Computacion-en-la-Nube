import React, { useState,useEffect } from 'react';
import axios from 'axios';

const CreateDirectory = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [emails, setEmails] = useState([]);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/directories');
        const directories = response.data;
        if (directories.length > 0) {
          const lastDirectory = directories[directories.length - 1];
          setLastId(lastDirectory.id);
        }
      } catch (error) {
        console.error('Error al obtener la lista de directorios:', error);
      }
    };

    fetchDirectories();
  }, []);

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handlePathChange = (event) => {
      setPath(event.target.value);
    };

    const handleEmailsChange = (index, event) => {
      const newEmails = [...emails];
      newEmails[index] = event.target.value;
      setEmails(newEmails);
    };

    const handleAddEmailField = () => {
      const newEmails = [...emails, ''];
      setEmails(newEmails);
    };

    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/directories', {
          id:lastId+1,
          name,
          path,
          emails,
        });
    
        // Aquí puedes manejar la respuesta del servidor, si es necesario
        console.log('Directorio creado:', response.data);
    
        // Recargar la página para mostrar el nuevo directorio
        window.location.reload();
      } catch (error) {
        console.error('Error al crear el directorio:', error);
      }
    };
  

  

  return (
    <div>
      <h2>Crear directorio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="path">Ruta:</label>
          <input type="text" id="path" value={path} onChange={handlePathChange} />
        </div>
        <div>
          <label>Correos electrónicos:</label>
          {emails.map((email, index) => (
            <div key={index}>
              <input
                type="text"
                value={email}
                onChange={(event) => handleEmailsChange(index, event)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddEmailField}>Agregar campo de correo electrónico</button>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateDirectory;