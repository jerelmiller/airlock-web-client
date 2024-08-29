import * as GraphQLTypes from "../../__generated__/types";

export type GetMyProfileQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetMyProfileQuery = {
  me:
    | {
        __typename: "Guest";
        funds: number;
        id: string;
        name: string;
        profilePicture: string;
      }
    | {
        __typename: "Host";
        profileDescription: string;
        id: string;
        name: string;
        profilePicture: string;
      };
};

export type CurrentUserIdFragment = { currentUserId: string | null };
