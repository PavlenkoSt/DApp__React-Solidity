import styled from "styled-components";

import { Loader } from "./Loader";

export const PageLoading = () => {
  return (
    <Container>
      <Loader />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;
