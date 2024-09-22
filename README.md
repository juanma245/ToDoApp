# To Do App 

### Funcionalidades de la app

- Crear usuarios únicos
- Crear y editar tareas
- Marcar tareas como completadas o pendientes
- Eliminar tareas

### instrucciones de instalación

##### Clonación del repositorio

`git clone https://github.com/juanma245/ToDoApp.git`

##### Instalación de dependencias

dentro de la carpeta de backend y ToDoFront

`npm install`

##### Base de datos

El archivo de creación de la base de datos se encuentra en la carpeta principal, para que se cree la base de datos en el gestor MySQL de preferencia

> Las variables de conexión deben ser ajustadas a su base de datos en el archivo database.js

##### archivo config.js

se recomienda generar una nueva y única clave secreta para la encriptación JWT

### Ejecución de la aplicación

##### Dentro de la carpeta ToDoFont

`npm run dev`

##### Dentro de la carpeta backend

`node ToDoApp.js` o `node --watch ToDoApp.js`

### Posibles problemas 

##### Puerto de backend en uso 

Si el puerto de backend ya está en uso, debe cambiar el valor de port en el archivo ToDoApp.js

    const port = 3002;

##### Error CORS

debe agregar la url de su front en el atributo origin del cors en el archivo ToDoApp.js

    app.use(cors({
      origin : 'http://localhost:5173',
      methods: ['GET', 'POST', 'DELETE', 'PUT','OPTIONS','PATCH'],
      credentials : true
    }))


