// src/pages/home/home.tsx
import { Center, VStack } from "@chakra-ui/react";
import FrontLumina from "@/components/TrafficLightComponents/Lumina/FrontLumina"; // Importa FrontLumina

const Home = () => {
  return (
    <Center>
      <VStack spacing={8} align="center" w="full">
        <FrontLumina /> {/* Usa el componente FrontLumina aquí */}
      </VStack>
    </Center>
  );
};

export default Home; // Asegúrate de exportar el componente
