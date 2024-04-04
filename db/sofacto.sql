CREATE DATABASE sofacto;
USE sofacto;

drop database sofacto;

CREATE TABLE Cargo (
  IdCargo VARCHAR(20) NOT NULL,
  Nombre_cargo VARCHAR(25) NOT NULL,
  PRIMARY KEY(IdCargo)
);

CREATE TABLE Categoria (
  IdCategoria INT AUTO_INCREMENT NOT NULL,
  Nombre_categoria VARCHAR(20) NOT NULL,
  PRIMARY KEY(IdCategoria)
); 

CREATE TABLE Cliente (
  IdCliente VARCHAR(15) PRIMARY KEY,
  Nombre_cliente VARCHAR(30),
  Apellido_cliente VARCHAR(30),
  IdTipo_identificacionFK VARCHAR(30),
  FOREIGN KEY (IdTipo_identificacionFK) REFERENCES Tipo_identificacion(IdTipo_identificacion)
);

CREATE TABLE Factura (
  IdFactura INT AUTO_INCREMENT PRIMARY KEY,
  IdProducto_FK VARCHAR(15) NOT NULL,
  Cantidad_productos INT NOT NULL,
  Precio_producto FLOAT NOT NULL,
  Total_pagar FLOAT NOT NULL,
  Fecha_venta DATE NOT NULL,
  IdMetodo_pagoFK VARCHAR(10) NOT NULL,
  IdCliente_FK VARCHAR(15) NOT NULL,
  FOREIGN KEY (IdProducto_FK) REFERENCES Productos(IdProducto),
  FOREIGN KEY (IdMetodo_pagoFK) REFERENCES Metodo_pago(IdMetodo_pago),
  FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente)
); 

CREATE TABLE Inventario (
  Entrada_prod DATE NOT NULL,
  Cantidad_prod INT NOT NULL,
  IdProductos_FK VARCHAR(15) NOT NULL,
  FOREIGN KEY (IdProductos_FK) REFERENCES Productos(IdProducto),
  PRIMARY KEY (Entrada_prod, IdProductos_FK)
); 

CREATE TABLE Metodo_pago (
  IdMetodo_pago INT AUTO_INCREMENT PRIMARY KEY,
  Metodo_pago VARCHAR(30) NOT NULL
); 

CREATE TABLE Productos (
  IdProducto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(30) NOT NULL,
  IdCategoria_FK INT NOT NULL,
  Proveedor VARCHAR(30) NOT NULL,
  Descripcion VARCHAR(50) NOT NULL,
  Fecha DATE NOT NULL,
  Estado VARCHAR(50) NOT NULL,
  Precio FLOAT NOT NULL,
  FOREIGN KEY (IdCategoria_FK) REFERENCES Categoria(IdCategoria)
);

SELECT Nombre, COUNT(*) AS Cantidad, Estado AS Disponibilidad
FROM Productos
WHERE Estado = 'Disponible'
GROUP BY Nombre, Estado;

CREATE TABLE ProductosDisponibles (
  Nombre varchar(30) NOT NULL,
  Cantidad INT NOT NULL,
  Disponibilidad ENUM('Disponible', 'Agotado') NOT NULL
);


CREATE TABLE Proveedor (
  IdProveedor INT AUTO_INCREMENT PRIMARY KEY,
  Empresa VARCHAR(25) NOT NULL,
  Contacto VARCHAR(13) NOT NULL
); 

CREATE TABLE Reporte_ventas (
  IdReporte_ventas INT AUTO_INCREMENT PRIMARY KEY,
  IdFactura_FK INT NOT NULL,
  IdCliente_FK VARCHAR(15) NOT NULL,
  FOREIGN KEY (IdFactura_FK) REFERENCES Factura(IdFactura),
  FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente)
); 

CREATE TABLE Usuario (
  IdTipo_identificacion VARCHAR(30) NOT NULL,
  IdUsuario VARCHAR(15) PRIMARY KEY,
  Correo VARCHAR(35) NOT NULL,
  Contrasena VARCHAR(20) NOT NULL,
  Verificar_Contrasena VARCHAR(20) NOT NULL,
  IdCargo VARCHAR(20) NOT NULL
); 

create table recuperar_contrasena as
SELECT Correo, Contrasena
FROM Usuario;

CREATE TABLE usuario_existente AS
SELECT Correo, Contrasena, IdCargo
FROM Usuario;


select * from usuario_existente;

