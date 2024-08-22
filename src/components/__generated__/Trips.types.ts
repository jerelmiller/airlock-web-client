import * as Types from "../../__generated__/types";

export type SubmitHostAndLocationReviewsMutationVariables = Types.Exact<{
  bookingId: Types.Scalars["ID"]["input"];
  hostReview: Types.ReviewInput;
  locationReview: Types.ReviewInput;
}>;

export type SubmitHostAndLocationReviewsMutation = {
  __typename?: "Mutation";
  submitHostAndLocationReviews: {
    __typename?: "SubmitHostAndLocationReviewsResponse";
    success: boolean;
    message: string;
    hostReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    locationReview?: {
      __typename?: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  };
};
