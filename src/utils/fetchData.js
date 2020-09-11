// modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


// funcion principal
const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    // instanciamos la conexion
    const datos = new XMLHttpRequest();
    // abrir una conexion con el metodo, la ruta y si es asincrono
    datos.open('GET', url_api, true);
    // validacion del llamado
    datos.onreadystatechange = (() => {
      // comparamos el 4 porque eso indica que se completo la peticion
      if(datos.readyState === 4){
        // verificamos que el status este en 200, 200 es que es correcto
        datos.status === 200
          // si esta en 200
          ? resolve(JSON.parse(datos.responseText))
          // si no esta en 200
          : reject(newError('Error ' + url_api))
      }
    });
    // por ultimo enviamos la peticion
    datos.send();
  });
}

// exportamos la funcion
module.exports = fetchData;