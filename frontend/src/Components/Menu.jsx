import React, { useState } from 'react';
import CreateDirectory from './CreateDirectory';
import ListDirectories from './ListDirectories';
import IdDirectory from './IdDirectory';
import UpdateDirectory from './UpdateDirectory'
import DeleteDirectory from './DeleteDirectory'
import Status from './Status'
import PatchDirectory from './PatchDirectory'
// Importa otros componentes de endpoints aquí

const Menu = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState('');

    const handleEndpointChange = (event) => {
        setSelectedEndpoint(event.target.value);
    };

    const renderEndpointComponent = () => {
        switch (selectedEndpoint) {
            case 'Create':
                return <CreateDirectory />;
            case 'List':
                return <ListDirectories />;
            case 'Search':
                return <IdDirectory />
            case 'Update':
                return <UpdateDirectory />
            case 'Delete':
                return <DeleteDirectory />
            case 'Status':
                return <Status />
            case 'Patch':
                return <PatchDirectory />
      // Agrega otros casos para cada endpoint adicional
        default:
            return null;
    }
  };

    return (
        <div>
        <h2>Seleccione un endpoint:</h2>
        <select value={selectedEndpoint} onChange={handleEndpointChange}>
            <option value="">Seleccione</option>
            <option value="Create">Crear Directorio</option>
            <option value="List">Ver Directorios</option>
            <option value="Search">Buscar Directorio</option>
            <option value="Update">Actualizar Directorio</option>
            <option value="Delete">Eliminar Directorio</option>
            <option value="Status">Status</option>
            <option value="Patch">Actualizar Parcialmente un Directorio</option>
            {/* Agrega otras opciones para cada endpoint adicional */}
        </select>
        {renderEndpointComponent()}
        </div>
    );
};

export default Menu;