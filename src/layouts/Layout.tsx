import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";

export default function Layout() {
  return (
    <Container maxW="container.xl" mb={24}>
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </Container>
  );
}
