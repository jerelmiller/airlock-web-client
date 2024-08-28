import * as GraphQLTypes from "./types";

export type ListingFragment = {
  __typename: "Listing";
  id: string;
  title: string;
  photoThumbnail: string;
  numOfBeds: number;
  description: string;
  overallRating: number | null;
  costPerNight: number;
  locationType: GraphQLTypes.LocationType;
};

export type GetHostListingsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetHostListingsQuery = {
  hostListings: Array<{
    __typename: "Listing";
    numberOfUpcomingBookings: number;
    id: string;
    title: string;
    photoThumbnail: string;
    numOfBeds: number;
    description: string;
    overallRating: number | null;
    costPerNight: number;
    locationType: GraphQLTypes.LocationType;
  } | null>;
};
