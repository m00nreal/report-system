import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  VStack,
  Text,
  Stack,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { SetStateAction } from "react";
import RoleModal from "./RoleModal";

interface Props {
  selectedRoles: string[];
  setSelectedRoles: React.Dispatch<SetStateAction<string[]>>;
}

const Roles = ({selectedRoles, setSelectedRoles}: Props) => {
  const [roles, setRoles] = React.useState<string[]>(() => {
    let storageRoles = [];
    const storage = localStorage.getItem("roles");
    if (storage) {
      storageRoles = JSON.parse(storage);
    }
    return storageRoles;
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    localStorage.setItem(
      "roles",
      JSON.stringify(roles.map((t) => t.toLowerCase()))
    );
  }, [roles]);

  const onRoleClick = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles((old) => old.filter((t) => t !== role));
    } else {
      setSelectedRoles((old) => [...old, role]);
    }
    console.log(selectedRoles);
  };

  return (
    <VStack width="50%" alignItems="flex-start">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Text my="8px" fontWeight="bold" fontSize="1.5rem">
          Roles del usuario 
        </Text>
        <Button rounded="full" size="sm" colorScheme="green" onClick={onOpen}>
          <AddIcon />
        </Button>
      </Stack>
      <Stack width="100%">
        <Box display="flex" flexDir="row" flexWrap="wrap">
          {roles.map((t) => (
            <Box pr="2" alignItems="center" justifyContent="center">
              <Badge
                children={t}
                key={t}
                variant={selectedRoles.includes(t) ? "solid" : "outline"}
                colorScheme="green"
                onClick={() => onRoleClick(t)}
                cursor="pointer"
                userSelect="none"
              />
            </Box>
          ))}
        </Box>
      </Stack>
      <RoleModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        roles={roles}
        setRoles={setRoles}
      />
    </VStack>
  );
};

export default Roles;
