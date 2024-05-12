import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definir el modelo DirectoryItem
const DirectoryItem = ({ id, path, name, emails }) => (
  <div>
    <h3>{name}</h3>
    <p>Directory ID: {id}</p>
    <p>Directory Path: {path}</p>
    <p>Emails:</p>
    <ul>
      {emails.map((email, index) => (
        <li key={index}>{email}</li>
      ))}
    </ul>
  </div>
);

const DirectoryList = () => {
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/directories'); 
        setDirectories(response.data);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchDirectories();
  }, []);

  return (
    <div>
      <h2>Directory List</h2>
      {directories.map((directory) => (
        <DirectoryItem key={directory.id} {...directory} />
      ))}
    </div>
  );
};

export default DirectoryList;