import { useRef } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { IoCheckmark, IoExit, IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  gql,
  TypedDocumentNode,
  useFragment,
  useMutation,
} from "@apollo/client";
import {
  ProfileFragment,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from "./__generated__/profile.types";

export const UPDATE_PROFILE: TypedDocumentNode<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
> = gql`
  mutation UpdateUserProfile($updateProfileInput: UpdateProfileInput) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      code
      success
      message
      user {
        id
        name
        profilePicture
        ... on Host {
          profileDescription
        }
      }
    }
  }
`;

const fragment: TypedDocumentNode<ProfileFragment> = gql`
  fragment ProfileFragment on Query {
    me {
      id
      profilePicture
      name
      ... on Host {
        profileDescription
      }
      ... on Guest {
        funds
      }
    }
  }
`;

export default function Profile() {
  const { data } = useFragment({ fragment, from: "ROOT_QUERY" });
  const txtProfileDescRef = useRef<HTMLTextAreaElement>(null);
  const [updateProfileData, { loading, error, client }] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: ({ updateProfile: { user } }) => {
        if (user?.__typename !== "Host") {
          return;
        }

        if (txtProfileDescRef.current) {
          txtProfileDescRef.current.value = user.profileDescription;
        }
      },
    },
  );

  if (error) return `Submission error! ${error.message}`;

  return (
    <Center>
      {data.me && (
        <VStack direction="column" spacing="3" textAlign="center">
          <Heading as="h2">My profile</Heading>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={data.me.profilePicture}
            alt="profile picture"
          />
          <Stack>
            <Text fontWeight="bold" fontSize="lg">
              {data.me.name}{" "}
              <Text
                as="span"
                textTransform="uppercase"
                fontWeight="normal"
                fontSize="sm"
              >
                ({data.me.__typename})
              </Text>
            </Text>
          </Stack>
          {data.me.__typename === "Host" && (
            <Box>
              <Text mb="1" fontWeight="bold" alignSelf="flex-start">
                About
              </Text>
              <Textarea
                ref={txtProfileDescRef}
                placeholder="Profile description"
                defaultValue={data.me.profileDescription}
                width="400px"
              />
            </Box>
          )}
          <Stack direction="row" spacing="2">
            {data.me.__typename === "Host" && (
              <Button
                rightIcon={<IoCheckmark />}
                onClick={() => {
                  const updateProfileInput = {
                    profileDescription: txtProfileDescRef.current?.value,
                  };
                  return updateProfileData({
                    variables: {
                      updateProfileInput,
                    },
                  });
                }}
                isDisabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            )}
            {data.me.__typename === "Guest" && (
              <Box>
                <Button as={Link} to="/wallet" rightIcon={<IoWallet />}>
                  Go to wallet
                </Button>
              </Box>
            )}
            <Button
              as={Link}
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                setUser(undefined);
                client.clearStore();
              }}
              rightIcon={<IoExit />}
              variant="outline"
            >
              Logout
            </Button>
          </Stack>
        </VStack>
      )}
    </Center>
  );
}
