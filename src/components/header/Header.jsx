import styled from "styled-components"

import { ControlPanel, Logo } from "./component"

const Discription = styled.div`
  font-style: italic;
`

function HeaderContainer({ className }) {
  return (
    <header className={className}>
      <Logo />
      <Discription>
        Веб-технологии <br />
        Написание кода <br />
        Разбор ошибок <br />
      </Discription>
      <ControlPanel />
    </header>
  )
}

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;

  position: fixed;

  height: 130px;
  width: 1000px;

  padding: 10px 40px;

  box-shadow: 0 0 7px 1px rgba(0, 0, 0);
`
