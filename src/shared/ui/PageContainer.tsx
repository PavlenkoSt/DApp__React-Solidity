import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
