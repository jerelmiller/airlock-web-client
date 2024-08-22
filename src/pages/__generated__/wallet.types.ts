import * as GraphQLTypes from "../../__generated__/types";

export type AddFundsMutationVariables = GraphQLTypes.Exact<{
  amount: GraphQLTypes.Scalars["Float"]["input"];
}>;

export type AddFundsMutation = {
  addFundsToWallet: {
    __typename: "AddFundsToWalletResponse";
    code: number;
    success: boolean;
    message: string;
    amount: number | null;
  };
};
