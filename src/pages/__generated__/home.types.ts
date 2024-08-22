import * as Types from "../../__generated__/types";

export type GetFeaturedListingsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetFeaturedListingsQuery = {
  __typename?: "Query";
  featuredListings: Array<{
    __typename?: "Listing";
    id: string;
    title: string;
    photoThumbnail: string;
    numOfBeds: number;
    overallRating?: number | null;
    locationType: Types.LocationType;
    costPerNight: number;
  }>;
};
