import * as GraphQLTypes from "../../__generated__/types";

export type UpdateListingMutationMutationVariables = GraphQLTypes.Exact<{
  listingId: GraphQLTypes.Scalars["ID"]["input"];
  listing: GraphQLTypes.UpdateListingInput;
}>;

export type UpdateListingMutationMutation = {
  __typename?: "Mutation";
  updateListing: {
    __typename?: "UpdateListingResponse";
    success: boolean;
    message: string;
    listing?: {
      __typename?: "Listing";
      id: string;
      title: string;
      photoThumbnail: string;
      numOfBeds: number;
      description: string;
      overallRating?: number | null;
      costPerNight: number;
      locationType: GraphQLTypes.LocationType;
      amenities: Array<{
        __typename?: "Amenity";
        id: string;
        category: GraphQLTypes.AmenityCategory;
        name: string;
      } | null>;
    } | null;
  };
};

export type GetListingQueryVariables = GraphQLTypes.Exact<{
  id: GraphQLTypes.Scalars["ID"]["input"];
}>;

export type GetListingQuery = {
  __typename?: "Query";
  listing?: {
    __typename?: "Listing";
    id: string;
    title: string;
    photoThumbnail: string;
    numOfBeds: number;
    description: string;
    overallRating?: number | null;
    costPerNight: number;
    locationType: GraphQLTypes.LocationType;
    amenities: Array<{
      __typename?: "Amenity";
      id: string;
      name: string;
      category: GraphQLTypes.AmenityCategory;
    } | null>;
  } | null;
};
