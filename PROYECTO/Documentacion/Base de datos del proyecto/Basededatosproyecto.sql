create database sofacto;
    use sofacto;


CREATE TABLE Cargo (
  IdCargo VARCHAR(20) NOT NULL,
  Nombre_cargo varchar(25) NOT NULL,
  primary key(IdCargo)
);


CREATE TABLE Categoria (
  IdCategoria INT AUTO_INCREMENT NOT NULL,
  Nombre_categoria varchar(20) NOT NULL,
  primary key(IdCategoria)
); 


CREATE TABLE Cliente (
  IdCliente varchar(15),
  Nombre_cliente varchar(30),
  Apellido_cliente varchar(30),
  IdTipo_identificacionFK VARCHAR(10),
  primary key(IdCliente)
);


CREATE TABLE Detalle_factura (
  IdDetalle_factura INT AUTO_INCREMENT NOT NULL,
  Cantidad_productos INT NOT NULL,
  Precio_producto float NOT NULL,
  Total_pagar float NOT NULL,
  IdFactura_FK INT NOT NULL,
  IdProducto_FK varchar(12) NOT NULL,
  primary key(IdDetalle_factura)
); 


CREATE TABLE Estado (
  IdEstado varchar(10) NOT NULL,
  Estado varchar(25) NOT NULL,
  primary key(IdEstado)
);


CREATE TABLE Factura (
  IdFactura INT AUTO_INCREMENT NOT NULL,
  Fecha_venta date NOT NULL,
  IdMetodo_pagoFK varchar(10) NOT NULL,
  IdCliente_FK varchar(15) NOT NULL,
  primary key(IdFactura)
); 


CREATE TABLE Inventario (
  IdInventario INT AUTO_INCREMENT NOT NULL,
  Entrada_prod date NOT NULL,
  Cantidad_prod INT NOT  NULL,
  IdProductos_FK varchar(12) NOT NULL,
  primary key(IdInventario)
); 


CREATE TABLE Metodo_pago (
  IdMetodo_pago varchar(10) NOT NULL,
  Metodo_pago varchar(30) NOT NULL,
  primary key(IdMetodo_pago)
); 


CREATE TABLE Productos (
  IdProducto varchar(12) NOT NULL,
  Nombre varchar(30) NOT NULL,
  Fecha_vencimiento date NOT NULL,
  Descripcion varchar(50) NOT NULL,
  Precio float NOT NULL,
  Precio_entrada float NOT NULL,
  IdCategoria_FK INT NOT NULL,
  IdEstado_FK varchar(10) NOT NULL,
  primary key(IdProducto)
);

CREATE TABLE Productos_proveedor (
  IdProveedor_FK varchar(15) NOT NULL,
  IdProducto_FK varchar(12) NOT NULL
);


CREATE TABLE Proveedor (
  IdProveedor varchar(15) NOT NULL,
  Empresa varchar(25) NOT  NULL,
  Contacto varchar(13) NOT NULL,
  IdEstado_FK varchar(10) NOT NULL,
  primary key(IdProveedor)
); 


CREATE TABLE Reporte_ventas (
  IdReporte_ventas INT AUTO_INCREMENT NOT NULL,
  IdFactura_FK INT NOT NULL,
  IdCliente_FK varchar(15) NOT NULL,
  IdDetalle_facturaFK INT NOT NULL,
  primary key(IdReporte_ventas)
); 


CREATE TABLE Usuario (
  IdUsuario varchar(15) NOT NULL,
  Correo varchar(35) NOT NULL,
  Contrasena varchar(20) NOT  NULL,
  IdEstado_FK varchar(10) NOT NULL,
  IdCargo_FK VARCHAR(20) NOT NULL,
  IdTipo_identificacionFK VARCHAR(10) NOT NULL,
  primary key(IdUsuario)
); 

CREATE TABLE Tipo_identificacion(
  IdTipo_identificacion VARCHAR(10) NOT NULL,
  Tipo_identificacion VARCHAR(40) NOT NULL,
  primary key(IdTipo_identificacion)
);


