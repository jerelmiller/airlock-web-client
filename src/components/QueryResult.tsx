import { Center } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";
import { PageSpinner } from "./PageSpinner";

interface QueryResultProps<TData> {
  loading: boolean;
  error: ApolloError | undefined;
  data: TData;
  children: (data: NonNullable<TData>) => JSX.Element | null;
}

export default function QueryResult<TData = unknown>({
  loading,
  error,
  data,
  children,
}: QueryResultProps<TData>) {
  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <Center>uhoh error! {error.message}</Center>;
  }

  if (data) {
    return children(data);
  }

  return <Center>Nothing to show</Center>;
}
