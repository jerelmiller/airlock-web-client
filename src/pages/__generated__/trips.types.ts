import * as Types from "../../__generated__/types";

export type GetGuestTripsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetGuestTripsQuery = {
  __typename?: "Query";
  upcomingGuestBookings: Array<{
    __typename?: "Booking";
    checkInDate: string;
    checkOutDate: string;
    status: Types.BookingStatus;
    listing: { __typename?: "Listing"; title: string; photoThumbnail: string };
    locationReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    hostReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    guestReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  } | null>;
};
