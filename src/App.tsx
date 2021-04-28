import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ReportInfo from "./components/ReportInfo";
import Roles from "./components/Roles";

export const App = () => {
  const [value, setValue] = React.useState("");
  const [discordTag, setDiscordTag] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const reset = () => {
    setValue("");
    setDiscordTag("");
    setNickname("");
    setFecha("");
    setSelectedRoles([]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3} height="5vh">
          <ColorModeSwitcher justifySelf="flex-end" />
          <Button
            variant="solid"
            justifySelf="flex-start"
            onClick={reset}
            colorScheme="green"
          >
            Reset data
          </Button>
        </Grid>
      </Box>
      <VStack mb="14">
        <FormControl id="discord" width="50%">
          <FormLabel fontWeight="bold" fontSize="1.5rem">
            Tag de discord
          </FormLabel>
          <Input
            type="text"
            value={discordTag}
            onChange={(e) => setDiscordTag(e.target.value)}
            placeholder="User#1234"
          />
        </FormControl>
        <FormControl id="nickname" width="50%">
          <FormLabel fontWeight="bold" fontSize="1.5rem">
            Nickname
          </FormLabel>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => (nickname === "N/A" ? setNickname("") : undefined)}
            placeholder="N/A"
          />
        </FormControl>
        <VStack width="50%" alignItems="flex-start">
          <Text my="8px" fontWeight="bold" fontSize="1.5rem">
            Motivo de la sanción
          </Text>
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="¿Por qué razón esta sancionando al usuario?"
            size="sm"
          />
        </VStack>
        <Roles
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
        <VStack width="50%" alignItems="flex-start">
          <FormControl id="fecha" isRequired>
            <FormLabel fontWeight="bold" fontSize="1.5rem">
              Fecha en que termina la sanción:
            </FormLabel>
            <Input
              type="text"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </FormControl>
        </VStack>
      </VStack>
      <Divider />
      <Box>
        <ReportInfo
          discordTag={discordTag}
          warnReason={value}
          nickname={nickname}
          warnEnd={fecha}
          roles={selectedRoles}
        />
      </Box>
    </ChakraProvider>
  );
};
