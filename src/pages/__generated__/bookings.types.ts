import * as Types from "../../__generated__/types";

export type GetCurrrentAndUpcomingBookingsForHostListingQueryVariables =
  Types.Exact<{
    listingId: Types.Scalars["ID"]["input"];
    upcomingStatus?: Types.InputMaybe<Types.BookingStatus>;
    currentStatus?: Types.InputMaybe<Types.BookingStatus>;
  }>;

export type GetCurrrentAndUpcomingBookingsForHostListingQuery = {
  __typename?: "Query";
  listing?: { __typename?: "Listing"; id: string; title: string } | null;
  upcomingBookings: Array<{
    __typename?: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: Types.BookingStatus;
    listing: {
      __typename?: "Listing";
      id: string;
      host: { __typename?: "Host"; id: string };
    };
    guest: {
      __typename?: "Guest";
      id: string;
      name: string;
      profilePicture: string;
    };
  } | null>;
  currentBooking: Array<{
    __typename?: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: Types.BookingStatus;
    listing: {
      __typename?: "Listing";
      id: string;
      title: string;
      host: { __typename?: "Host"; id: string };
    };
    guest: {
      __typename?: "Guest";
      id: string;
      name: string;
      profilePicture: string;
    };
  } | null>;
};
