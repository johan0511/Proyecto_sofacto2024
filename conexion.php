<?php
$conexion=mysqli_init();
mysqli_ssl_set($conexion, NULL, NULL, "ssl/BaltimoreCyberTrustRoot.crt.pem", NULL, NULL);
mysqli_real_connect($conexion, "sofacto.mysql.database.azure.com", "Johan", "J1075624127.", "sofacto", 3306,
    MYSQLI_CLIENT_SSL) or die ("Error al conectar" . mysqli_error());
?>