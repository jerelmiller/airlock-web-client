import Bookings from "../components/Bookings";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables,
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables,
} from "./__generated__/past-bookings.types";
import { BookingStatus } from "../__generated__/types";

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables
> = gql`
  mutation SubmitGuestReview($bookingId: ID!, $guestReview: ReviewInput!) {
    submitGuestReview(bookingId: $bookingId, guestReview: $guestReview) {
      success
      message
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export const HOST_BOOKINGS: TypedDocumentNode<
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables
> = gql`
  query GetPastBookingsForHostListing($listingId: ID!, $status: BookingStatus) {
    listing(id: $listingId) {
      id
      title
    }
    bookingsForListing(listingId: $listingId, status: $status) {
      id
      listing {
        id
        host {
          id
        }
      }
      guest {
        id
        name
        profilePicture
      }
      checkInDate
      checkOutDate
      status
      locationReview {
        id
        rating
        text
      }
      hostReview {
        id
        rating
        text
      }
      guestReview {
        id
        rating
        text
      }
    }
  }
`;

export default function HostBookings() {
  const { id } = useParams();
  const { data } = useSuspenseQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id!,
      status: BookingStatus.COMPLETED,
    },
  });

  const { bookingsForListing, listing } = data;

  return (
    <Bookings
      title={listing?.title ?? ""}
      bookings={bookingsForListing.filter(Boolean)}
      isPast
    />
  );
}
