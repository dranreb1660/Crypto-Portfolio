import React from "react";
import {
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react";
import TransactionItem from "./TransactionItem";

const TransactionsTable = ({ transactions }) => {
  return (
    <VStack>
      <Text>Recent Transactions</Text>
      <Table>
        <TableCaption>All Crypto buy and sell records</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th>Amount</Th>
            <Th>Number of coins</Th>
            <Th>Price Purchased at</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>

        <Tbody>
          {transactions.map((item, index) => {
            return <TransactionItem key={index} transaction={item} />;
          })}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default TransactionsTable;
