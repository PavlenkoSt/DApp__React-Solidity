import styled from "styled-components";
import { Link as NavLink } from "@tanstack/react-router";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { responsive } from "@/shared/styles/responsive";
import Logo from "@/shared/icons/Logo";

export default function HeaderWidget() {
  return (
    <Header>
      <HeaderBlock>
        <LogoWrapper to="/">
          <Logo width={25} height={25} />
          <LogoTextWrapper>
            <LogoText>Decentralized</LogoText>
            <LogoText>Bank</LogoText>
          </LogoTextWrapper>
        </LogoWrapper>
        <Link to="/">Main</Link>
        <Link to="/transactions">Transactions</Link>
      </HeaderBlock>
      <HeaderBlock>
        <ThemeSwitcher />
      </HeaderBlock>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(12, 13, 15, 0.7);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  z-index: 100000;
`;

const HeaderBlock = styled.div`
  display: flex;
`;

const LogoWrapper = styled(NavLink)`
  display: none;
  align-items: center;
  justify-content: center;
  margin-inline-start: 15px;
  margin-inline-end: 20px;
  text-decoration: none;
  gap: 5px;
  @media ${responsive.mobileL} {
    display: flex;
  }
`;

const LogoTextWrapper = styled.div``;

const LogoText = styled.div`
  color: #fff;
`;

const Link = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  transition: all ease 0.15s;
  padding: 15px;
  font-size: 1.2rem;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;
