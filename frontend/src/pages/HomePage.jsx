import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Center,
  Text,
  Heading,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Summary,
  AddModal,
  TransactionsTable,
  Visualizations,
} from "../components";

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [portfolioCost, setPortfolioCost] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [absoluteGain, setAbsoluteGain] = useState(0);
  const [totalGainPercent, setTotalGainPercent] = useState(0);
  const [rollups, setRollups] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get("http://0.0.0.0:5100/transactions");
      setTransactions(data);
    };
    const fetchRollUps = async () => {
      let costAccumulator = 0;
      let valueAccumulator = 0;
      //   const config = {
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   };

      const { data } = await axios.get(
        "http://0.0.0.0:5100/get_rollups_by_coin"
      );
      setRollups(data);
      data.forEach((item) => {
        costAccumulator += parseFloat(item["total_cost"]);
        valueAccumulator += parseFloat(item["total_equity"]);
      });
      let absoluteGain = valueAccumulator - costAccumulator;

      setPortfolioCost(costAccumulator);
      setPortfolioValue(valueAccumulator);
      setAbsoluteGain(absoluteGain);
      console.log(absoluteGain, costAccumulator);
      console.log((absoluteGain / costAccumulator) * 100);
      setTotalGainPercent((absoluteGain / costAccumulator) * 100);
    };

    fetchTransactions();
    fetchRollUps();
  }, [isOpen]);
  console.log(portfolioCost);

  return (
    <Center bg={"black"} color="white">
      <VStack spacing={7} mb={6}>
        <Heading>Crypto Portfolio</Heading>
        <Text>This is the current state of your portfolio</Text>
        <Button size={"lg"} colorScheme="teal" onClick={onOpen}>
          {" "}
          Add Transaction
        </Button>
        <AddModal isOpen={isOpen} onClose={onClose} />

        <Summary
          portfolioCost={portfolioCost}
          portfolioValue={portfolioValue}
          absoluteGain={absoluteGain}
          totalGainPercent={totalGainPercent}
        />
        <TransactionsTable transactions={transactions} />
        <Visualizations rollups={rollups} />
      </VStack>
    </Center>
  );
};

export default HomePage;
