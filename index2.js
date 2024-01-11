import guardarEnBaseDeDatos from "./utils/conexionbd.js"

// Pedir datos al usuario
let accionSnacks = prompt("¿Cuántas personas consumieron snacks al ver una película de acción?");
let accionNoSnacks = prompt("¿Cuántas personas no consumieron snacks al ver una película de acción?");
let comediaSnacks = prompt("¿Cuántas personas consumieron snacks al ver una película de comedia?");
let comediaNoSnacks = prompt("¿Cuántas personas no consumieron snacks al ver una película de comedia?");
let familiarSnacks = prompt("¿Cuántas personas consumieron snacks al ver una película familiar?");
let familiarNoSnacks = prompt("¿Cuántas personas no consumieron snacks al ver una película familiar?");

// Crear el objeto con los datos observados
const datosObservados = {
  Accion: { Snacks: accionSnacks, NoSnacks: accionNoSnacks },
  Comedia: { Snacks: comediaSnacks, NoSnacks: comediaNoSnacks },
  Familiar: { Snacks: familiarSnacks, NoSnacks: familiarNoSnacks }
};

// Calcular la frecuencia total
const total = Object.values(datosObservados).flatMap(Object.values).reduce((acc, val) => acc + parseInt(val), 0);

console.log("Total: ", total);


// Calcular las frecuencias esperadas
const frecuenciasEsperadas = {};
for (const genero in datosObservados) {
  frecuenciasEsperadas[genero] = {};
  for (const preferencia in datosObservados[genero]) {
    const frecuenciaEsperada = (Object.values(datosObservados[genero]).reduce((acc, val) => acc + parseInt(val), 0) / total) * Object.values(datosObservados[genero][preferencia]).reduce((acc, val) => acc + parseInt(val), 0);
    frecuenciasEsperadas[genero][preferencia] = Math.floor(frecuenciaEsperada);
  }
}


//Guardado en base de datos
const db = new sql.Database('localhost:3306/mi_base_de_datos');
guardarEnBaseDeDatos(datosObservados, db);
guardarEnBaseDeDatos(frecuenciasEsperadas, db);


// Calcular la estadística de la prueba de chi-cuadrado
const chiCuadrado = Object.entries(datosObservados).flatMap(([genero, preferencias]) => 
  Object.entries(preferencias).map(([preferencia, observado]) => {
    const esperado = frecuenciasEsperadas[genero][preferencia];
    return (observado - esperado)**2 / esperado;
  })
).reduce((acc, val) => acc + val, 0);

// Imprimir resultados
console.log("Frecuencias Observadas:", datosObservados);
console.log("Frecuencias Esperadas:", frecuenciasEsperadas);
console.log("Estadística de la prueba de Chi-cuadrado:", chiCuadrado);

// Comparar el resultado con el valor crítico
const gradosLibertad = (Object.keys(datosObservados).length - 1) * (Object.keys(datosObservados.Accion).length - 1);
const nivelSignificancia = 0.05; // Puedes cambiar este valor según tu criterio
const valorCritico = 11.0705923484375; // Este valor crítico se calcula con un nivel de significancia de 0.05 y 12 grados de libertad
console.log("Valor crítico:", valorCritico);

if (chiCuadrado > valorCritico) {
  console.log("Se rechaza la hipótesis nula. Hay evidencia suficiente para afirmar que el consumo de snacks depende del género de la película.");
} else {
  console.log("No se rechaza la hipótesis nula. No hay evidencia suficiente para afirmar que el consumo de snacks depende del género de la película.");
}