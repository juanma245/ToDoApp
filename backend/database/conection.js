import mysql from 'mysql2/promise';

//Creación del pool para realizar las consultas en la base de datos
export const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'toDoAppDatabase'
  });