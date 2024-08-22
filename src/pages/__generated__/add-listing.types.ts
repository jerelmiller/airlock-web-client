import * as GraphQLTypes from "../../__generated__/types";

export type CreateListingMutationVariables = GraphQLTypes.Exact<{
  listing: GraphQLTypes.CreateListingInput;
}>;

export type CreateListingMutation = {
  createListing: {
    __typename?: "CreateListingResponse";
    success: boolean;
    message: string;
    listing: {
      __typename?: "Listing";
      id: string;
      title: string;
      photoThumbnail: string;
      numOfBeds: number;
      description: string;
      overallRating: number | null;
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
