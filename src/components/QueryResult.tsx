import { Center, Spinner } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";

interface QueryResultProps<TData> {
  loading: boolean;
  error: ApolloError | undefined;
  data: TData;
  children: (data: NonNullable<TData>) => JSX.Element;
}

export default function QueryResult<TData = unknown>({
  loading,
  error,
  data,
  children,
}: QueryResultProps<TData>) {
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (error) {
    return <Center>uhoh error! {error.message}</Center>;
  }

  if (data) {
    return children(data);
  }

  return <Center>Nothing to show</Center>;
}
