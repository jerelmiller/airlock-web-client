import * as GraphQLTypes from "../../__generated__/types";

export type GetAllAmenitiesQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetAllAmenitiesQuery = {
  __typename?: "Query";
  listingAmenities: Array<{
    __typename?: "Amenity";
    id: string;
    category: GraphQLTypes.AmenityCategory;
    name: string;
  }>;
};
