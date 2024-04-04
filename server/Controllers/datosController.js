const db = require("../Models/database").promise();

const obtenerProductos = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT p.IdProducto, p.Nombre, p.Nombre_categoria_FK AS idCategoria, c.Nombre_categoria, p.Proveedor, p.Descripcion, p.Fecha, p.Estado, p.Precio
      FROM Productos p
      INNER JOIN Categoria c ON p.Nombre_categoria_FK = c.Id_categoria;
    `);
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM Productos WHERE IdProducto = ?",
      [id]
    );
    res.json(result[0] || {});
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el producto." });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO Productos (Nombre, Nombre_categoria_FK, Proveedor, Descripcion, Fecha, Estado, Precio) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.Nombre,
        body.Nombre_categoria_FK,
        body.Proveedor,
        body.Descripcion,
        body.Fecha,
        body.Estado,
        body.Precio,
      ]
    );
    res.json({ message: "Producto creado correctamente", id: result.insertId });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear el producto." });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Nombre,
      Proveedor,
      Descripcion,
      Fecha,
      Estado,
      Precio,
      Nombre_categoria,
    } = req.body;

    // Obtener el ID de la categoría basado en el nombre
    const [categoriaResult] = await db.query(
      "SELECT Id_categoria FROM Categoria WHERE Nombre_categoria = ?",
      [Nombre_categoria]
    );

    if (categoriaResult.length === 0) {
      return res
        .status(400)
        .json({ error: "La categoría especificada no existe." });
    }

    const Nombre_categoria_FK = categoriaResult[0].Id_categoria;

    // Actualizar las columnas en la tabla 'Productos', incluyendo la clave foránea
    await db.query(
      "UPDATE Productos SET Nombre = ?, Proveedor = ?, Descripcion = ?, Fecha = ?, Estado = ?, Precio = ?, Nombre_categoria_FK = ? WHERE IdProducto = ?",
      [
        Nombre,
        Proveedor,
        Descripcion,
        Fecha,
        Estado,
        Precio,
        Nombre_categoria_FK,
        id,
      ]
    );
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

const agregarCantidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    // Obtener la cantidad actual del producto
    const [productoResult] = await db.query(
      "SELECT Descripcion FROM productos WHERE IdProducto = ?",
      [id]
    );

    if (productoResult.length === 0) {
      return res.status(404).json({ error: "El producto no existe." });
    }

    const cantidadActual = parseFloat(productoResult[0].Descripcion);
    const nuevaCantidad = cantidadActual + parseFloat(cantidad);

    // Actualizar la cantidad del producto
    await db.query(
      "UPDATE productos SET Descripcion = ? WHERE IdProducto = ?",
      [nuevaCantidad, id]
    );

    res.json({ message: "Cantidad agregada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al agregar cantidad al producto." });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar primero los registros relacionados en la tabla Inventario
    await db.query("DELETE FROM Inventario WHERE IdProducto_FK = ?", [id]);

    // Eliminar el producto de la tabla Productos
    await db.query("DELETE FROM Productos WHERE IdProducto = ?", [id]);

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
};

const venderProducto = async (req, res) => {
  try {
    const productosVendidos = req.body.productosVendidos;

    // Actualizar la cantidad (Descripcion) de cada producto vendido en la base de datos
    for (const producto of productosVendidos) {
      const { Nombre, cantidadVendida } = producto;

      // Obtener la cantidad actual del producto
      const [productoResult] = await db.query(
        "SELECT Descripcion FROM Productos WHERE Nombre = ?",
        [Nombre]
      );

      if (productoResult.length === 0) {
        return res.status(404).json({ error: "El producto no existe." });
      }

      const cantidadActual = parseFloat(productoResult[0].Descripcion);
      const nuevaCantidad = cantidadActual - cantidadVendida;

      // Verificar si la cantidad vendida es mayor que la cantidad actual en el inventario
      if (nuevaCantidad < 0) {
        return res.status(400).json({
          error: `No hay suficiente cantidad en el inventario para el producto ${Nombre}.`,
        });
      }

      // Actualizar la cantidad del producto en el inventario
      await db.query("UPDATE Productos SET Descripcion = ? WHERE Nombre = ?", [
        nuevaCantidad.toString(),
        Nombre,
      ]);
    }

    res.json({ message: "Productos vendidos correctamente." });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al vender los productos." });
  }
};

const obtenerProductosDisponibles = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT p.IdProducto, p.Nombre, p.Nombre_categoria_FK AS idCategoria, c.Nombre_categoria, p.Proveedor, p.Descripcion, p.Fecha, p.Estado, p.Precio
      FROM Productos p
      INNER JOIN Categoria c ON p.Nombre_categoria_FK = c.Id_categoria
      WHERE p.Estado = 'Disponible';
    `);
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "Error al obtener los productos disponibles." });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  agregarCantidad,
  eliminarProducto,
  venderProducto,
  obtenerProductosDisponibles,
};
