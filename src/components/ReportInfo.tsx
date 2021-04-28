import { Button, Stack, Textarea } from "@chakra-ui/react";
import * as React from "react";

interface Props {
  discordTag: string;
  nickname?: string;
  warnReason: string;
  roles?: string[];
  warnEnd: string;
}

const ReportInfo = ({
  discordTag = "",
  nickname = "",
  warnReason = "",
  roles = [],
  warnEnd = "",
}: Props) => {
  const txtAreaRef = React.useRef<any>();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txtAreaRef.current.value.trim());
  };

  return (
    <Stack mt="6" alignItems="center" display="flex" mb="6">
      <Button
        size="lg"
        width="50%"
        onClick={copyToClipboard}
        alignSelf="center"
        colorScheme="green"
        marginBottom="6"
      >
        Copiar
      </Button>
      <Textarea
        ref={txtAreaRef}
        size="lg"
        value={`
**-Nombre de usuario en discord y nickname:** @${discordTag} | ${nickname ? nickname : 'N/A'}\n
**-Razón por la cuál se está muteando:** ${warnReason}\n
**-Roles que tenía:** ${roles.length > 0 ? roles.map((t) => ` ${t}`) : 'Sin roles'}\n
**-Hora y fecha en que termina su sanción:** \`\`${warnEnd}\`\`\n
**-Evidencia de lo que hizo y/o foto de perfil:** \n
`}
        variant="filled"
        p="4"
        height="350"
        width="80%"
        focusBorderColor="#333"
        readOnly
      />
    </Stack>
  );
};

export default ReportInfo;
