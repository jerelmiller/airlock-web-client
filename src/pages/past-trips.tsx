import Layout from "../layouts/Layout";
import QueryResult from "../components/QueryResult";
import Trips from "../components/Trips";
import { gql, useQuery, TypedDocumentNode } from "@apollo/client";
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
  const { loading, error, data } = useQuery(PAST_GUEST_TRIPS);

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {({ pastGuestBookings }) => (
          <Trips trips={pastGuestBookings.filter(Boolean)} isPast />
        )}
      </QueryResult>
    </Layout>
  );
}
