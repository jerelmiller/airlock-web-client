import Bookings from "../components/Bookings";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables,
} from "./__generated__/bookings.types";
import { BookingStatus } from "../__generated__/types";
import { Center } from "@chakra-ui/react";

export const HOST_BOOKINGS: TypedDocumentNode<
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables
> = gql`
  query GetCurrrentAndUpcomingBookingsForHostListing(
    $listingId: ID!
    $upcomingStatus: BookingStatus
    $currentStatus: BookingStatus
  ) {
    listing(id: $listingId) {
      id
      title
    }
    upcomingBookings: bookingsForListing(
      listingId: $listingId
      status: $upcomingStatus
    ) {
      id
      ...Bookings_bookings
    }

    currentBooking: bookingsForListing(
      listingId: $listingId
      status: $currentStatus
    ) {
      id
      ...Bookings_bookings
    }
  }
`;

export default function HostBookings() {
  const { id } = useParams();
  const { data } = useSuspenseQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id!,
      upcomingStatus: BookingStatus.UPCOMING,
      currentStatus: BookingStatus.CURRENT,
    },
  });

  const { upcomingBookings, currentBooking, listing } = data;
  const bookings = [...upcomingBookings, ...currentBooking];

  if (!listing) {
    return <Center>Listing could not be found</Center>;
  }

  return <Bookings title={listing.title} bookings={bookings.filter(Boolean)} />;
}
