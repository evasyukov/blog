import styled from "styled-components"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { H2, PrivateContent } from "../../components"
import { UserRow, TableRow } from "./components"
import { useServerRequest } from "../../hooks"
import { selectUserRole } from "../../selectors"
import { ROLE } from "../../constants"
import { checkAccess } from "../../utils"

function UsersContainer({ className }) {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const userRole = useSelector(selectUserRole)
  const requestServer = useServerRequest()

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) return

    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersResponse, rolesResponse]) => {
      if (usersResponse.error || rolesResponse.error) {
        setErrorMessage(usersResponse.error || rolesResponse.error)
        return
      }

      setUsers(usersResponse.response)
      setRoles(rolesResponse.response)
    })
  }, [requestServer, shouldUpdateUserList, userRole])

  function onUserRemove(userId) {
    if (!checkAccess([ROLE.ADMIN], userRole)) return

    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList)
    })
  }

  return (
    <div className={className}>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registred-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </TableRow>

          {users.map(({ id, login, registedAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registedAt={registedAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </PrivateContent>
    </div>
  )
}

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 580px;

  margin: 0 auto;

  font-size: 18px;
`
