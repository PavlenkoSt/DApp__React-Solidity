import styled from "styled-components";

interface IProps {
  message?: string;
}

export const PageError = ({ message }: IProps) => {
  return <Message>{message ? message : "Something went wrong"}</Message>;
};

const Message = styled.h1`
  margin: 20px;
  text-align: center;
`;
