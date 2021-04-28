import * as React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setRoles?: any;
  roles: string[];
}

const RoleModal = ({ isOpen, onOpen, onClose, setRoles, roles }: Props) => {
  const [role, setRole] = React.useState("");

  const onRoleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addButton();
  };

  const addButton = () => {
    if (role === "") return;
    if (roles.includes(role.toLowerCase())) return;
    setRoles((old: string[]) => [...old, role]);
    setRole("");
  };

  const onModalClose = () => {
    setRole("");
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Rol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onRoleAdd}>
              <FormControl id="roleName" width="100%" isRequired>
                <FormLabel
                  fontWeight="bold"
                  fontSize="1.5rem"
                  textAlign="center"
                >
                  Nombre del Rol
                </FormLabel>
                <Input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  // onSubmit={onRoleAdd}
                  autoFocus
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Cerrar
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={addButton}
              type="submit"
            >
              Agregar Rol
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoleModal;
