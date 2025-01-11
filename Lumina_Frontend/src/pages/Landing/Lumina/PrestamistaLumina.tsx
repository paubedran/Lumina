import { Box, Heading, SimpleGrid, Text, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select, Input, Button } from "@chakra-ui/react"; 
import { useState, useEffect } from "react";
import userImage from './user.png';
import ajustesImage from './ajustes.png';
import graduacionImage from './graduacion.png';
import tendenciaImage from './tendencia.png';
import './styles.css'; 

const FrontLumina = () => {
  const [amount, setAmount] = useState(100);
  const [purpose, setPurpose] = useState("");
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // Nuevo estado para validar el formulario

  // Funciones de manejo de cambios
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Verificar si el formulario está completo
  useEffect(() => {
    if (amount && purpose && term && search) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [amount, purpose, term, search]); // Verificamos los cambios en los valores de los campos

  const handleSubmit = () => {
    // Aquí puedes agregar la lógica que quieras al presionar el botón "Enviar"
    console.log("Formulario enviado!");
  };

  return (
    <VStack spacing={8} align="center" p={8} w="full" h="100vh" bg="blue.600" color="black" position="relative">
      <Box 
        position="absolute" 
        right={0} 
        top="auto" 
        bottom={0} 
        height="100%" 
        width="150px" 
        bg="blue.300" 
        color="navy" 
        display="flex" 
        flexDirection="column" 
        justifyContent="flex-start" 
        alignItems="flex-end" 
        p={4}
      >
        <img 
          src={userImage} 
          alt="User" 
          className="user-image" 
          style={{ marginRight: '25px' }} 
        />
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Hello, UserName
        </Text>
        <img 
          src={ajustesImage} 
          alt="Settings" 
          className="ajustes-image" 
          style={{ marginRight: '30px' }} 
        />
        <img 
          src={graduacionImage} 
          alt="Graduation" 
          className="graduacion-image" 
          style={{ marginRight: '20px' }} 
        />
        <img 
          src={tendenciaImage} 
          alt="Trends" 
          className="tendencia-image" 
          style={{ marginRight: '20px' }} 
        />
      </Box>

      <Heading as="h1" size="2xl" textAlign="center" color="white">
        L U M I N A
      </Heading>

      {/* Barra de búsqueda movida a la parte inferior izquierda */}
      <Box position="absolute" bottom={50} left={120}>
        <Input 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearchChange} 
          size="md" 
          width="250px"
          bg="grey.600"
          color="blue.600" 
        />
      </Box>

      <SimpleGrid columns={2} spacing={10} w="full" maxW="600px">
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
            defaultValue={amount}
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

        <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
          <Text fontSize="lg" fontWeight="bold">Possible Lenders</Text>
        </Box>
        
        <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
          <Text fontSize="lg" fontWeight="bold">Term to Pay (Months)</Text>
          <Select 
            placeholder="Select term" 
            value={term} 
            onChange={handleTermChange}
            bg="gray.200"
          >
            <option value="6">6</option>
            <option value="3">3</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </Select>
        </Box>

        <Box gridColumn="2" bg="gray.100" p={6} borderRadius="md" shadow="md">
          <Text fontSize="lg" fontWeight="bold">Interest Rate</Text>
          Low-Risk Borrowers: 1.5%
        </Box>
      </SimpleGrid>

      {/* Botón "Enviar" al centro */}
      <Box position="absolute" bottom={10} width="100%" textAlign="center">
        <Button 
          colorScheme="blue" 
          onClick={handleSubmit} 
          isDisabled={!isFormValid} // El botón está deshabilitado si el formulario no está completo
        >
          Enviar
        </Button>
      </Box>

      <Box 
        className="robot-image" 
        position="absolute" 
        bottom={4} 
        left={4} 
      />
    </VStack>
  );
};

export default FrontLumina;
