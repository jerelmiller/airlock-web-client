import * as Types from "../../__generated__/types";

export type GetListingDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type GetListingDetailsQuery = {
  __typename?: "Query";
  listing?: {
    __typename?: "Listing";
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    costPerNight: number;
    locationType: Types.LocationType;
    overallRating?: number | null;
    amenities: Array<{
      __typename?: "Amenity";
      name: string;
      category: Types.AmenityCategory;
    } | null>;
    reviews: Array<{
      __typename?: "Review";
      text: string;
      rating: number;
      author:
        | {
            __typename?: "Guest";
            id: string;
            name: string;
            profilePicture: string;
          }
        | {
            __typename?: "Host";
            id: string;
            name: string;
            profilePicture: string;
          };
    } | null>;
    host: {
      __typename?: "Host";
      id: string;
      name: string;
      profilePicture: string;
      profileDescription: string;
      overallRating?: number | null;
    };
    bookings: Array<{
      __typename?: "Booking";
      checkInDate: string;
      checkOutDate: string;
    } | null>;
  } | null;
};
