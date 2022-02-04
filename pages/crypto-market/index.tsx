import React from "react";
import {
  Badge,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useQuery } from 'react-query';
import { Price } from "./crypto.type";
import { getMarket } from "./crypto.action";
import { formatNumber } from "./crypto.utils";

const Percentage = ({percent}: {percent: number}) => {
  const formatPercent = Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percent/100);
  let color = 'black'
  if(percent > 0){
    color = 'green.500';
  }else{
    color = 'red.500';
  }
  return <Text color={color}>{formatPercent}</Text>
}

export default function Market() {
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    'market', 
    getMarket, {
      staleTime: 3000,
      refetchInterval: 10000
    }
  );
  return (
    <Layout title="Crypto Market">
      {isFetching && (
        <Spinner color="blue.500" position={'fixed'} top={10} right={10} />
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Last Price</Th>
            <Th>24h % Change</Th>
            <Th isNumeric>Total Volume</Th>
            <Th isNumeric>Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && <Text color='blue.500'>Please wait...</Text>}
          {isError && <Text color='red.500'>There was an error processing your request</Text>}
          {isSuccess && data.map((price: Price, index: number) => {
            return(
              <Tr key={index}>
                <Td>
                  <Flex alignItems="center">
                    <Image
                      src={price.image}
                      boxSize="24px"
                      ignoreFallback={true}
                    />

                    <Text pl={2} fontWeight="bold" textTransform="capitalize">
                      {price.id}
                    </Text>
                    <Badge ml={3}>{price.symbol}</Badge>
                  </Flex>
                </Td>
                <Td>{formatNumber(price.current_price)}</Td>
                <Td>
                  <Percentage percent={price.price_change_percentage_24h} />
                </Td>
                <Td isNumeric>{formatNumber(price.total_volume)}</Td>
                <Td isNumeric>{formatNumber(price.market_cap)}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Layout>
  );
}
