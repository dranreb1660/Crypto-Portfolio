import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  Input,
  Button,
  Select,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

const AddModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [pricePurchaseAt, setPricePurchaseAt] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [numberOfCoins, setNumberOfCoins] = useState("");

  const addTransaction = () => {
    const postResults = async () => {
      const payload = JSON.stringify({
        name: name,
        symbol: symbol,
        type: type,
        amount: amount * 100,
        price_purchased_at: pricePurchaseAt,
        time_transacted: Date.parse(transactionDate) / 1000,
        no_of_coins: numberOfCoins,
        time_created: Date.now() / 1000,
      });
      console.log(payload);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://0.0.0.0:5100/new_transaction",
        payload,
        config
      );
      console.log(data);
      onClose();
    };
    postResults();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight={"bold"}
            color="blue.600"
            textAlign={"center"}
            ml={-5}
          >
            Add Transaction
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Type"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Select
                  placeholder="Select Transaction Type"
                  variant={"filled"}
                  focusBorderColor="tomato"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="1">Buy</option>
                  <option value="0">Sell</option>
                </Select>
              </InputGroup>

              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Name"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="Name"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Symbol"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="Symbol, ex. BTC for Bitcoin"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Amount"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="Amount"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Purchase Price"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={pricePurchaseAt}
                  onChange={(e) => setPricePurchaseAt(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="Price Purchased At"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Transaction Date"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="Date of Transaction (MM-DD-YYYY)"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents={"none"}
                  children="Number of Coins"
                  p={4}
                  mr={4}
                  w={"10rem"}
                  justifyContent="end"
                  color={"blue.600"}
                  fontWeight="bold"
                />
                <Input
                  value={numberOfCoins}
                  onChange={(e) => setNumberOfCoins(e.target.value)}
                  focusBorderColor="tomato"
                  variant={"filled"}
                  placeholder="number Of Coins"
                />
              </InputGroup>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent={"center"} ml={3}>
            <Button
              bg={"tomato"}
              color="white"
              size="lg"
              onClick={addTransaction}
            >
              {" "}
              Add Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModal;
