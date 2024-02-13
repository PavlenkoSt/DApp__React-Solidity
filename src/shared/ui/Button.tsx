import { ButtonHTMLAttributes } from "react";
import styled, { css, useTheme } from "styled-components";
import { Loader } from "./Loader";

type BtnVariants = "primary" | "default";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: BtnVariants;
  loading?: boolean;
}

export const Button = ({
  loading,
  $variant = "default",
  disabled,
  children,
  ...rest
}: IProps) => {
  const theme = useTheme();

  return (
    <ButtonElem
      disabled={!!disabled || !!loading}
      $variant={$variant}
      {...rest}
    >
      {loading && <Loader size={20} color={theme.secondaryColor} />}
      {children}
    </ButtonElem>
  );
};

const ButtonElem = styled.button<{ $variant: BtnVariants; disabled: boolean }>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
  margin: 0.5em 1em;
  padding: 0.5em 1.5em;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: all ease 0.2s;
  font-size: 1rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        background: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.secondaryColor};
      }
    `}

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background: ${props.theme.primaryColor};
      color: ${props.theme.secondaryColor};

      ${!props.disabled &&
      css`
        border: 2px solid ${props.theme.primaryColor};
        color: ${props.theme.primaryColor};
        background: ${props.theme.secondaryColor};
      `}
    `};
`;