ALTER TABLE Productos ADD FOREIGN KEY (IdEstado_FK) REFERENCES Estado(IdEstado);
ALTER TABLE Productos ADD FOREIGN KEY (IdCategoria_FK) REFERENCES Categoria(IdCategoria);

ALTER TABLE Inventario ADD FOREIGN KEY (IdProductos_FK) REFERENCES Productos(IdProducto);

ALTER TABLE Factura ADD FOREIGN KEY (IdMetodo_pagoFK) REFERENCES Metodo_pago(IdMetodo_pago);
ALTER TABLE Factura ADD FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente);

ALTER TABLE Reporte_ventas ADD FOREIGN KEY (IdFactura_FK) REFERENCES Factura(IdFactura);
ALTER TABLE Reporte_ventas ADD FOREIGN KEY (IdCliente_FK) REFERENCES Cliente(IdCliente);
ALTER TABLE Reporte_ventas ADD FOREIGN KEY (IdDetalle_facturaFK) REFERENCES Detalle_factura(IdDetalle_factura);

ALTER TABLE Detalle_factura ADD FOREIGN KEY (IdFactura_FK) REFERENCES Factura(IdFactura);
ALTER TABLE Detalle_factura ADD FOREIGN KEY (IdProducto_FK) REFERENCES Productos(IdProducto);

ALTER TABLE Cliente ADD FOREIGN KEY (IdTipo_identificacionFK) REFERENCES Tipo_identificacion(IdTipo_identificacion);

ALTER TABLE Proveedor ADD FOREIGN KEY (IdEstado_FK) REFERENCES Estado(IdEstado);

ALTER TABLE Productos_proveedor ADD FOREIGN KEY (IdProveedor_FK) REFERENCES Proveedor(IdProveedor);
ALTER TABLE Productos_proveedor ADD FOREIGN KEY (IdProducto_FK) REFERENCES Productos(IdProducto);

ALTER TABLE Usuario ADD FOREIGN KEY (IdEstado_FK) REFERENCES Estado(IdEstado);
ALTER TABLE Usuario ADD FOREIGN KEY (IdCargo_FK) REFERENCES Cargo(IdCargo);
ALTER TABLE Usuario ADD FOREIGN KEY (IdTipo_identificacionFK) REFERENCES Tipo_identificacion(IdTipo_identificacion);

insert into Estado(IdEstado, Estado) 
values  ('E1', 'Activo'),
        ('E2', 'Inactivo');

insert into Cargo(IdCargo, Nombre_cargo) 
values  ("C1",'Administrador'),
        ("C2",'Usuario');

insert into Categoria(Nombre_categoria) 
values  ('Quesos'),
        ('Panes'),
        ('Salsas'),
        ('Yogurth'),
        ('Embutidos');

insert into Tipo_identificacion(IdTipo_identificacion, Tipo_identificacion) 
values  ('CC','Cedula de ciudadania'),
        ('CE','Cedula de extranjeria');

insert into Metodo_pago(IdMetodo_pago, Metodo_pago) 
values  ('MP1', 'Efectivo'),
        ('MP2', 'Tarjeta debito o credito'),
        ('MP3', 'Nequi'),
        ('MP4', 'Daviplata');

insert into Productos(IdProducto, Nombre, Fecha_vencimiento, Descripcion, Precio, Precio_entrada, IdCategoria_FK, IdEstado_FK) 
values  ('PR1', 'Queso doble crema','2024-01-1','Bloque de 2.5 kilos',10000,5500,1,'E1'),
        ('PR2', 'Queso campesino','2024-02-6','200 gramos',11000,6000,1,'E1'),
        ('PR3', 'Yogurth de mora','2023-12-8','4 litros',20000,10000,4,'E1'),
        ('PR4', 'Chorizo','2023-11-1','Cantidad x6',8000,4500,5,'E1'),
        ('PR5', 'Pan hamburguesa','2024-08-6','x8',7000,4000,2,'E1'),
        ('PR6', 'Salsa de tomate','2024-05-1','Cantidad 1 litro',10000,4500,3,'E1');

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

