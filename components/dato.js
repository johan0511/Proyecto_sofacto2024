const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Rol", uid: "role" },
  { name: "Estado actual", uid: "status" },
  { name: "Accion", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Darwin Carvajal",
    role: "Administrador",
    team: "Development",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "equipodesarrollador@gmail.com",
  },
  {
    id: 2,
    name: "Santiago Wilches",
    role: "Administrador",
    team: "Development",
    status: "active",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Johan Casilimas",
    role: "Administrador",
    team: "Development",
    status: "paused",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "Felipe Huertas",
    role: "Empleado",
    team: "Empleado",
    status: "active",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Helberth Gacha",
    role: "Empleado",
    team: "Empleado",
    status: "vacation",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export { columns, users };
