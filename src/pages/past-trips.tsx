import Trips from "../components/Trips";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetPastTripsQuery,
  GetPastTripsQueryVariables,
} from "./__generated__/past-trips.types";

export const PAST_GUEST_TRIPS: TypedDocumentNode<
  GetPastTripsQuery,
  GetPastTripsQueryVariables
> = gql`
  query GetPastTrips {
    pastGuestBookings {
      id
      ...Trips_trips
    }
  }
`;

export default function PastTrips() {
  const { data } = useSuspenseQuery(PAST_GUEST_TRIPS);
  const { pastGuestBookings } = data;

  return <Trips trips={pastGuestBookings.filter(Boolean)} isPast />;
}
