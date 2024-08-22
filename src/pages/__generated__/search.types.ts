import * as GraphQLTypes from "../../__generated__/types";

export type SearchListingsQueryVariables = GraphQLTypes.Exact<{
  searchListingsInput: GraphQLTypes.SearchListingsInput;
}>;

export type SearchListingsQuery = {
  searchListings: Array<{
    __typename?: "Listing";
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
