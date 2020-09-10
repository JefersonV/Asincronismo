// instanciamos el XML Sx: require('nombre_consola').nombre_archivo;
// guardo en la variable el valor del archivo XMLHttpRequest
let request = require("xmlhttprequest").XMLHttpRequest;

// API, guardamos la api en una variable 
const API = 'https://rickandmortyapi.com/api/character/';

/* funcion que nos permite traer la informacion desde nuestra API, 
recibe un callback y desencadena los llamados que necesitamos. */
function fetchData(url_api, callback) {
    /* construimos la peticion por xmlhttprequest generando
     la referencia al objeto que necesito */
    let datos = new request();
    // hacemos el llamado a una url 
    datos.open('GET', url_api, true); /* el true activa el asincronismo  */
    // escucho lo que hace la conexion 
    datos.onreadystatechange = function (e) {
        // validamos para saber si fue exitoso todo
        if (datos.readyState === 4) {
            // saber el status 
            if (datos.status === 200) {
                /* regresamos el callback si todo sale bien, responseText
                 me lo convierte de object a string */
                callback(null, JSON.parse(datos.responseText));
            } else { /* si las cosas no salen bien le pasamos la url y el estado */
                const error = newError('Error' + url_api + ' paso esto: ' + datos.status);
                /* al final retornamos el callback con un msj de error
                 y un null ya que no se desencadena nada */ 
                return callback(error, null);
            }
        }
    }
    // enviamos la solicitud con send().
    datos.send();
}

/* --------- MÚLTIPLES PETICIONES A UNA API CON CALLBACKS --------- */

// primero buscamos la lista de personajes
fetchData(API, (error1, data1) => {
    // si error, matamos retornando un error
    if(error1) return console.error(error1);
    // luego buscamos en la api el id de Rick
    fetchData(API + data1.results[0].id, (error2, data2) => {
      // si error, matamos retornando un error
      if(error2) return console.error(error2);
      // por ultimo la consulta a la api que contiene su dimension
      fetchData(data2.origin.url, (error3, data3) => {
        // si error, matamos retornando un error
        if(error3) return console.error(error3);
        
        // mostramos los resultados :) 
        console.log(data1.info.count);
        console.log(data2.name);
        console.log(data3.dimension);
        
        // rutas de las peticiones en orden
        console.log(API);
        console.log(API + data1.results[0].id); 
        console.log(data2.origin.url); 
      
      });
    });
  });