import { MdDarkMode, MdLightMode } from "react-icons/md";
import styled from "styled-components";
import { ThemeToken } from "@/shared/types/ThemeToken";
import { setThemeToLS } from "@/shared/utils/localStorage";
import { useThemeToken } from "./index";

export function ThemeSwitcher() {
  const { token, setToken } = useThemeToken();

  const changeTheme = (token: ThemeToken) => {
    setToken(token);
    setThemeToLS(token);
  };

  const toggleTheme = () => {
    changeTheme(
      token === ThemeToken.Default ? ThemeToken.Dark : ThemeToken.Default
    );
  };

  return (
    <Container onClick={toggleTheme}>
      {token === ThemeToken.Default ? <LightIcon /> : <DarkIcon />}
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(0.9);
  }
`;

const LightIcon = styled(MdLightMode)`
  color: white;
  font-size: 25px;
`;

const DarkIcon = styled(MdDarkMode)`
  color: white;
  font-size: 25px;
`;
