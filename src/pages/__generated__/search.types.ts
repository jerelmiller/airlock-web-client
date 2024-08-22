import * as Types from "../../__generated__/types";

export type SearchListingsQueryVariables = Types.Exact<{
  searchListingsInput: Types.SearchListingsInput;
}>;

export type SearchListingsQuery = {
  __typename?: "Query";
  searchListings: Array<{
    __typename?: "Listing";
    id: string;
    title: string;
    photoThumbnail: string;
    numOfBeds: number;
    description: string;
    overallRating?: number | null;
    costPerNight: number;
    locationType: Types.LocationType;
  } | null>;
};
