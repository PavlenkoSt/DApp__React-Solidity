import { BiLoader } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

interface IProps {
  color?: string;
}

export const Loader = ({ color }: IProps) => {
  return (
    <LoadingContainer>
      <LoadingSpinner $color={color} />
      <LoadingText $color={color}>Loading...</LoadingText>
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

const LoadingSpinner = styled(BiLoader)<{ $color?: string }>`
  font-size: 30px;
  color: ${(props) =>
    props.$color ? props.$color : props.theme.tertiaryColor};
  animation: ${rotate} 1s linear infinite;
`;

const LoadingText = styled.span<{ $color?: string }>`
  margin-left: 10px;
  font-size: 1rem;
  color: ${(props) =>
    props.$color ? props.$color : props.theme.tertiaryColor};
`;
