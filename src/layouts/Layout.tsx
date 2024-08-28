import { ReactNode } from "react";
import Nav from "../components/Nav";
import { Container, ContainerProps } from "@chakra-ui/react";

interface LayoutProps extends ContainerProps {
  children?: ReactNode;
}

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <Nav />
      <Container maxW="container.xl" {...props} mb={24}>
        {children}
      </Container>
    </>
  );
}
