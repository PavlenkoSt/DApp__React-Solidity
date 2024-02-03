import { Outlet } from "react-router-dom";
import styled from "styled-components";
import HeaderWidget from "@/widgets/HeaderWidget";

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
  padding: 80px 20px;
`;