CREATE TABLE Tipo_identificacion (
  IdTipo_identificacion INT AUTO_INCREMENT PRIMARY KEY,
  Tipo_identificacion VARCHAR(40) NOT NULL,
  Numero_id INT NOT NULL
);

CREATE TABLE Empleado (
  Id BIGINT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Nombre_cargo VARCHAR(20) NOT NULL,
  Estado_actual VARCHAR(20) NOT NULL
);

INSERT INTO Usuario (IdTipo_identificacion, IdUsuario, Correo, Contrasena, Verificar_Contrasena, IdCargo)
VALUES ('Cedula', 1089741258, 'Ediver@gmail.com', 'usuario256', 'usuario256', 'Administrador'),
       ('Cedula de Extranjeria', 1075624127, 'Steve@gmail.com', 'usuario691', 'usuario691', 'Empleado');

SELECT * FROM Usuario;

INSERT INTO Empleado (Id, Nombre, Nombre_cargo, Estado_actual)
VALUES (1075624127, 'Johan Stiven Casilimas Huertas', 'Empleado', 'Activo');


insert into Cargo(IdCargo, Nombre_cargo) 
values  ("C1",'Administrador'),
        ("C2",'Usuario');

insert into Categoria(Nombre_categoria) 
values  ('Quesos'),
        ('Panes'),
        ('Salsas'),
        ('Yogurth'),
        ('Embutidos');

insert into Tipo_identificacion(Tipo_identificacion, Numero_id ) 
values  ('Cedula de ciudadania', 1005851861),
        ('Cedula de extranjeria', 57896314);

insert into Metodo_pago(Metodo_pago) 
values  ('Efectivo'),
        ('Tarjeta debito o credito'),
        ('Nequi'),
        ('Daviplata');

insert into Productos( Nombre,  Nombre_categoria_FK, Proveedor, Descripcion,  Fecha, Estado, Precio ) 
values  ('Queso doble crema','lacteos', 'proveedor','Bloque de 2.5 kilos', '2024-01-1', 'activo',5500),
        ('Queso campesino', 'lacteos', 'proveedor','200 gramos', '2024-01-1','activo',6000),
        ('Yogurth de mora','lacteos', 'proveedor','4 litros', '2024-01-1','activo',10000),
        ('Chorizo', 'lacteos', 'proveedor', 'Cantidad x6', '2024-01-1', 'activo',4500),
        ('Pan hamburguesa', 'lacteos', 'proveedor', 'x8', '2024-01-1', 'activo',4000),
        ('Salsa de tomate','lacteos', 'proveedor', 'Cantidad 1 litro', '2024-01-1', 'activo',4500);
        
 

insert into Inventario(Entrada_prod, Cantidad_prod, IdProductos_FK) 
values  ('2023-01-1',7,'PR1'),
        ('2023-01-2',10,'PR2'),
        ('2023-01-3',12,'PR3'),
        ('2023-01-4',17,'PR4'),
        ('2023-01-5',9,'PR5'),
        ('2023-01-6',8,'PR6');

insert into Cliente(IdCliente, Nombre_cliente,Apellido_cliente,IdTipo_identificacionFK) 
values  ('1012323864','Juan','Gonzalez','CC'),
        ('1027582949','Kevin','Wilches','CC'),
        ('1005851861','Darwin','Carvajal','CC'),
        ('6666666666','Jhoan','Casimilas','CE');
        
insert into Proveedor(Empresa, Contacto) 
values  ('Colanta','321777'),
        ('Alpina','322666'),
        ('Bimbo','320111'),
        ('Zenu','323789'),
        ('Alqueria','319456'),
        ('San jorge','318123');


       

insert into Factura( IdFactura,  IdProducto_FK, Cantidad_productos, Precio_producto, Total_pagar,  Fecha_venta, IdMetodo_pagoFK, IdCliente_FK) 
values  ( 1, '5', 8, 1500, 3000, '2023-08-7', 'MP1', '1012323864'),
        ( 2, '5', 8, 1500, 3000, '2023-09-1', 'MP1', '1027582949'),
        ( 3, '5', 8, 1500, 3000, '2023-10-2', 'MP1', '1005851861'),
        ( 4, '5', 8, 1500, 3000, '2023-11-9', 'MP1', '6666666666');

insert into Reporte_ventas(IdFactura_FK, IdCliente_FK )
values  (1,'1012323864'),
        (2,'1027582949'),
        (3,'1005851861'),
        (4,'6666666666');


