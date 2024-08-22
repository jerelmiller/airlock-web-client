import * as Types from "../../__generated__/types";

export type SubmitGuestReviewMutationVariables = Types.Exact<{
  bookingId: Types.Scalars["ID"]["input"];
  guestReview: Types.ReviewInput;
}>;

export type SubmitGuestReviewMutation = {
  __typename?: "Mutation";
  submitGuestReview: {
    __typename?: "SubmitGuestReviewResponse";
    success: boolean;
    message: string;
    guestReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  };
};

export type GetPastBookingsForHostListingQueryVariables = Types.Exact<{
  listingId: Types.Scalars["ID"]["input"];
  status?: Types.InputMaybe<Types.BookingStatus>;
}>;

export type GetPastBookingsForHostListingQuery = {
  __typename?: "Query";
  listing?: { __typename?: "Listing"; id: string; title: string } | null;
  bookingsForListing: Array<{
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
    locationReview?: {
      __typename?: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    hostReview?: {
      __typename?: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    guestReview?: {
      __typename?: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
  } | null>;
};
