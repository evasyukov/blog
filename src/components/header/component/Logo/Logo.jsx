import styled from "styled-components"
import { Link } from "react-router-dom"

import { Icon } from "../../../../components"

const LogoTitle = styled.div`
  font-size: 62px;
  font-weight: 600;
  line-height: 48px;
  margin-top: 17px;
`

const LogoDiscription = styled.div`
  font-size: 20px;
  font-weight: 600;
`

function LogoContainer({ className }) {
  return (
    <Link className={className} to="/">
      <Icon iconId="fa-code" size="70px" margin="0px" />
      <div>
        <LogoTitle>Блог</LogoTitle>
        <LogoDiscription>Веб-разработчика</LogoDiscription>
      </div>
    </Link>
  )
}

export const Logo = styled(LogoContainer)`
  display: flex;

  color: #000;
  text-decoration: none;

  user-select: none;
`
