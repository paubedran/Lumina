
import React, { useState } from "react";
import {
  Center,
  Heading,
  VStack,
  Input,
  Select,
  Button,
  useToast,
  Spacer,
  Box,
  Stepper as ChakraStepper,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepNumber,
  useSteps,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAccount, useAlert } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { CONTRACT_DATA } from "@/app/consts";
import { useSailsConfig } from "@/app/hooks/useSailsConfig";

const steps = [
  "Deploy",
  "Select Service",
  "Confirm and Execute",
  "Integration Complete",
];

function CreditRequestForm() {
  const toast = useToast();
  const [purpose, setPurpose] = useState("");
  const [timeToPay, setTimeToPay] = useState("");
  const [formData, setFormData] = useState({ amount_requested: "", collateral: "" });
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });
  const [blockhash, setBlockhash] = useState<any>("");

  const { account } = useAccount();
  const sails = useSailsCalls();
  const alert = useAlert();

  const sailsConfig = {
    network: "wss://testnet.vara.network",
    contractId: CONTRACT_DATA.programId,
    idl: CONTRACT_DATA.idl,
  };

  useSailsConfig(sailsConfig);

  const purposes = ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7"];
  const timesToPay = ["T0", "T1", "T2", "T3"];

  const handleDeploy = () => {
    setActiveStep(1);
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPurpose(event.target.value);
  };

  const handleTimeToPayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeToPay(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!purpose || !timeToPay) {
      toast({ title: "Please select purpose and time to pay", status: "error" });
      return;
    }

    const callArguments:any = {
      amount_requested: Number(formData.amount_requested),
      collateral: Number(formData.collateral),
      purpose,
      time_to_pay: timeToPay,
    };

    toast({
      render: () => (
        <Box color="white" p={3} bg="#00ffc4" borderRadius="md" boxShadow="lg">
          <Heading size="sm">Requesting Credit</Heading>
          <Text mt={2}>Parameters: {JSON.stringify(callArguments)}</Text>
        </Box>
      ),
      duration: 5000,
      isClosable: true,
    });

    if (!sails) {
      alert.error("SailsCalls is not started!");
      return;
    }

    if (!account) {
      alert.error("Account is not ready");
      return;
    }


    const { signer } = await web3FromSource(account.meta.source);

    try {

        console.log(callArguments)     
        
        
        const response = await sails.command(
        "CreditRequest/RequestCredit",
        {
          userAddress: account.decodedAddress,
          signer,
        },
        {
          callArguments: [
            callArguments.amount_requested,
            callArguments.collateral,
            { P3: null }, // pendiente
            { T0: null }
          ],
          callbacks: {
            onBlock(blockHash) {
              setBlockhash(blockHash);
            },
            onSuccess() {
              setActiveStep(3);
              toast({ title: "Credit request successful!", status: "success" });
            },
            onError() {
              alert.error("An error occurred!");
            },
          },
        }
      );

      console.log("Response: ", response);
    } catch (e) {
      alert.error("Error while sending message");
      console.error(e);
    }
  };

  const goToPreviousStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <Center>
      <VStack spacing={6}>
        <Heading
          textColor="#00ffc4"
          textShadow="2px 2px 0 #00bfa1, 4px 4px 0 #008f7d, 6px 6px 0 rgba(0,0,0,0.2)"
          fontSize="4xl"
        >
          Credit Request Form
        </Heading>
        <Spacer />
        <Box
          width="100%"
          maxW="600px"
          padding={6}
          boxShadow="lg"
          borderRadius="md"
          bg="gray.50"
        >
          <ChakraStepper size="lg" index={activeStep} colorScheme="teal" mb={6}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepNumber />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <StepSeparator />
              </Step>
            ))}
          </ChakraStepper>

          {activeStep === 0 && (
            <VStack spacing={6}>
              <Button
                onClick={handleDeploy}
                size="lg"
                bg="#00ffc4"
                color="black"
                _hover={{ bg: "#00e6b0" }}
                fontWeight="bold"
              >
                Deploy
              </Button>
            </VStack>
          )}

          {activeStep === 1 && (
            <VStack spacing={6}>
              <Input
                placeholder="Amount Requested"
                name="amount_requested"
                value={formData.amount_requested || ""}
                onChange={handleInputChange}
                bg="white"
                fontWeight="bold"
                color="black"
                _placeholder={{ color: "gray.500" }}
                borderColor="gray.300"
                focusBorderColor="#00ffc4"
              />
              <Input
                placeholder="Collateral"
                name="collateral"
                value={formData.collateral || ""}
                onChange={handleInputChange}
                bg="white"
                fontWeight="bold"
                color="black"
                _placeholder={{ color: "gray.500" }}
                borderColor="gray.300"
                focusBorderColor="#00ffc4"
              />
              <Select
                placeholder="Select Purpose"
                value={purpose}
                onChange={handlePurposeChange}
                bg="white"
                fontWeight="bold"
                color="black"
              >
                {purposes.map((purposeOption, index) => (
                  <option key={index} value={purposeOption}>
                    {purposeOption}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Select Time To Pay"
                value={timeToPay}
                onChange={handleTimeToPayChange}
                bg="white"
                fontWeight="bold"
                color="black"
              >
                {timesToPay.map((timeOption, index) => (
                  <option key={index} value={timeOption}>
                    {timeOption}
                  </option>
                ))}
              </Select>
              <HStack spacing={4}>
                <Button
                  bg="transparent"
                  color="black"
                  colorScheme="solid"
                  leftIcon={<FaArrowCircleLeft size="40px" color="#00ffc4" />}
                  onClick={goToPreviousStep}
                />

                <Button
                  onClick={handleSubmit}
                  bg="#00ffc4"
                  color="black"
                  _hover={{ bg: "#00e6b0" }}
                  fontWeight="bold"
                >
                  Request Credit
                </Button>
              </HStack>
            </VStack>
          )}

          {activeStep === 3 && (
            <VStack spacing={6}>
              <Heading size="lg" color="teal.500">
                🎉 Successful Credit Request!
              </Heading>
              <Text>
                Your credit request has been successfully sent.
              </Text>
              <Button
                onClick={() => setActiveStep(0)}
                bg="#00ffc4"
                color="black"
                _hover={{ bg: "#00e6b0" }}
                fontWeight="bold"
              >
                Start Over
              </Button>
            </VStack>
          )}
        </Box>
      </VStack>
    </Center>
  );
}

export { CreditRequestForm };