const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');
const databaseConnection=require('./databaseConnection.js');
const UserRoutes=require('./routes/UserRoutes.js')

//crear una instancia de express
const app=express();


//configuramos el acceso a las variables de entorno
require('dotenv').config();

//conexion a la base de datos
databaseConnection();

//se configura el puerto donde se va a ejecutar nuestro servidor-backend
app.set('port', process.env.PORT || 9001);

//ponemos a escuchar en un puerto a nuestro backend
app.listen(app.get('port'), ()=>{console.log(`BACKEND PRODUCTS LISTENING IN PORT ${app.get('port')}`);});
console.log('probando la actualización de nodemon');

//middlewares: congig extras del backend que se ejecutan antes de las rutas
//1- middlewares nativos de express
app.use(express.json()); //permite recibir objetos en formato json.
app.use(express.urlencoded({extended:true})); //permite recibir ojetos de tood tipo en las peticiones.
//2- middlewars de terceros
app.use(morgan('dev')); //proporciona detalles de las peticiones en la terminal.
app.use(cors()); //permite las peticiones remotas.

//cargar archivos estaticos que va a ser el index.html
//console.log(__dirname, 'DIRNAME');
app.use(express.static(path.join(__dirname,'../public')));


//creamos una ruta de prueba
/*TIPOS DE PETICIONES:
GET: obtener, pedir leer.
PUT / PATCH: actualizar.
POST: crear y enviar informacion desde el cliente(fron) al backend o servidor.
DELETE: borrar, eliminar.
*/
//1-req=request(contiene toda la informacion de la petición del cliente al servidor)
//2-res=response(contiene toda la informacion de la respuesta del servidor al cliente)
//3-next o nextFunction= indica que continue con la siquiente funcion o middleware
app.get('/test', async(req, res, next)=>{
    try {
        console.log('REQUEST-->', req);
        return res.status(200).json({success:true, message:'API IS ALIVE'});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

UserRoutes('/users', app);
