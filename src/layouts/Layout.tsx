import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";

export default function Layout() {
  const { state } = useNavigation();

  return (
    <Container maxW="container.xl" mb={24}>
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <div style={{ opacity: state === "loading" ? 0.5 : 1 }}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </Suspense>
    </Container>
  );
}
