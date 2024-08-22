import * as GraphQLTypes from "../../__generated__/types";

export type GetPastTripsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetPastTripsQuery = {
  __typename?: "Query";
  pastGuestBookings: Array<{
    __typename?: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: GraphQLTypes.BookingStatus;
    listing: {
      __typename?: "Listing";
      title: string;
      photoThumbnail: string;
      host: { __typename?: "Host"; id: string };
    };
    guest: { __typename?: "Guest"; id: string };
    locationReview: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    hostReview: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    guestReview: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  } | null>;
};
