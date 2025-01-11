import { Box, Heading, SimpleGrid, Text, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useState } from "react";
import userImage from './user.png';
import ajustesImage from './ajustes.png';
import graduacionImage from './graduacion.png';
import tendenciaImage from './tendencia.png';
import './styles.css';

function FrontLumina(){
  const [amount, setAmount] = useState(100);
  const [purpose, setPurpose] = useState("");
  const [term, setTerm] = useState("");
  const [collateral, setCollateral] = useState(0); // Estado para el valor de Collateral
  const [possibleLendersVisible, setPossibleLendersVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const [inputsVisible, setInputsVisible] = useState(true); // Controlar la visibilidad de los campos
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal de usuario
  const { isOpen: isModalUserInfoOpen, onOpen: onOpenUserInfo, onClose: onCloseUserInfo } = useDisclosure(); // Control del modal de "User Info"

  const handleAmountChange = (valueAsString: string, valueAsNumber: number) => {
    if (valueAsNumber >= 100 && valueAsNumber <= 4000) {
      setAmount(valueAsNumber);
    } else if (valueAsNumber > 4000) {
      setAmount(4000);
    } else {
      setAmount(100);
    }
  };

  const handleSliderChange = (value: number) => {
    setAmount(value);
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPurpose(event.target.value);
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTerm(event.target.value);
  };

  const handleCollateralChange = (valueAsString: string, valueAsNumber: number) => {
    if (valueAsNumber < amount) {
      setErrorMessage("El Colateral seleccionado no debe ser menor que la cifra del préstamo.");
    } else {
      setErrorMessage(""); // Si no hay error, limpia el mensaje
    }
    setCollateral(valueAsNumber); // Actualizar el valor de Collateral
  };

  const handleSubmit = () => {
    if (collateral >= amount) {
      setPossibleLendersVisible(true);
      setInputsVisible(false);  // Ocultar los campos de entrada y el botón submit
    } else {
      setErrorMessage("El Colateral seleccionado no debe ser menor que la cifra del préstamo.");
    }
  };

  const isSubmitEnabled = amount > 0 && purpose && term && collateral >= amount;

  return (
    <Box 
      position="relative" 
      w="full" 
      minH="100vh" // Mantener altura mínima de la ventana
      backgroundImage="url('/FondoLumi.webp')" // Colocamos la imagen de fondo
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      overflowY="auto" // Forzamos la visibilidad del scrollbar
    >
      <VStack 
        spacing={8} 
        align="center" 
        p={8} 
        w="full" 
        color="black" 
        position="relative"
        zIndex={1} // Aseguramos que el contenido esté encima de la imagen
      >
        <Heading as="h1" size="2xl" textAlign="center" color="white">
          L U M I N A
        </Heading>

        <SimpleGrid columns={2} spacing={10} w="full" maxW="600px">
          {inputsVisible && (
            <>
              <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                <Text fontSize="lg" fontWeight="bold">Amount Requested (USD)</Text>
                <NumberInput
                  value={amount}
                  onChange={handleAmountChange}
                  min={100}
                  max={4000}
                  clampValueOnBlur={false}
                >
                  <NumberInputField bg="gray.200" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  aria-label="slider-ex-1"
                  value={amount}
                  min={100}
                  max={4000}
                  step={1}
                  onChange={handleSliderChange}
                  mt={4}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                <Text fontSize="lg" fontWeight="bold">Purpose</Text>
                <Select 
                  placeholder="Select purpose" 
                  value={purpose} 
                  onChange={handlePurposeChange}
                  bg="gray.200"
                >
                  <option value="family">Family</option>
                  <option value="car">Car</option>
                  <option value="home">Home</option>
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                  <option value="debt">Debt</option>
                  <option value="personal_expenses">Personal Expenses</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </Select>
              </Box>

              {/* Rectángulo blanco al lado de Term to Pay con el campo Collateral */}
              <Box bg="white" p={6} borderRadius="md" shadow="md">
                <Text fontSize="lg" fontWeight="bold">Collateral</Text>
                <NumberInput
                  value={collateral}
                  onChange={handleCollateralChange}
                  min={0}
                  max={1000000}
                  clampValueOnBlur={false}
                >
                  <NumberInputField bg="gray.200" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errorMessage && (
                  <Text color="red.500" fontSize="sm" mt={2}>{errorMessage}</Text>
                )}
              </Box>

              <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                <Text fontSize="lg" fontWeight="bold">Term to Pay (Months)</Text>
                <Select 
                  placeholder="Select term" 
                  value={term} 
                  onChange={handleTermChange}
                  bg="gray.200"
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>

                </Select>
              </Box>
            </>
          )}

          {inputsVisible && (
            <Box 
              bg="gray.100" 
              p={6} 
              borderRadius="md" 
              shadow="md" 
              gridColumn="1 / span 2" // Hace que el submit ocupe toda la fila
              textAlign="center"
            >
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={!isSubmitEnabled}
                width="100%"
              >
                Submit
              </Button>
            </Box>
          )}

          {possibleLendersVisible && (
            <>
              <Box 
                bg="gray.100" 
                p={4} // Redujimos el padding para hacerlo más pequeño
                borderRadius="md" 
                shadow="md" 
                position="absolute" 
                top="150px" // Mover "Possible Lenders" hacia abajo, debajo del título "Lumina"
                left="50%"
                transform="translateX(-50%)"
                w="80%" // Ancho igual que el de los rectángulos de los usuarios
                maxW="1200px" // Máximo de ancho para evitar que crezca demasiado
                h="60px" // Altura igual a la de los rectángulos de los usuarios
              >
                <Text fontSize="md" fontWeight="bold">Possible Lenders</Text>
              </Box>

              {/* Los 4 rectángulos debajo de "Possible Lenders" */}
              <SimpleGrid 
                columns={2} 
                spacing={4} 
                w="80%" // Igual que el ancho de "Possible Lenders"
                maxW="1200px" // Máximo de ancho
                position="absolute" 
                top="calc(150px + 60px + 20px)" // Aumentamos el valor de "top" para dejar más espacio (20px más)
                left="50%" 
                transform="translateX(-50%)"
              >
                <Box bg="blue.300" p={6} borderRadius="md" shadow="md" h="75px" display="flex" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="bold">User1</Text>
                  <Button colorScheme="blue" size="sm">Requisites</Button>
                </Box>
                
                <Box bg="blue.400" p={6} borderRadius="md" shadow="md" h="75px" display="flex" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="bold">User2</Text>
                  <Button colorScheme="blue" size="sm">Requisites</Button>
                </Box>
                <Box bg="blue.300" p={6} borderRadius="md" shadow="md" h="75px" display="flex" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="bold">User3</Text>
                  <Button colorScheme="blue" size="sm">Requisites</Button>
                </Box>
                <Box bg="blue.600" p={6} borderRadius="md" shadow="md" h="75px" display="flex" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="bold">User4</Text>
                  <Button colorScheme="blue" size="sm">Requisites</Button>
                </Box>
              </SimpleGrid>
            </>
          )}
        </SimpleGrid>
      </VStack>

      {/* Barra azul con botones en el lado derecho */}
      <Box 
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        width="150px"
        bg="blue.300"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
        zIndex={2}
      >
        <Button 
          variant="link" 
          leftIcon={<img src={userImage} alt="User" style={{ width: '50px', height: '50px' }} />} 
          colorScheme="blue"
          mb={4}
          p={0} // Eliminar padding para que la imagen ocupe todo el espacio
          onClick={onOpenUserInfo} // Abrir el modal cuando se presione el botón
        />
        <Button 
          variant="link" 
          leftIcon={<img src={ajustesImage} alt="Settings" style={{ width: '50px', height: '50px' }} />} 
          colorScheme="blue"
          mb={4}
          p={0} // Eliminar padding para que la imagen ocupe todo el espacio
        />
        <Button 
          variant="link" 
          leftIcon={<img src={graduacionImage} alt="Graduation" style={{ width: '50px', height: '50px' }} />} 
          colorScheme="blue"
          mb={4}
          p={0} // Eliminar padding para que la imagen ocupe todo el espacio
        />
        <Button 
          variant="link" 
          leftIcon={<img src={tendenciaImage} alt="Trends" style={{ width: '50px', height: '50px' }} />} 
          colorScheme="blue"
          p={0} // Eliminar padding para que la imagen ocupe todo el espacio
        /> 
      </Box>

      {/* Modal de "User Info" */}
      <Modal isOpen={isModalUserInfoOpen} onClose={onCloseUserInfo} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          bgImage="url('/FondoVentana.jpg')" // Aquí agregamos la imagen de fondo
          bgSize="cover" // Asegura que la imagen cubra todo el modal
          bgPosition="center" // Centra la imagen
          color="white" // Establece el color del texto para que sea visible sobre la imagen
        >
          <ModalHeader
            fontSize="3xl" // Tamaño de fuente más grande
            textAlign="center" // Centrar el texto
            fontWeight="bold" // Poner en negrita          
          >
            User Info
          </ModalHeader>
          <ModalBody>
            <Text fontWeight="bold">Ana Paulina Bedrán</Text>
            <Text>Occupation: Student</Text>
            <Text>Category: Bronze</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseUserInfo}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box className="robot-image" position="absolute" bottom={4} left={4} />
    </Box>
  );
};

export {FrontLumina};
