import { ReactNode } from "react";
import Nav from "../components/Nav";
import { Container, ContainerProps } from "@chakra-ui/react";

interface LayoutProps extends ContainerProps {
  children?: ReactNode;
  noNav?: boolean;
  containerSize?: string;
}

export default function Layout({
  noNav,
  children,
  containerSize = "container.xl",
  ...props
}: LayoutProps) {
  return (
    <>
      {!noNav && <Nav />}
      <Container maxW={containerSize} {...props} mb={24}>
        {children}
      </Container>
    </>
  );
}

Layout.propTypes = {};
