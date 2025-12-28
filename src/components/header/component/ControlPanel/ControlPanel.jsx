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
  align-items: center;
`

const StyledBackIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`
const StyledLogoutIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const UserName = styled.div`
  font-size: 17px;
  font-weight: bold;
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
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName> {login} </UserName>
            <StyledLogoutIcon>
              <Icon
                iconId="fa-sign-out"
                margin="0 0 0 10px"
                onClick={() => dispatch(logout(session))}
              />
            </StyledLogoutIcon>
          </>
        )}
      </RightAligned>
      <RightAligned>
        <StyledBackIcon onClick={() => navigate(-1)}>
          <Icon iconId="fa-backward" margin="16px 0 0 0" />
        </StyledBackIcon>

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
