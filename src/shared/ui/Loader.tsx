import { BiLoader } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

export const Loader = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled(BiLoader)`
  font-size: 30px;
  color: ${(props) => props.theme.tertiaryColor};
  animation: ${rotate} 1s linear infinite;
`;

const LoadingText = styled.span`
  margin-left: 10px;
  font-size: 1rem;
  color: ${(props) => props.theme.tertiaryColor};
`;
