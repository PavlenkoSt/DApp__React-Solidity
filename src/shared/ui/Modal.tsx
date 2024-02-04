import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ show, onClose, children }: IProps) => {
  return (
    <ModalWrapper $show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
`;
