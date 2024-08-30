import CurrentTrips from "../components/Trips";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables,
} from "./__generated__/trips.types";

export const GUEST_TRIPS: TypedDocumentNode<
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables
> = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      id
      ...Trip_trip
    }
  }
`;

export default function Trips() {
  const { data } = useSuspenseQuery(GUEST_TRIPS);
  const { upcomingGuestBookings } = data;

  return <CurrentTrips trips={upcomingGuestBookings.filter(Boolean)} />;
}
