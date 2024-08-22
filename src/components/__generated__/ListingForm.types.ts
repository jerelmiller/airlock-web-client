import * as Types from "../../__generated__/types";

export type GetAllAmenitiesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetAllAmenitiesQuery = {
  __typename?: "Query";
  listingAmenities: Array<{
    __typename?: "Amenity";
    id: string;
    category: Types.AmenityCategory;
    name: string;
  }>;
};
