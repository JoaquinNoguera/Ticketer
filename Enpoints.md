# Enpoints

## /api

### /users
POST: Crear un usuario nuevo

#### /:id
PATCH: Cambiar la contraseña

#### /login
POST: Loguear un usuario, devuelve todos sus datos

### /projects
GET: Devuelve todos los proyectos en los que está un usuario

POST: Crea un pryecto bajo el nombre de un usuario

#### /:id
PATCH: Modifica los parametros del proyecto (menos lo relacionado a miembros)

DELETE: Elimina el proyecto

##### /users
POST: Agrega un miembro al proyecto

###### /:id
DELETE: Eliminar un usuario de un proyecto

##### /tickets
GET: Devuelve todos los tickets del proyecto

POST: Crea un ticket en el proyecto

###### /:id
PATCH: Modifica los datos del ticket

DELETE: Elimina el ticket