create database if not exists toDoAppDatabase;

#drop database todoappdatabase;

use toDoAppDatabase;
create table if not exists usuario(
	idUsuario int(10) not null auto_increment,
    nombre varchar(50) not null,
    usuario varchar(50) not null,
    contrasenia varchar(255) not null,
    primary key(idUsuario)
);

create table if not exists tarea(
	idTarea int(10) not null auto_increment,
    titulo varchar(50) not null,
    descripcion varchar(200),
    estado varchar(20),
    usuario int(10),
    primary key(idTarea),
    constraint usuarioTarea
    foreign key(usuario)
    references usuario(idUsuario)
);

