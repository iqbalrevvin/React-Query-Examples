import React, {useState} from "react";
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
  Grid,
  Button,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Price, PriceProps } from "./crypto.type";
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

// SSR INITIAL DATA
export async function getStaticProps() {
 const initialPrice = await getMarket();
  return {
    props: { initialPrice },
  }; 
}

//SSR HYDRATE
// export async function getStaticProps(){
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['market', 1], () => getMarket());

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   }
// }

export default function Market({initialPrice}: PriceProps) {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    ['market', { page }],
    () => getMarket(page), 
    {
      staleTime: 3000,
      refetchInterval: 10000,
      // initialData: initialPrice
    }
  );

  const previousPage = () => {
    setPage(prevState => prevState - 1);
  }

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  }

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
          {data?.map((price: Price, index: number) => {
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
      <Grid templateColumns="70% 1fr auto 1fr" gap={6} mt={10}>
        <div></div>
        <Button 
          colorScheme='facebook'
          onClick={previousPage}
          size='sm'
          isDisabled={page === 1 ? true : false}
        >
          Previous
        </Button>
        <Text>{page}</Text>
        <Button 
          colorScheme='facebook'
          onClick={nextPage}
          size='sm'
        >
          Next
        </Button>
      </Grid>
    </Layout>
  );
}
