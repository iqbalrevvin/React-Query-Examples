import React from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
  Badge,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useQuery } from "react-query";
import MamaTable from "./MamaTable";

const getMessages = async () => {
  const URL = 'http://localhost:3000/api/messages';
  const result = await fetch(URL);
  return await result.json();
}

export interface MessageProps {
  id: number;
  createdAt: string;
  phoneNumber: number;
  message: string;
  status?: string;
}

export function formatDate(date: string|undefined){
  return new Date(date).toLocaleDateString('id-ID');
}

export default function MamaMuda() {
  const { data, isSuccess } = useQuery('get-mama-muda', getMessages, {
    staleTime: 5000,
    refetchInterval: 5000,
  });

  return (
    <Layout title="💌 Mama Muda" subTitle="Minta Pulsa">
      <Flex>
        <Box>
          <Box
            w="md"
            p={5}
            mr={4}
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={4}
              pb={2}
              borderBottom="1px"
              borderColor="gray.200"
            >
              ✍️ Request Pulsa
            </Text>
            <form>
              <FormControl pb={4}>
                <FormLabel
                  htmlFor="phoneNumber"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Phone Number
                </FormLabel>
                <Input name="phoneNumber" placeholder="Phone Number" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="name"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Message
                </FormLabel>
                <Textarea placeholder="Bullshit Message" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <Button mt={4} colorScheme="teal" type="submit">
                Send
              </Button>
            </form>
          </Box>
        </Box>
        <Box flex="1">
          <MamaTable data={data} />
        </Box>
      </Flex>
    </Layout>
  );
}
