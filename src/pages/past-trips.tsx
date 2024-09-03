import Trips from "../components/Trips";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetPastTripsQuery,
  GetPastTripsQueryVariables,
} from "./__generated__/past-trips.types";
import { preloadQuery } from "../apolloClient";
import { useLoaderData } from "react-router-dom";

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

export function loader() {
  return preloadQuery(PAST_GUEST_TRIPS);
}

export default function PastTrips() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { pastGuestBookings } = data;

  return <Trips trips={pastGuestBookings.filter(Boolean)} isPast />;
}
