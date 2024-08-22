import * as GraphQLTypes from "./types";

export type GetMyProfileQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetMyProfileQuery = {
  __typename?: "Query";
  me:
    | {
        __typename?: "Guest";
        funds: number;
        id: string;
        name: string;
        profilePicture: string;
      }
    | {
        __typename?: "Host";
        profileDescription: string;
        id: string;
        name: string;
        profilePicture: string;
      };
};

export type ListingFragment = {
  __typename?: "Listing";
  id: string;
  title: string;
  photoThumbnail: string;
  numOfBeds: number;
  description: string;
  overallRating?: number | null;
  costPerNight: number;
  locationType: GraphQLTypes.LocationType;
};

export type GetHostListingsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetHostListingsQuery = {
  __typename?: "Query";
  hostListings: Array<{
    __typename?: "Listing";
    numberOfUpcomingBookings: number;
    id: string;
    title: string;
    photoThumbnail: string;
    numOfBeds: number;
    description: string;
    overallRating?: number | null;
    costPerNight: number;
    locationType: GraphQLTypes.LocationType;
  } | null>;
};
