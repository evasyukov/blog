import styled from "styled-components"
import { useState } from "react"
import PropTypes from "prop-types"

import { Icon } from "../../../../components"
import { TableRow } from "../table-row/TableRow"
import { useServerRequest } from "../../../../hooks"
import { PROP_TYPE } from "../../../../constants"

function UserRowContainer({
  className,
  id,
  login,
  registedAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId)
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

  const requestServer = useServerRequest()

  function onRoleChange({ target }) {
    setSelectedRoleId(Number(target.value))
  }

  function onRoleSave(userId, newUserRoleId) {
    requestServer("updateUserRole", userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId)
    })
  }

  const isSaveButtonDisabled = selectedRoleId === initialRoleId

  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registred-column">{registedAt}</div>

        <div className="role-column">
          <select value={selectedRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option value={roleId} key={roleId}>
                {roleName}
              </option>
            ))}
          </select>

          <Icon
            iconId="fa-floppy-o"
            margin="0 0 0 10px"
            disabled={isSaveButtonDisabled}
            onClick={() => onRoleSave(id, selectedRoleId)}
          />
        </div>
      </TableRow>
      <Icon iconId="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
    </div>
  )
}

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;

  & select {
    font-size: 14px;
    padding: 0 5px;

    border-top: none;
    border-bottom: none;

    ::after {
      content: "ef";
      padding: 0 5px;
    }
  }
`
UserRow.PropTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registedAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired,
}
