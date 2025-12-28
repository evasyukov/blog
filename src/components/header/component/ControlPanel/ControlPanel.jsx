import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Icon, Button } from "../../../../components"
import { ROLE } from "../../../../constans"
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../selectors"
import { logout } from "../../../../actions"

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`

function ControlPanelContainer({ className }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)
  const session = useSelector(selectUserSession)

  return (
    <div className={className}>
      <RightAligned>
        <Button>
          {roleId === ROLE.GUEST ? (
            <Link to="/login">Войти</Link>
          ) : (
            <>
              <div> {login} </div>
              <StyledIcon onClick={() => dispatch(logout(session))}>
                <Icon iconId="fa-sing-out" margin="16px 0 0 0" />
              </StyledIcon>
            </>
          )}
        </Button>
      </RightAligned>
      <RightAligned>
        <StyledIcon onClick={() => navigate(-1)}>
          <Icon iconId="fa-backward" margin="16px 0 0 0" />
        </StyledIcon>

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
