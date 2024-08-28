import CurrentTrips from "../components/Trips";
import QueryResult from "../components/QueryResult";
import { gql, useQuery } from "@apollo/client";

export const GUEST_TRIPS = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      checkInDate
      checkOutDate
      status
      listing {
        title
        photoThumbnail
      }
      locationReview {
        id
        text
        rating
      }
      hostReview {
        id
        text
        rating
      }
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export default function Trips() {
  const { loading, error, data } = useQuery(GUEST_TRIPS);

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {({ upcomingGuestBookings }) => (
        <CurrentTrips trips={upcomingGuestBookings} />
      )}
    </QueryResult>
  );
}
