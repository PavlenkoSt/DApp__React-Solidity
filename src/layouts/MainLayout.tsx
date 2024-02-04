import { Outlet } from "react-router-dom";
import styled from "styled-components";
import HeaderWidget from "@/widgets/HeaderWidget";
import { responsive } from "@/shared/styles/responsive";

export default function MainLayout() {
  return (
    <Container>
      <HeaderWidget />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
}

const Container = styled.div``;

const Body = styled.div`
  padding: 60px 5px;
  @media ${responsive.mobileL} {
    padding: 80px 20px;
  }
`;
