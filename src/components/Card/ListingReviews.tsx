import TripReviews from "../TripReviews";
import { DocumentNode, MutationHookOptions } from "@apollo/client";
import { Review as ReviewType } from "../../__generated__/types";

interface Trip {
  locationReview: ReviewType | null;
  hostReview: ReviewType | null;
  guestReview: ReviewType | null;
  listing: {
    host: {
      id: string;
    };
  };
}

interface ListingReviewsProps {
  title: string;
  trip: Trip;
  mutationConfig: {
    mutation: DocumentNode;
    mutationOptions: MutationHookOptions;
  };
}

export function ListingReviews({
  title,
  trip,
  mutationConfig,
}: ListingReviewsProps) {
  const { locationReview, hostReview, guestReview } = trip;
  const { mutation, mutationOptions } = mutationConfig;

  return (
    <TripReviews
      ratingKey={title}
      locationReview={locationReview}
      hostReview={hostReview}
      guestReview={guestReview}
      isHost={trip.listing.host.id === localStorage.getItem("token")}
      mutation={mutation}
      mutationOptions={mutationOptions}
    />
  );
}
