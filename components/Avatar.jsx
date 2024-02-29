import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";

export default function Avat() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "../src/img/gmail.png",
            }}
            className="transition-transform"
            name="Joguetta"
            description="Administrador"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="settings" color="primary">
            Actualizar perfil
          </DropdownItem>
          <DropdownItem key="logout" color="warning">
            Gestionar empleados
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
