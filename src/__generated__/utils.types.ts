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
