import * as GraphQLTypes from "../../__generated__/types";

export type GetCurrrentAndUpcomingBookingsForHostListingQueryVariables =
  GraphQLTypes.Exact<{
    listingId: GraphQLTypes.Scalars["ID"]["input"];
    upcomingStatus?: GraphQLTypes.InputMaybe<GraphQLTypes.BookingStatus>;
    currentStatus?: GraphQLTypes.InputMaybe<GraphQLTypes.BookingStatus>;
  }>;

export type GetCurrrentAndUpcomingBookingsForHostListingQuery = {
  listing: { __typename?: "Listing"; id: string; title: string } | null;
  upcomingBookings: Array<{
    __typename?: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: GraphQLTypes.BookingStatus;
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
    status: GraphQLTypes.BookingStatus;
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
