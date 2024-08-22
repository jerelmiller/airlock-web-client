import * as GraphQLTypes from "../../__generated__/types";

export type GetGuestTripsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetGuestTripsQuery = {
  upcomingGuestBookings: Array<{
    __typename: "Booking";
    checkInDate: string;
    checkOutDate: string;
    status: GraphQLTypes.BookingStatus;
    listing: { __typename: "Listing"; title: string; photoThumbnail: string };
    locationReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    hostReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    guestReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  } | null>;
};
