import { Table, Thead, Tr, Th, Tbody, Td, Badge } from "@chakra-ui/react";
import React from "react";
import { formatDate, MessageProps } from ".";

interface MamaTableProps {
    data: MessageProps[];
}

const StatusBadge = ({status}: {status: string|undefined}) => {
    let color = 'yellow';
    let statusText = 'waiting';
    if(status === 'failed'){
        color = 'red';
        statusText = 'failed';
    }else if (status === 'success'){
        color = 'green';
        statusText = 'success';
    }else{
        color = 'gray';
        statusText = 'waiting';
    }

    return <Badge color={color}>{statusText}</Badge>
}

export default function MamaTable({ data }: MamaTableProps) {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Phone Number</Th>
                    <Th>Message</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.map((message: MessageProps) => (
                    <Tr>
                        <Td>{formatDate(message.createdAt)}</Td>
                        <Td>{message.phoneNumber}</Td>
                        <Td>
                            {message.message}
                        </Td>
                        <Td>
                            <StatusBadge status={message.status} />
                            {/* <Badge colorScheme="yellow">waiting</Badge> */}
                        </Td>
                    </Tr>
                ))}
                <Tr>
                    <Td>1/1/2021</Td>
                    <Td>085267852333</Td>
                    <Td>Mama lagi di kantor lurah, kirim pulsa 20jt sekarang. CEPAT !</Td>
                    <Td>
                        <Badge colorScheme="green">success</Badge>
                    </Td>
                </Tr>
                <Tr>
                    <Td>1/1/2021</Td>
                    <Td>085267852444</Td>
                    <Td>Mama lagi di mana mana, kirim pulsa 30jt sekarang. CEPAT !</Td>
                    <Td>
                        <Badge colorScheme="red">failed</Badge>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
}
