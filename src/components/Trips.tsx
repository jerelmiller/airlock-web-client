import {
  Box,
  Heading,
  Link,
  StackDivider,
  Tag,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Content, Image, InnerContainer, OuterContainer } from "./Card";
import { PAST_GUEST_TRIPS } from "../pages/past-trips";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { gql, TypedDocumentNode } from "@apollo/client";
import {
  SubmitHostAndLocationReviewsMutation,
  SubmitHostAndLocationReviewsMutationVariables,
} from "./__generated__/Trips.types";
import { Booking } from "../__generated__/types";
import TripReviews from "./TripReviews";

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitHostAndLocationReviewsMutation,
  SubmitHostAndLocationReviewsMutationVariables
> = gql`
  mutation SubmitHostAndLocationReviews(
    $bookingId: ID!
    $hostReview: ReviewInput!
    $locationReview: ReviewInput!
  ) {
    submitHostAndLocationReviews(
      bookingId: $bookingId
      hostReview: $hostReview
      locationReview: $locationReview
    ) {
      success
      message
      hostReview {
        id
        text
        rating
      }
      locationReview {
        id
        text
        rating
      }
    }
  }
`;

interface TripProps {
  trip: Booking;
  isPast: boolean;
}

function Trip({ trip, isPast }: TripProps) {
  const hasReviews = trip.locationReview !== null && trip.hostReview !== null;

  if (isPast) {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <VStack>
            <Image
              src={trip.listing.photoThumbnail}
              alt={trip.listing.title}
              w="auto"
              h="200px"
            />
            <Content
              title={trip.listing.title}
              checkInDate={trip.checkInDate}
              checkOutDate={trip.checkOutDate}
              hasReviews={hasReviews}
              wrapperProps={{ w: "355px" }}
            />
          </VStack>
          <TripReviews
            ratingKey={trip.listing.title}
            locationReview={trip.locationReview}
            hostReview={trip.hostReview}
            guestReview={trip.guestReview}
            isHost={trip.listing.host.id === localStorage.getItem("token")}
            mutation={SUBMIT_REVIEW}
            mutationOptions={{
              variables: {
                bookingId: trip.id,
              },
              // NOTE: for the scope of this project, we've opted for the simpler refetch approach
              // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
              refetchQueries: [{ query: PAST_GUEST_TRIPS }],
            }}
          />
        </InnerContainer>
      </OuterContainer>
    );
  } else {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <Wrap align="center" spacing="4">
            <Image
              src={trip.listing.photoThumbnail}
              alt={trip.listing.title}
              w="auto"
              h="200px"
            />
            <Content
              title={trip.listing.title}
              checkInDate={trip.checkInDate}
              checkOutDate={trip.checkOutDate}
              wrapperProps={{ ml: "4" }}
            >
              {trip.status === "CURRENT" ? (
                <Tag
                  h="18px"
                  w="300px"
                  rounded="xl"
                  bgColor="#425C0A"
                  color="white"
                  justifyContent="center"
                >
                  You&apos;re staying here right now!
                </Tag>
              ) : null}
            </Content>
          </Wrap>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

interface TripsProps {
  trips: Booking[];
  isPast?: boolean;
}

export default function Trips({ trips, isPast = false }: TripsProps) {
  const { pathname } = useLocation();

  return (
    <>
      <Heading as="h1" mb="4">
        My trips
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to="/trips"
          mr="8"
          fontWeight={pathname === "/trips" ? "bold" : "normal"}
          color={pathname === "/trips" ? "indigo.dark" : "gray.dark"}
        >
          Upcoming
        </Link>
        <Link
          as={RouterLink}
          to="/past-trips"
          fontWeight={pathname === "/past-trips" ? "bold" : "normal"}
          color={pathname === "/past-trips" ? "indigo.dark" : "gray.dark"}
        >
          Past trips
        </Link>
      </Box>

      <VStack spacing="6" divider={<StackDivider />}>
        {trips.map((trip, i) => {
          return (
            <Trip
              key={`${trip.listing.title}-${i}`}
              trip={trip}
              isPast={isPast}
            />
          );
        })}
      </VStack>
    </>
  );
}
