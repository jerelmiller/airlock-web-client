import { Center } from "@chakra-ui/react";

interface PageErrorProps {
  error: Error;
}

export function PageError({ error }: PageErrorProps) {
  return <Center>uhoh error! {error.message}</Center>;
}
