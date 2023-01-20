import React from "react";
import { Tr, Td } from "@chakra-ui/react";

const TransactionItem = ({ transaction }) => {
  return (
    <Tr>
      <Td>{transaction["name"]}</Td>
      <Td>{transaction["symbol"]}</Td>
      <Td isNumeric>${transaction["amount"].toLocaleString()}</Td>
      <Td isNumeric>$ {transaction["no_of_coins"]}</Td>
      <Td isNumeric>$ {transaction["price_purchased_at"].toLocaleString()}</Td>
      <Td>{transaction["time_transacted"]}</Td>
    </Tr>
  );
};

export default TransactionItem;
