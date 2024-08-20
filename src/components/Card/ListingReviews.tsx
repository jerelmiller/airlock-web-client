import TripReviews from "../TripReviews";
import { DocumentNode, MutationOptions } from "@apollo/client";

interface ReviewType {
  rating: number;
  text: string;
}

interface Trip {
  locationReview: ReviewType;
  hostReview: ReviewType;
  guestReview: ReviewType;
  listing: {
    host: {
      id: string;
    };
  };
}

interface ListingReviewsProps {
  isPast?: boolean;
  title: string;
  trip: Trip;
  mutationConfig: {
    mutation: DocumentNode;
    mutationOptions: MutationOptions;
  };
}

export function ListingReviews({
  title,
  isPast,
  trip,
  mutationConfig,
}: ListingReviewsProps) {
  const { locationReview, hostReview, guestReview } = trip;
  const { mutation, mutationOptions } = mutationConfig;

  return (
    <TripReviews
      ratingKey={title}
      location={title}
      locationReview={locationReview}
      hostReview={hostReview}
      guestReview={guestReview}
      isPastTrip={isPast}
      isHost={trip.listing.host.id === localStorage.getItem("token")}
      mutation={mutation}
      mutationOptions={mutationOptions}
    />
  );
}
