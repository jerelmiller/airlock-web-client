import Stars from "../components/Stars";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetHostListingsQuery,
  GetHostListingsQueryVariables,
} from "./__generated__/listings.types";

const LINK_PROPS = {
  as: Link,
  mr: "4",
  color: "indigo.dark",
  fontWeight: "semibold",
  _hover: {
    textDecoration: "underline",
  },
};

export const HOST_LISTINGS: TypedDocumentNode<
  GetHostListingsQuery,
  GetHostListingsQueryVariables
> = gql`
  query GetHostListings {
    hostListings {
      id
      numberOfUpcomingBookings
      title
      photoThumbnail
      overallRating
    }
  }
`;

export default function Listings() {
  const { data } = useSuspenseQuery(HOST_LISTINGS);
  const { hostListings } = data;

  return (
    <>
      <Flex w="full" justifyContent="space-between">
        <Heading as="h1" mt={0} mb="4">
          My listings
        </Heading>
        <Button
          as={Link}
          to="/listings/create"
          leftIcon={<IoAddCircleOutline />}
        >
          Add
        </Button>
      </Flex>
      <VStack spacing="4" divider={<StackDivider borderColor="gray.200" />}>
        {hostListings.filter(Boolean).map((listingData, index) => {
          const {
            id,
            title,
            photoThumbnail,
            overallRating,
            numberOfUpcomingBookings,
          } = listingData;
          return (
            <Box key={`${title}-${index}`} overflow="hidden" w="full">
              <Flex direction="row" flexWrap="wrap">
                <Image
                  src={photoThumbnail}
                  alt={title}
                  objectFit="cover"
                  w="250px"
                  h="140px"
                  borderRadius={4}
                />
                <Flex direction="column" px="4">
                  <Flex direction="column" h="full">
                    <Heading as="h2" size="md">
                      {title}
                    </Heading>
                    <Flex flexWrap="wrap" mt={4}>
                      <Text mr={4}>{numberOfUpcomingBookings} bookings</Text>
                      {overallRating ? (
                        <Stars size={20} rating={overallRating} />
                      ) : (
                        <Text>No reviews yet</Text>
                      )}
                    </Flex>
                  </Flex>
                  <Flex>
                    <Box {...LINK_PROPS} to={`/listing/${id}/edit`}>
                      Edit
                    </Box>
                    <Box {...LINK_PROPS} to={`/listing/${id}`}>
                      View
                    </Box>
                    <Box {...LINK_PROPS} to={`/listing/${id}/bookings`}>
                      Manage Bookings
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </>
  );
}
