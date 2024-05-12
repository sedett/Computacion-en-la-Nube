import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/ListDirectories.css';

const DirectoryItem = ({ id, path, name, emails }) => (
  <div className="directory-item">
    <h3 className="directory-item-title">{name}</h3>
    <p className="directory-item-info">Directory ID: {id}</p>
    <p className="directory-item-info">Directory Path: {path}</p>
    <p className="directory-item-info">Emails:</p>
    <ul className="directory-item-emails">
      {emails.map((email, index) => (
        <li key={index} className="directory-item-email">{email}</li>
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
    <div className="directory-list">
      <h2 className="directory-list-title">Directory List</h2>
      {directories.map((directory) => (
        <DirectoryItem key={directory.id} {...directory} />
      ))}
    </div>
  );
};

export default DirectoryList;