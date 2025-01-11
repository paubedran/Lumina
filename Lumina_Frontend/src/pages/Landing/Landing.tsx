import { Center, } from "@chakra-ui/react";
import { FrontLumina } from "./Lumina";
import { CreditRequestForm } from "./Contrato";

function Landing() {
  return (
    <Center>
      <FrontLumina/>
      <CreditRequestForm/>
    </Center>
  );
}

export { Landing };
