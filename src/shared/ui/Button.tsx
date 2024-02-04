import styled, { css } from "styled-components";

export const Button = styled.button<{ $primary?: boolean }>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
  margin: 0.5em 1em;
  padding: 0.5em 1.5em;
  cursor: pointer;
  transition: all ease 0.2s;
  font-size: 1rem;
  margin: 0;

  &:hover {
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondaryColor};
  }

  ${(props) =>
    props.$primary &&
    css`
      background: ${props.theme.primaryColor};
      color: ${props.theme.secondaryColor};

      &:hover {
        border: 2px solid ${props.theme.primaryColor};
        color: ${props.theme.primaryColor};
        background: ${props.theme.secondaryColor};
      }
    `};
`;
