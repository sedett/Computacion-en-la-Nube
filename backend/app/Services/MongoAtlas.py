from typing import List
from pymongo import MongoClient


class MongoDBConnector:
    def __init__(self):
        connection_string = "mongodb+srv://admin:Fresa.12@cluster0.cvzhqtt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
        self.client = MongoClient(connection_string)
    
    #Funcion que insertadatos en la tabla usuarios
    #
    def insert_Users(self, document): 
        database_name = "Compu_nube"
        collection_name = "Users"
        db = self.client[database_name]
        collection = db[collection_name]
        
        result = collection.insert_one(document.__dict__)
        return result.inserted_id
    
    #Funcion que busca todos los usuarios en la tabla users
    #
    def read_Users(self): 
        # Conectarse a la base de datos en MongoDB Atlas
        db = self.client['Compu_nube']
        collection = db['Users']
        # Realizar la búsqueda del usuario por nombre
        usuarios = collection.find()
        lista = []
        for usuario in usuarios:
            dic = {}
            dic["id"] = str(usuario['id'])
            dic["path"] = usuario['path']
            dic["name"] = usuario['name']
            dic["emails"] = usuario['emails']
            lista.append(dic)
        # Imprimir los resultados
        return lista
    
    
    #Funcion que Busca en la tabla un ID
    #
    def read_Id(self, id):
        # Conectarse a la base de datos en MongoDB Atlas
        db = self.client['Compu_nube']
        collection = db['Users']
        # Realizar la búsqueda del usuario por id
        usuarios = collection.find()
        dic = {}
        for usuario in usuarios:
            if usuario['id'] == id:
                dic["id"] = str(usuario['id'])
                dic["path"] = usuario['path']
                dic["name"] = usuario['name']
                dic["emails"] = usuario['emails']
        # Imprimir los resultados
        return dic
    # Función para actualizar un registro por ID en la tabla Users   
    #
    def delete_Id(self, id):
        # Conectarse a la base de datos en MongoDB Atlas
        db = self.client['Compu_nube']
        collection = db['Users']
        # Eliminar el registro que coincide con el ID
        result = collection.delete_one({"id": id})
        # Verificar si se eliminó correctamente
        if result.deleted_count == 1:
            return "Registro eliminado exitosamente."
        else:
            return "No se encontró ningún registro coincidente."

#actializando 

    # Función para actualizar un registro por ID en la tabla Users   
        #
        def update_Id(self, id):
            # Conectarse a la base de datos en MongoDB Atlas
            db = self.client['Compu_nube']
            collection = db['Users']

            # Eliminar el registro que coincide con el ID
            result = collection.delete_one({"id": id})

            # Verificar si se eliminó correctamente
            if result.deleted_count == 1:
                return "Registro eliminado exitosamente."
            else:
                return "No se encontró ningún registro coincidente."