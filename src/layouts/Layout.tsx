import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container maxW="container.xl" mb={24}>
      <Outlet />
    </Container>
  );
}
