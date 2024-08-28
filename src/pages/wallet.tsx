import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { gql, useMutation, TypedDocumentNode } from "@apollo/client";
import { useUser } from "../utils";
import {
  AddFundsMutation,
  AddFundsMutationVariables,
} from "./__generated__/wallet.types";

export const ADD_FUNDS: TypedDocumentNode<
  AddFundsMutation,
  AddFundsMutationVariables
> = gql`
  mutation AddFunds($amount: Float!) {
    addFundsToWallet(amount: $amount) {
      code
      success
      message
      amount
    }
  }
`;

export default function Wallet() {
  const [funds, setFunds] = useState(100);
  const { user, setUser } = useUser();
  const [addFundsToWallet] = useMutation(ADD_FUNDS, {
    onCompleted: (data) => {
      if (user?.__typename === "Guest") {
        setUser({ ...user, funds: data.addFundsToWallet.amount || 0 });
      }
    },
  });

  return (
    <Center textAlign="center">
      <Stack spacing="4">
        <Heading as="h1">My wallet</Heading>
        <Text>
          Welcome to your wallet! Use this space to add and manage funds for
          your trips.
        </Text>
        {user && (
          <Box
            p={4}
            border="1px"
            borderColor="gray.100"
            borderRadius={4}
            textAlign="center"
          >
            <Heading size="2xl">
              @{user.__typename === "Guest" ? user.funds : "-"}
            </Heading>
            <Text>credit balance</Text>
          </Box>
        )}
        <Text fontWeight="semibold" textAlign="left">
          Add funds to your account
        </Text>
        <Flex w="100%">
          <Box>
            <InputGroup alignSelf="center">
              <InputLeftAddon bg="transparent" paddingRight="0">
                @
              </InputLeftAddon>
              <NumberInput
                name="numOfBeds"
                min={1}
                value={funds}
                onChange={(_, val) => {
                  setFunds(val);
                }}
              >
                <NumberInputField
                  borderLeftWidth="0"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </Box>
          <Button
            alignSelf="center"
            maxW="150px"
            ml={4}
            onClick={() =>
              addFundsToWallet({
                variables: {
                  amount: funds,
                },
              })
            }
          >
            Add funds
          </Button>
        </Flex>
      </Stack>
    </Center>
  );
}
