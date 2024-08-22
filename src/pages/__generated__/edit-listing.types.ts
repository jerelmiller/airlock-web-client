import * as Types from "../../__generated__/types";

export type UpdateListingMutationMutationVariables = Types.Exact<{
  listingId: Types.Scalars["ID"]["input"];
  listing: Types.UpdateListingInput;
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

export type GetListingQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
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
    locationType: Types.LocationType;
    amenities: Array<{
      __typename?: "Amenity";
      id: string;
      name: string;
      category: Types.AmenityCategory;
    } | null>;
  } | null;
};
