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
import {
  gql,
  useMutation,
  TypedDocumentNode,
  useFragment,
} from "@apollo/client";
import {
  AddFundsMutation,
  AddFundsMutationVariables,
  WalletUserFragment,
} from "./__generated__/wallet.types";
import { Guest } from "../__generated__/types";
import { useNavigate } from "react-router-dom";

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

const fragment: TypedDocumentNode<WalletUserFragment> = gql`
  fragment WalletUserFragment on Query {
    me {
      id
      ... on Guest {
        funds
      }
    }
  }
`;

export default function Wallet() {
  const navigate = useNavigate();
  const { data, complete } = useFragment({ fragment, from: "ROOT_QUERY" });
  const [funds, setFunds] = useState(100);
  const [addFundsToWallet] = useMutation(ADD_FUNDS, {
    update(cache, { data }) {
      cache.modify<Guest>({
        id: cache.identify(user!),
        fields: {
          funds: () => data?.addFundsToWallet.amount ?? 0,
        },
      });
    },
  });

  if (complete && data.me.__typename !== "Guest") {
    return navigate("/");
  }

  const user = data.me;

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
