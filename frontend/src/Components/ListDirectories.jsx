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
  const [currentDirectoryIndex, setCurrentDirectoryIndex] = useState(0);

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

  const handleNextDirectory = () => {
    setCurrentDirectoryIndex((prevIndex) => (prevIndex + 1) % directories.length);
  };

  const handlePreviousDirectory = () => {
    setCurrentDirectoryIndex((prevIndex) => (prevIndex - 1 + directories.length) % directories.length);
  };

  return (
    <div className="directory-list">
      <h2 className="directory-list-title">Directory List</h2>
      <p>Total Directories: {directories.length}</p>
      {directories.length > 0 && (
        <React.Fragment>
          <DirectoryItem {...directories[currentDirectoryIndex]} />
          <div>
            <button onClick={handlePreviousDirectory}>Previous</button>
            <button onClick={handleNextDirectory}>Next</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default DirectoryList;