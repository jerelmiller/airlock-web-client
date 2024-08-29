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

export type GetHostListings_LegacyQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetHostListings_LegacyQuery = {
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
