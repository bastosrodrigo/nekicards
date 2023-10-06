CREATE TABLE Profiles (
    id SERIAL NOT NULL PRIMARY KEY,
    nomeCompleto VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nomeSocial VARCHAR(100),
    dataNascimento VARCHAR(10) NOT NULL,
    foto VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    linkedin VARCHAR(20),
    github VARCHAR(20),
    instagram VARCHAR(20),
    facebook VARCHAR(20)
);

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    profile_id BIGINT,
    FOREIGN KEY (profile_id) REFERENCES Profiles(id)
);
