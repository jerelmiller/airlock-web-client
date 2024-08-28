import { ReactNode } from "react";
import Nav from "../components/Nav";
import { Container, ContainerProps } from "@chakra-ui/react";

interface LayoutProps extends ContainerProps {
  children?: ReactNode;
  containerSize?: string;
}

export default function Layout({
  children,
  containerSize = "container.xl",
  ...props
}: LayoutProps) {
  return (
    <>
      <Nav />
      <Container maxW={containerSize} {...props} mb={24}>
        {children}
      </Container>
    </>
  );
}
