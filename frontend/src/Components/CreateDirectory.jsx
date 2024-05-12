import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/CreateDirectory.css';
const CreateDirectory = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [emails, setEmails] = useState([]);
  const [cedula, setCedula] = useState('');
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/directories');
        const directories = response.data;
        setDirectories(directories);
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

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDirectory = {
        id: cedula,
        name,
        path,
        emails,
      };

      await axios.post('http://127.0.0.1:8000/directories', newDirectory);

      // Actualizar la lista de directorios en el estado local
      setDirectories([...directories, newDirectory]);

      // Restablecer los campos del formulario
      setName('');
      setPath('');
      setEmails([]);
      setCedula('');
    } catch (error) {
      console.error('Error al crear el directorio:', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Crear directorio</h2>
        <div className="form-group">
          <label htmlFor="name" className="label">Nombre:</label>
          <input type="text" id="name" className="input" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="path" className="label">Ruta:</label>
          <input type="text" id="path" className="input" value={path} onChange={handlePathChange} />
        </div>
        <div className="form-group">
          <label htmlFor="cedula" className="label">Cédula:</label>
          <input type="text" id="cedula" className="input" value={cedula} onChange={handleCedulaChange} />
        </div>
        <div className="form-group">
          <label className="label">Correos electrónicos:</label>
          {emails.map((email, index) => (
            <div key={index} className="email-group">
              <input
                type="text"
                value={email}
                className="email-input"
                onChange={(event) => handleEmailsChange(index, event)}
              />
            </div>
          ))}
          <button type="button" className="add-email-button" onClick={handleAddEmailField}>
            Agregar campo de correo electrónico
          </button>
        </div>
        <button type="submit" className="submit-button">Crear</button>
      </form>
    </div>
  );
};

export default CreateDirectory;