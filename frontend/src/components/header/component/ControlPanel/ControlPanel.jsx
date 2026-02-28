import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Icon, Button } from "../../../../components"
import { ROLE } from "../../../../constants"
import { selectUserRole, selectUserLogin } from "../../../../selectors"
import { logout } from "../../../../actions"
import { checkAccess } from "../../../../utils"

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

  function onLogout() {
    dispatch(logout())
    sessionStorage.removeItem("userData")
  }

  const isAdmin = checkAccess([ROLE.ADMIN], roleId)

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
            <Icon iconId="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
          </>
        )}
      </RightAligned>

      <RightAligned>
        <Icon
          iconId="fa-backward"
          margin="16px 0 0 0"
          onClick={() => navigate(-1)}
        />

        {isAdmin && (
          <>
            <Link to="post">
              <Icon iconId="fa-file-text-o" margin="16px 0 0 16px" />
            </Link>
            <Link to="/users">
              <Icon iconId="fa-users" margin="16px 0 0 16px" />
            </Link>
          </>
        )}
      </RightAligned>
    </div>
  )
}

export const ControlPanel = styled(ControlPanelContainer)`
  width: 110px;
`
