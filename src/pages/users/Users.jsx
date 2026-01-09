import styled from "styled-components"
import { useEffect, useState } from "react"

import { H2, Content } from "../../components"
import { UserRow, TableRow } from "./components"
import { useServerRequest } from "../../hooks"
import { ROLE } from "../../constants"

function UsersContainer({ className }) {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const requestServer = useServerRequest()

  useEffect(() => {
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
  }, [requestServer, shouldUpdateUserList])

  function onUserRemove(userId) {
    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList)
    })
  }

  return (
    <div className={className}>
      <Content error={errorMessage}>
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
      </Content>
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
