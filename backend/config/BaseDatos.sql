//Base de datos para sistema de alquiler de carros / MySQL
create database Alquiler_carros;
use Alquiler_carros;

create table Clientes (
	cliente_id int auto_increment primary key,
    nombre varchar(100) not null,
    licencia varchar(100) not null,
    email varchar(100) not null,
    telefono varchar(30) not null
);

create table Categoria (
	categoria_id int auto_increment primary key,
    nombre varchar(50) not null,
    costo_por_dia decimal (10,2) not null
);

create table Carros (
	carro_id int auto_increment primary key,
    placa varchar(20) unique not null,
    marca varchar(50) not null,
    modelo varchar(50) not null,
    estado enum('disponible','alquilado','mantenimiento') default 'disponible',
    categoria_id int,
    foreign key (categoria_id) references Categoria(categoria_id)
);

create table alquiler (
	alquiler_id int auto_increment primary key,
    cliente_id int,
    carro_id int,
    costo_total decimal(10,2),
    foreign key (cliente_id) references Clientes(cliente_id),
    foreign key (carro_id) references Carros(carro_id)
);

create table Sucursal (
	sucuersal_id int auto_increment primary key,
    nombre varchar(100) not null,
    direccion varchar(200)
);

create table Empleado (
	empleado_id int auto_increment primary key,
    nombre varchar(100) not null,
    cargo enum('administrativo','gerente','vendedor') not null,
    sucursal_id int,
    foreign key(sucursal_id) references Sucursal (sucuersal_id)
);

select * from alquiler_carros.clientes;

create table Entrega (
	entrega_id int auto_increment primary key,
    alquiler_id int,
    fecha_entrega date,
    sucursal_id int,
    empleado_id int,
    estado_vehiculo enum('limpio','dañado','revisado') not null,
    foreign key (alquiler_id) references alquiler(alquiler_id),
    foreign key (sucursal_id) references Sucursal(sucuersal_id),
    foreign key (empleado_id) references Empleado(empleado_id)
);

create table Devolucion (
	devolucion_id int auto_increment primary key,
    alquiler_id int,
    fecha_devolucion date,
    sucursal_id int,
    empleado_id int,
    estado_carro enum ('limpio','dañado','revisado') not null,
    foreign key (alquiler_id) references alquiler(alquiler_id),
    foreign key (sucursal_id) references Sucursal(sucuersal_id),
    foreign key (empleado_id) references Empleado(empleado_id)
);

create table Pago(
	pago_id int auto_increment primary key,
    monto decimal (10,2) not null,
    metodo_pago enum ('efectivo','tarjeta','transferencia') not null,
    estado enum ('pendiente','completado','cancelado') not null,
    alquiler_id int,
    foreign key (alquiler_id) references alquiler(alquiler_id)
);

create table Usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'empleado', 'cliente') NOT NULL DEFAULT 'cliente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Empleado DROP FOREIGN KEY empleado_ibfk_1;
ALTER TABLE Empleado DROP FOREIGN KEY empleado_ibfk_2;

ALTER TABLE Entrega DROP FOREIGN KEY entrega_ibfk_1;
ALTER TABLE Entrega DROP FOREIGN KEY entrega_ibfk_2;
ALTER TABLE Entrega DROP FOREIGN KEY entrega_ibfk_3;

ALTER TABLE Clientes 
ADD COLUMN usuario_id INT UNIQUE,
ADD CONSTRAINT fk_cliente_usuario FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id);

ALTER TABLE Empleado
ADD COLUMN usuario_id INT UNIQUE,
ADD CONSTRAINT fk_empleado_usuario FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id);

ALTER TABLE Empleado
ADD CONSTRAINT fk_empleado_sucursal FOREIGN KEY (sucursal_id) REFERENCES Sucursal(sucuersal_id);

ALTER TABLE Entrega
ADD CONSTRAINT fk_entrega_alquiler FOREIGN KEY (alquiler_id) REFERENCES alquiler(alquiler_id),
ADD CONSTRAINT fk_entrega_sucursal FOREIGN KEY (sucursal_id) REFERENCES Sucursal(sucuersal_id),
ADD CONSTRAINT fk_entrega_empleado FOREIGN KEY (empleado_id) REFERENCES Empleado(empleado_id);

ALTER TABLE alquiler
ADD COLUMN fecha_inicio DATE NOT NULL,
ADD COLUMN fecha_fin DATE NOT NULL,
ADD COLUMN estado ENUM('reservado','activo','finalizado','cancelado') NOT NULL DEFAULT 'reservado',
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE Carros
ADD COLUMN año INT NOT NULL AFTER modelo;

ALTER TABLE Carros CHANGE COLUMN año anio INT NOT NULL;

select * from categorias