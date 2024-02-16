import styled from "styled-components";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import HeaderWidget from "@/widgets/HeaderWidget";
import { responsive } from "@/shared/styles/responsive";

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <HeaderWidget />
        <Body>
          <Outlet />
        </Body>
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});

const Container = styled.div``;

const Body = styled.div`
  padding: 60px 5px;
  @media ${responsive.mobileL} {
    padding: 80px 20px 20px;
  }
`;
