CREATE TABLE datosObservados (
  id INT NOT NULL AUTO_INCREMENT,
  genero VARCHAR(255) NOT NULL,
  preferencia VARCHAR(255) NOT NULL,
  valor INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE frecuenciasEsperadas (
  id INT NOT NULL AUTO_INCREMENT,
  genero VARCHAR(255) NOT NULL,
  preferencia VARCHAR(255) NOT NULL,
  valor INT NOT NULL,
  PRIMARY KEY (id)
);