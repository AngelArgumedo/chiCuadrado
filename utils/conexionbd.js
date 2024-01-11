function guardarEnBaseDeDatos(datos, db) {
  // Conectar con la base de datos
  const connection = db.connect();

  // Crear una transacción
  const transaction = connection.beginTransaction();

  // Guardar `datosObservados`
  for (const [genero, preferencias] of Object.entries(datosObservados)) {
    for (const [preferencia, valor] of Object.entries(preferencias)) {
      // Insertar una nueva fila en la tabla `datosObservados`
      connection.query(`
        INSERT INTO datosObservados (genero, preferencia, valor)
        VALUES (?, ?, ?)`,
        [genero, preferencia, valor]);
    }
  }

  // Guardar `frecuenciasEsperadas`
  for (const [genero, preferencias] of Object.entries(frecuenciasEsperadas)) {
    for (const [preferencia, valor] of Object.entries(preferencias)) {
      // Insertar una nueva fila en la tabla `frecuenciasEsperadas`
      connection.query(`
        INSERT INTO frecuenciasEsperadas (genero, preferencia, valor)
        VALUES (?, ?, ?)`,
        [genero, preferencia, valor]);
    }
  }

  // Confirmar la transacción
  transaction.commit();

  // Cerrar la conexión con la base de datos
  connection.close();
}


export default guardarEnBaseDeDatos;
