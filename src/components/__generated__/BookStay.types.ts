import * as Types from "../../__generated__/types";

export type BookStayMutationVariables = Types.Exact<{
  createBookingInput?: Types.InputMaybe<Types.CreateBookingInput>;
}>;

export type BookStayMutation = {
  __typename?: "Mutation";
  createBooking: {
    __typename?: "CreateBookingResponse";
    success: boolean;
    message: string;
    booking?: {
      __typename?: "NewBookingResponse";
      id: string;
      checkInDate: string;
      checkOutDate: string;
    } | null;
  };
};
