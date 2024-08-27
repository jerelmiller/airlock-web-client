import {
  Box,
  Flex,
  Heading,
  Link,
  StackDivider,
  Text,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Content, Image, InnerContainer, OuterContainer } from "./Card";
import { IoChevronBack } from "react-icons/io5";

import { HOST_BOOKINGS, SUBMIT_REVIEW } from "../pages/past-bookings";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import * as GraphQLTypes from "../__generated__/types";
import { GuestReview } from "./TripReviews";
import { useMutation } from "@apollo/client";

type Booking = Pick<
  GraphQLTypes.Booking,
  | "id"
  | "guestReview"
  | "guest"
  | "checkInDate"
  | "checkOutDate"
  | "status"
  | "locationReview"
  | "hostReview"
  | "listing"
>;

interface BookingProps {
  booking: Booking;
  isPast?: boolean;
}

function Booking({ booking, isPast }: BookingProps) {
  const hasHostReview = booking.guestReview !== null;
  const toast = useToast();

  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    onCompleted: (data) => {
      data.submitGuestReview.success
        ? toast({
            title: "Your review has been submitted.",
            description: "Thank you!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        : toast({
            title: "Something went wrong.",
            description: "Try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
    },
  });

  if (isPast) {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <VStack>
            <Image
              isAvatar
              src={booking.guest.profilePicture}
              w="200px"
              h="auto"
              alt={booking.guest.name}
            />
            <Content
              title={booking.guest.name}
              checkInDate={booking.checkInDate}
              checkOutDate={booking.checkOutDate}
              hasReviews={hasHostReview}
            >
              {booking.status === "CURRENT" ? (
                <Box w="max-content">
                  <Text fontWeight="semibold" fontStyle="italic">
                    Current guest
                  </Text>
                </Box>
              ) : null}
            </Content>
          </VStack>
          <GuestReview
            locationReview={booking.locationReview}
            hostReview={booking.hostReview}
            guestReview={booking.guestReview}
            onSubmitReview={(review) => {
              submitReview({
                variables: {
                  guestReview: review,
                  bookingId: booking.id,
                },
                // NOTE: for the scope of this project, we've opted for the simpler refetch approach
                // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
                refetchQueries: [
                  {
                    query: HOST_BOOKINGS,
                    variables: {
                      listingId: booking.listing.id,
                      status: "COMPLETED",
                    },
                  },
                ],
              });
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
              isAvatar
              src={booking.guest.profilePicture}
              w="100px"
              h="auto"
              alt={booking.guest.name}
            />
            <Content
              title={booking.guest.name}
              checkInDate={booking.checkInDate}
              checkOutDate={booking.checkOutDate}
            >
              {booking.status === "CURRENT" ? (
                <Box w="max-content">
                  <Text fontWeight="semibold" fontStyle="italic">
                    Current guest
                  </Text>
                </Box>
              ) : null}
            </Content>
          </Wrap>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

interface BookingsProps {
  title: string;
  bookings: Booking[];
  isPast?: boolean;
}

export default function Bookings({
  title,
  bookings,
  isPast = false,
}: BookingsProps) {
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <>
      <Flex
        alignItems="center"
        mb="4"
        color="indigo.dark"
        fontWeight="semibold"
      >
        <IoChevronBack />
        <Link as={RouterLink} to={"/listings"} fontWeight="semibold">
          Back to listings
        </Link>
      </Flex>
      <Heading as="h1" mb={4}>
        {title}
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
          to={`/listing/${id}/bookings`}
          mr="8"
          fontWeight={
            pathname === `/listing/${id}/bookings` ? "bold" : "normal"
          }
          color={
            pathname === `/listing/${id}/bookings` ? "indigo.dark" : "gray.dark"
          }
        >
          Upcoming Bookings
        </Link>
        <Link
          as={RouterLink}
          to={`/listing/${id}/past-bookings`}
          fontWeight={
            pathname === `/listing/${id}/past-bookings` ? "bold" : "normal"
          }
          color={
            pathname === `/listing/${id}/past-bookings`
              ? "indigo.dark"
              : "gray.dark"
          }
        >
          Past Bookings
        </Link>
      </Box>

      {bookings.length ? (
        <VStack spacing="4" divider={<StackDivider />}>
          {bookings.map((booking, i) => {
            return (
              <Booking
                key={`${title}-${i}`}
                booking={booking}
                isPast={isPast}
              />
            );
          })}
        </VStack>
      ) : (
        <Text textAlign="center">
          You have no {isPast ? "previous" : "current or upcoming"} bookings
        </Text>
      )}
    </>
  );
}
