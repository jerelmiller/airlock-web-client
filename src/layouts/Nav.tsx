import Logo from "../assets/airlock-logo.svg";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/Nav.types";
import { preloadQuery } from "../apolloClient";

export const GET_USER: TypedDocumentNode<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
> = gql`
  query GetMyProfile {
    me {
      id
      profilePicture
    }
  }
`;

export function loader() {
  return preloadQuery(GET_USER, { errorPolicy: "ignore" });
}

export default function Nav() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const location = useLocation();
  const { data } = useReadQuery(queryRef);

  const user = data?.me;

  return (
    <>
      <Box px="2" h="80px" bgColor="white">
        <Flex direction="row" justify="space-between" align="center" p={4}>
          <Box as={Link} to="/">
            <HStack spacing="2">
              <Image
                boxSize="50px"
                objectFit="cover"
                src={Logo}
                alt="airlock logo"
              />
              <Text
                fontWeight="600"
                fontSize="2xl"
                textTransform="uppercase"
                fontFamily="Source Sans Pro"
                letterSpacing="1.4px"
              >
                Airlock
              </Text>
            </HStack>
          </Box>
          <HStack spacing="2">
            {user ? (
              <>
                {user.__typename === "Guest" && (
                  <Button as={NavLink} to="/trips" variant="ghost">
                    My trips
                  </Button>
                )}
                {user.__typename === "Host" && (
                  <Button as={NavLink} to="/listings" variant="ghost">
                    My listings
                  </Button>
                )}
                <Box as={Link} to="/profile">
                  <Avatar
                    name="profile"
                    borderColor="white"
                    bg="gray.50"
                    borderWidth="1px"
                    src={user.profilePicture}
                  />
                </Box>
              </>
            ) : location.pathname !== "/login" ? (
              <Button as={NavLink} to="/login">
                Log in
              </Button>
            ) : null}
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
