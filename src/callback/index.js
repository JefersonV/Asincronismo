
/* -------- Ejemplo 1 -------- */
function sum(num1,num2){
    return num1+num2
}
//por estándar se le pone el nombre callback
function calc(num1,num2,callback){
    return callback(num1,num2)
}
console.log(calc(2,2,sum))
/* Buena práctica generar scripts para 
hacer callback de manera correcta
está hecho en el archivo package.json */

//SETTIMEOUT()

/* -------- Ejemplo 2 -------- */
function date(callback){
    console.log(new Date)
    setTimeout(function(){
        let date = new Date;
        callback(date)
    },3000)
}

function printDate(dateNow){
    console.log(dateNow)
}

date(printDate)