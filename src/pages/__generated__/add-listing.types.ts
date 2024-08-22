import * as Types from "../../__generated__/types";

export type CreateListingMutationMutationVariables = Types.Exact<{
  listing: Types.CreateListingInput;
}>;

export type CreateListingMutationMutation = {
  __typename?: "Mutation";
  createListing: {
    __typename?: "CreateListingResponse";
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
      locationType: Types.LocationType;
      amenities: Array<{
        __typename?: "Amenity";
        id: string;
        category: Types.AmenityCategory;
        name: string;
      } | null>;
    } | null;
  };
};
