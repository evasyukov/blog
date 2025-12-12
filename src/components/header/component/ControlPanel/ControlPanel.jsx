import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

import { Icon } from "../../../../components"

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 30px;

  font-size: 18px;
  user-select: none;

  border: 1px solid #000;
  border-radius: 7px;

  &:hover {
    background-color: #ddddddd0;
  }
`

const Button = styled.div`
  cursor: pointer;
`

function ControlPanelContainer({ className }) {
  const navigate = useNavigate()

  return (
    <div className={className}>
      <RightAligned>
        <StyledLink to="/login">Войти</StyledLink>
      </RightAligned>
      <RightAligned>
        <Button onClick={() => navigate(-1)}>
          <Icon iconId="fa-backward" margin="16px 0 0 0" />
        </Button>

        <Link to="post">
          <Icon iconId="fa-file-text-o" margin="16px 0 0 16px" />
        </Link>
        <Link to="/users">
          <Icon iconId="fa-users" margin="16px 0 0 16px" />
        </Link>
      </RightAligned>
    </div>
  )
}

export const ControlPanel = styled(ControlPanelContainer)``
