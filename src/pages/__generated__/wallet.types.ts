import * as Types from "../../__generated__/types";

export type AddFundsMutationVariables = Types.Exact<{
  amount: Types.Scalars["Float"]["input"];
}>;

export type AddFundsMutation = {
  __typename?: "Mutation";
  addFundsToWallet: {
    __typename?: "AddFundsToWalletResponse";
    code: number;
    success: boolean;
    message: string;
    amount?: number | null;
  };
};
