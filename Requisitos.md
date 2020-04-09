# Documento de requerimientos

## Tecnologías
- Java Spring
- React
- Webpack
- Babel
- Postgres

## Requerimientos funcionales
- Cualquier persona se puede crear una cuenta
- Para poder interactuar con el sistema se deberá tener una cuenta
- El nombre de usuario tiene que ser único
- Un usuario puede crear un proyecto, indicando el nombre del mismo
- Un usuario puede ver todos los proyectos en los que está involucrado
- El creador del proyecto es miembro del proyecto
- Un creador de proyectoo puede eliminar miembros
- Cuando un miembro es eliminado, todos los tickets que estaba resolviendo pasan a pendiente
- Un usuario puede invitar a otro usuario a un proyecto que haya creado el
- Un proyecto tiene tickets, un ticket es una tarea para realizar
- Un ticket tiene un encabezado con un maximo de 140 caracteres describiendo la tarea
- Un ticket tiene un detalle sin limite de caracteres, donde se pueden escribir detlles adicionales para la ejecucion del mismo
- Los tickets se muestran separados dependiendo de su estado
- El estado de un ticket puede ser uno de los siguientes: pendiente, tomado, resuelto
- Un miembro de proyecto puede crear un ticket, que inicialmente se marcara como pendiente
- Un miembro de proyecto puede tomar un ticket si este se encuentra como pendiente
- Un miembro de proyecto puede marcar un ticket como resuelto, siempre y cuando lo este resolviendo
- Se puede visualizar quien esta trabajando en un ticket y quien lo resolvio
- Un miembro de proyecto no puede trabajar en mas de tres tickets a la vez
- Un miembro de proyecto puede abandonar un ticket, este volvera a estado pendiente
- Un miembro de proyecto puede editar un ticket siempre y cuando este no este tomado por otro miembro o se encuentre marcado como resuelto
- Un miembro de proyecto puede marcar un ticket resuelto como pendiente nuevamente
- Un miembro de proyecto puede eliminar un ticket siempre y cuando este no esté tomado por otro miembro
- Un creador de proyecto puede dar de baja un proyecto, haciendo que ningun miembro pueda siquiera verlo o acceder
- Un miembro puede darse de baja de un proyecto
- Un usuario puede modificar su contraseña

## Requerimientos no funcionales
- Sanitizar todas las entradas de usuario para evitar inyecciones

## Detalles
### Cuenta y usuarios
Datos de la cuenta:
- nombre: único, solo números y letras, entre 4 y 20 caracteres
- contraseña: solo números y letras, entre 8 y 30 caracteres

No se puede modificar el nickname, solo la contraseña

### Tickets
El encabezado tiene un maximo de 140 caracteres, describe la tarea.
El cuerpo no tiene limite de caracteres, da detalles de la tarea.
Se puede editar o eliminar siempre y cuando no este tomado por otro.
Cada ticket tiene un estado: pendiente, tomado, resuelto.

### Historial
Cada entrada se compone de:
- Accion:
  * Crear ticket
  * Editar ticket
  * Eliminar ticket
  * Resolver ticket
  * Tomar ticket
  * Abandonar ticket
  * Reactivar ticket
  * Eliminar miembro
  * Agregar miembro
 - Fecha y hora
 - Miembro involucrado
 
### UI y mas

Dentro de la aplicacion una nav-bar es visible en todo momento, mostrado el nombre de usuario, el nombre de la aplicacion y dando la posibilidad de salir de la cuenta o configurarla

#### Pantallas
- Login y Signup
- Dashboard
- Proyecto
- Opciones de proyecto

##### Login y Signup
Se da la opcion de entrar o crearse una cuenta nueva, mostrando el formulario correspondiente en cada caso, en caso de exito en cualquiera de las dos acciones se redirige al dashboard.

##### Dashboard
Se muestran todos los proyectos en los que se está involucrado en forma de lista, indicando cuales son los que creo el usuario. Los proyectos se muestran en orden descendente por fecha de acceso.
Se permite crear un nuevo proyecto, al hacerlo se permite el ingreso del nombre del proyecto y un boton de confirmación.

##### Proyecto
Los tickets se muestran agrupados por categoría, cada categoría se muestra en una pestaña. Al hacer click en un ticket se abre un modal con el header y la descripcion, y se muestra un boton para habilitar su edición.

Cada ticket tiene controles, estos pueden ser:

- Eliminar: Pide confirmacion a travez de un dialogo. Cualquiera puede eliminar un ticket pendiente, si el ticket esta tomado, solo el que lo esta resolviendo lo puede eliminar. No se puede eliminar un ticket resuelto.
- Tomar: Visible cuando el ticket se encuentra pendiente, mueve el ticket a la categoría tomado.
- Resuelto: Marca el ticket como resuelto, solo esta disponible para el miembro que tomo el ticket.
- Reactivar: Se muestra en tickets resueltos, cualquiera puede hacerlo, marca el ticket como pendiente.

Se muestra un boton para acceder al historial que se despliega como modal, mostrando las acciones realizadas dentro de un rango de fechas elegibles por el usuario.

Se muestra un boton para crear un nuevo ticket, que despliega un modal con campos para su header y descripcion, y un boton para confirmar o cancelar.


##### Opciones de proyecto
Se muestran opciones para:
- Cambiar el nombre al proyecto
- Agregar miembro
- Borrar miembro
- Borrar proyecto
