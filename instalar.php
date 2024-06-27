<?php
session_start();
if(isset($_SESSION["usuario"])){
    include 'conexion.php';
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $proveedor = $_POST['proveedor'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    // Assuming categoria is submitted as the ID, not the name
    $sentencia = "INSERT INTO productos(Nombre, Nombre_categoria_FK, Proveedor, Descripcion, Fecha, Estado, Precio) 
                  VALUES ('$nombre', '$categoria', '$proveedor', '$descripcion', CURDATE(), 'Disponible', '$precio')";
    
    if(mysqli_query($conexion, $sentencia)){
        header("Location: visualizar_productos.php");
    } else {
        die("Error en la inserción: " . mysqli_error($conexion));
    }
} else {
    header("Location: index.php");
}
?>