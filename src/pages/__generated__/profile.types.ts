import * as Types from "../../__generated__/types";

export type UpdateUserProfileMutationVariables = Types.Exact<{
  updateProfileInput?: Types.InputMaybe<Types.UpdateProfileInput>;
}>;

export type UpdateUserProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "UpdateProfileResponse";
    code: number;
    success: boolean;
    message: string;
    user?:
      | {
          __typename?: "Guest";
          id: string;
          name: string;
          profilePicture: string;
        }
      | {
          __typename?: "Host";
          profileDescription: string;
          id: string;
          name: string;
          profilePicture: string;
        }
      | null;
  };
};
