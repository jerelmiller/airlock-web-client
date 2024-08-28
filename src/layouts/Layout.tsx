import Nav from "../components/Nav";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Container maxW="container.xl" mb={24}>
        <Outlet />
      </Container>
    </>
  );
}