insert into Usuario(IdUsuario, Correo, Contrasena, IdEstado_FK, IdCargo_FK, IdTipo_identificacionFK) 
values  ('1012323869','Ediver@gmail.com', lower('ingreso321'),'E1','C1','CC'),
        ('1012323868','Steve@gmail.com',lower('hola12'),'E1','C2','CE');

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


insert into Proveedor(IdProveedor, Empresa, Contacto, IdEstado_FK) 
values  ('12345','Colanta','321777','E1'),
        ('67891','Alpina','322666','E1'),
        ('98745','Bimbo','320111','E1'),
        ('64512','Zenu','323789','E1'),
        ('88844','Alqueria','319456','E1'),
        ('22000','San jorge','318123','E1');

insert into Productos_proveedor(IdProveedor_FK, IdProducto_FK) 
values  ('12345','PR1'),
        ('67891','PR2'),
        ('98745','PR3'),
        ('64512','PR4'),
        ('88844','PR5'),
        ('22000','PR6');

insert into Factura(Fecha_venta, IdMetodo_pagoFK, IdCliente_FK) 
values  ('2023-08-7', 'MP1', '1012323864'),
        ('2023-09-1', 'MP1', '1027582949'),
        ('2023-10-2', 'MP1', '1005851861'),
        ('2023-11-9', 'MP1', '6666666666');

insert into Detalle_factura(Cantidad_productos, Precio_producto, Total_pagar, IdFactura_FK, IdProducto_FK) 
values  (2, 1500, 3000, 1, 'PR1'),
        (3, 1000, 3000, 2, 'PR2'),
        (4, 1000, 4000, 3, 'PR3'),
        (1, 6000, 6000, 4, 'PR4');

insert into Reporte_ventas(IdFactura_FK, IdCliente_FK, IdDetalle_facturaFK) 
values  (1,'1012323864',1),
        (2,'1027582949',2),
        (3,'1005851861',3),
        (4,'6666666666',4);


/*Joins*/

SELECT Usuario.IdUsuario, Usuario.Correo, Usuario.Contrasena, Usuario.IdEstado_FK, Cargo.Nombre_cargo
FROM Usuario
LEFT JOIN Cargo ON Usuario.IdCargo_FK = Cargo.IdCargo;

SELECT *
FROM Cliente
RIGHT JOIN Factura ON Cliente.IdCliente = Factura.IdCliente_FK;

SELECT *
FROM Productos
INNER JOIN Categoria ON Productos.IdCategoria_FK = Categoria.IdCategoria;

SELECT Cliente.*, Factura.*, Metodo_pago.Metodo_pago AS Nombre_Metodo_Pago
FROM Cliente
RIGHT JOIN Factura ON Cliente.IdCliente = Factura.IdCliente_FK
INNER JOIN Metodo_pago ON Factura.IdMetodo_pagoFK = Metodo_pago.IdMetodo_pago;

/*Encontrar el inventario actual de productos, incluyendo su nombre y cantidad disponible*/
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

/* Encuentra todos los clientes que han realizado compras.*/
SELECT IdCliente, Nombre_cliente
FROM Cliente
WHERE IdCliente IN (SELECT DISTINCT IdCliente_FK FROM Factura);

/*Actualizar*/
UPDATE Cliente
SET Nombre_cliente = 'Juan jose'
WHERE IdCliente = '1012323864';

/*Asendiente*/
SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
ORDER BY P.Precio DESC;
/*Asendiente*/
SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
ORDER BY P.Precio ASC;
/*Mayor o igual*/

SELECT P.*, C.Nombre_categoria
FROM Productos AS P
JOIN Categoria AS C ON P.IdCategoria_FK = C.IdCategoria
WHERE P.Precio >= 11000
ORDER BY P.Precio ASC;


-- Eliminar registros de la tabla Productos_proveedor
DELETE FROM Productos_proveedor;



/*Borrar base de datos*/
drop database sofacto;


