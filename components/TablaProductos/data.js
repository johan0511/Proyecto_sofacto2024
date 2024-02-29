const columns = [
    { name: "PRODUCTO", uid: "nombre" },
    { name: "CATEGORIA", uid: "categoria" },
    { name: "PROVEEDOR", uid: "proveedor" },
    { name: "DESCRIPCION", uid: "descripcion" },
    { name: "FECHA INGRESO", uid: "fecha" },
    { name: "PRECIO", uid: "precio" },
    { name: "STATUS", uid: "status" },
    { name: "ACCIONES", uid: "actions" },
  ];
  
  const users = [
    {
      id: 1,
      nombre: "Yogurt Griego ",
      categoria: "Lacteo",
      proveedor: "Dejamu",
      descripcion: "1 Lt",
      fecha: "23/01/2024",
      precio: "22.000",
      status: "active",
    },
    {
      id: 2,
      nombre: "Queso Mozarella ",
      categoria: "Lacteo",
      proveedor: "Alpina",
      descripcion: " 5 Lb",
      fecha: "20/03/2024",
      precio: "17.900",
      status: "active",
    },
    {
      id: 3,
      nombre: "Salsa Tomate",
      categoria: "Salsas",
      proveedor: "Tomatico",
      descripcion: "2 Kl",
      fecha: "20/03/2024",
      precio: "30.900",
      status: "active",
    },
  ];
  
  export { columns, users };