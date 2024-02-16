import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<IProps> = (props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
