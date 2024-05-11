from typing import List
from fastapi import APIRouter, HTTPException
from Services.MongoAtlas import MongoDBConnector
from models import DirectoryItem
from fastapi import Body
import json

# Crea un nuevo enrutador (router) para la ruta "/directories"
# y le asigna la etiqueta "directories"
router = APIRouter(
    prefix="/directories",
    tags=["directories"],
)




directories = [
   DirectoryItem(id=1, name="Directorio 1", path="/directorio1", created_at="2024-05-10 12:00:00", updated_at="2024-05-10 12:00:00",emails=["usuario1@ejemplo.com","usuario2@ejemplo.com.mx","usuario3@ejemplo.org","usuario4@ejemplo.net"]),
   DirectoryItem(id=2, name="Directorio 2", path="/directorio2", created_at="2024-05-10 12:30:00", updated_at="2024-05-10 12:30:00",emails=["usuario5@ejemplo.com","usuario6@ejemplo.com.mx","usuario7@ejemplo.org","usuario8@ejemplo.net"]),
   DirectoryItem(id=3, name="Directorio 3", path="/directorio3", created_at="2024-05-10 13:00:00", updated_at="2024-05-10 13:00:00",emails=["usuario9@ejemplo.com","usuario10@ejemplo.com.mx","usuario11@ejemplo.org","usuario12@ejemplo.net"]),
]




# Definición del endpoint GET /directories/
# Busca a todos los usuarios
@router.get("/")
def list_directories():
    connector = MongoDBConnector()
    usuarios = connector.read_Users()
    return usuarios


# Definición del endpoint POST /directories/
# Crea un nuevo directorio y lo agrega a la lista de directorios
@router.post("/")
def create_directory(directory: DirectoryItem):

    connector = MongoDBConnector()
    if (connector.read_Id(directory.id)):
        raise HTTPException(status_code=409, detail="User already exist")

    connector.insert_Users(directory)
    return directory


# Definición del endpoint GET /directories/{id}
# Obtiene un directorio específico por su ID
# Si no se encuentra, lanza una excepción HTTP 404
@router.get("/{id}")
def get_directory(id: int):
    connector = MongoDBConnector()
    usuario = connector.read_Id(id)
    return usuario
    raise HTTPException(status_code=404, detail="Directory not found")


# Definición del endpoint PUT /directories/{id}
# Actualiza un directorio existente por su ID
# Si no se encuentra, lanza una excepción HTTP 404
@router.put("/{id}")
def update_directory(id: int, directory: DirectoryItem):
    
    connector = MongoDBConnector()
    # Eliminar el objeto problemático
    connector.delete_Id(id)
    # Volver a subir el objeto corregido
    connector.insert_Users(directory)  


# Definición del endpoint PATCH /directories/{id}
# Actualiza parcialmente un directorio existente por su ID
# Si no se encuentra, lanza una excepción HTTP 404
@router.patch("/{id}")
def patch_directory(id: int, directory: DirectoryItem = Body(..., embed=True)):
    for i, d in enumerate(directories):
        if d.id == id:
            for key, value in directory.dict(exclude_unset=True).items():
                setattr(directories[i], key, value)
            return directories[i]
    raise HTTPException(status_code=404, detail="Directory not found")


# Definición del endpoint DELETE /directories/{id}
# Elimina un directorio existente por su ID
# Si no se encuentra, lanza una excepción HTTP 404
@router.delete("/{id}")
def delete_directory(id: int):
    connector = MongoDBConnector()
    usuario = connector.delete_Id(id)
    print(usuario)
    return usuario
    raise HTTPException(status_code=404, detail="Directory not found")