UPDATE Usuario
    SET Contrasena =
    REPLACE (REPLACE(REPLACE(REPLACE(REPLACE(Contrasena, 'e', '&'), 'a','@'), 'o','0'), 'i','/'), 'u', '#')
    WHERE IdUsuario='1012323869' and IdTipo_identificacionFK = 'CC';

UPDATE Usuario
    SET Contrasena =
    REPLACE (REPLACE(REPLACE(REPLACE(REPLACE(Contrasena, 'e', '&'), 'a','@'), 'o','0'), 'i','/'), 'u', '#')
    WHERE IdUsuario='1012323868 ' and IdTipo_identificacionFK = 'CE';

SELECT Contrasena,
    REPLACE (REPLACE(REPLACE(REPLACE(REPLACE(Contrasena, '&', 'e'), '@','a'), '0','o'), '/','i'), '#', 'u')
FROM usuario;



-- /Joins/

SELECT Usuario.IdUsuario, Usuario.Correo, Usuario.Contrasena, Usuario.IdEstado_FK, Cargo.Nombre_cargo
FROM Usuario
LEFT JOIN Cargo ON Usuario.IdCargo_FK = Cargo.IdCargo;

SELECT *
FROM Cliente
RIGHT JOIN Factura ON Cliente.IdCliente = Factura.IdCliente_FK;

SELECT *
FROM Productos
INNER JOIN Categoria ON Productos.IdCategoria_FK = Categoria.IdCategoria;

SELECT Cliente.da, Factura.da, Metodo_pago.Metodo_pago AS Nombre_Metodo_Pago
FROM Cliente
RIGHT JOIN Factura ON Cliente.IdCliente = Factura.IdCliente_FK
INNER JOIN Metodo_pago ON Factura.IdMetodo_pagoFK = Metodo_pago.IdMetodo_pago;

-- /Encontrar el inventario actual de productos, incluyendo su nombre y cantidad disponible/
SELECT Productos.Nombre, Inventario.Cantidad_prod
FROM Inventario
INNER JOIN Productos ON Inventario.IdProductos_FK = Productos.IdProducto;

SELECT
    C.IdCliente,
    C.Nombre_cliente,
    F.IdFactura,
    F.Fecha_venta,
    MP.Metodo_pago,
    DF.Cantidad_productos,
    DF.Precio_producto,
    DF.Total_pagar
FROM Cliente C
LEFT JOIN Factura F ON C.IdCliente = F.IdCliente_FK
LEFT JOIN Metodo_pago MP ON F.IdMetodo_pagoFK = MP.IdMetodo_pago
LEFT JOIN Detalle_factura DF ON F.IdFactura = DF.IdFactura_FK;

ALTER TABLE Inventario ADD FOREIGN KEY (IdProductos_FK) REFERENCES Productos(IdProducto);

ALTER TABLE Factura ADD FOREIGN KEY (IdMetodo_pagoFK) REFERENCES Metodo_pago(IdMetodo_pago);
ALTER TABLE Factura ADD FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente);

ALTER TABLE Reporte_ventas ADD FOREIGN KEY (IdFactura_FK) REFERENCES Factura(IdFactura);
ALTER TABLE Reporte_ventas ADD FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente);

ALTER TABLE Cliente ADD FOREIGN KEY (IdTipo_identificacionFK) REFERENCES Tipo_identificacion(IdTipo_identificacion);

ALTER TABLE Usuario ADD FOREIGN KEY (IdCargo_FK) REFERENCES Cargo(IdCargo);

ALTER TABLE Usuario ADD FOREIGN KEY (IdTipo_identificacionFK) REFERENCES Tipo_identificacion(IdTipo_identificacion);


/* Encuentra todos los clientes que han realizado compras.*/
SELECT IdCliente, Nombre_cliente
FROM Cliente
WHERE IdCliente IN (SELECT DISTINCT IdCliente_FK FROM Factura);

-- Actualizar
UPDATE Cliente
SET Nombre_cliente = 'Juan jose'
WHERE IdCliente = '1012323864';

-- /Asendiente/
SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
ORDER BY P.Precio DESC;
-- /Asendiente/
SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
ORDER BY P.Precio ASC;

-- Mayor o igual

SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
WHERE P.Precio >= 11000
ORDER BY P.Precio ASC;


-- Eliminar registros de la tabla Productos_proveedor
DELETE FROM Productos_proveedor;

drop database sofacto;

select * from Empleados;