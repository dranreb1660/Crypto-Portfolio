import React from "react";
import { Container, Text, Stack, VStack, HStack } from "@chakra-ui/react";

const Summary = ({
  portfolioCost,
  portfolioValue,
  absoluteGain,
  totalGainPercent,
}) => {
  return (
    <HStack>
      <Container bg={"tomato"}>
        <VStack w={40}>
          <Text fontSize={"2xl"}>
            $ {Number(portfolioCost.toFixed(2)).toLocaleString()}
          </Text>
          <Text fontSize={"xs"} size="md">
            portfolioCost
          </Text>
        </VStack>
      </Container>

      <Container bg={"tomato"}>
        <VStack w={40}>
          <Text fontSize={"2xl"}>
            $ {Number(portfolioValue.toFixed(2)).toLocaleString()}
          </Text>
          <Text fontSize={"xs"} size="md">
            portfolio Value
          </Text>
        </VStack>
      </Container>

      <Container bg={"tomato"}>
        <VStack w={40}>
          <Text fontSize={"2xl"}>
            $ {Number(absoluteGain.toFixed(2)).toLocaleString()}
          </Text>
          <Text fontSize={"xs"} size="md">
            Absolute Gain / Loss
          </Text>
        </VStack>
      </Container>

      <Container bg={"tomato"}>
        <VStack w={40}>
          <Text fontSize={"2xl"}>
            {Number(totalGainPercent.toFixed(2))} %
          </Text>
          <Text fontSize={"xs"} size="md">
            Total Gain %
          </Text>
        </VStack>
      </Container>
    </HStack>
  );
};

export default Summary;
