import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Icon } from "../../../../components"
import { removePostAsync, openModal, CLOSE_MODAL } from "../../../../actions"
import { checkAccess } from "../../../../utils"
import { ROLE } from "../../../../constants"
import { selectUserRole } from "../../../../selectors"

function SpecialPanelContainer({ className, id, publishedAt, iconButton }) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const roleId = useSelector(selectUserRole)

  function onPostRemove(id) {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(id)).then(() => navigate("/"))
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    )
  }
  const isAdmin = checkAccess([ROLE.ADMIN], roleId)

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <Icon
            inactive={true}
            iconId="fa-calendar-o"
            margin="0 10px 0 0"
            size="18px"
          />
        )}
        {publishedAt}
      </div>

      {isAdmin && (
        <div className="buttons">
          {iconButton}

          {publishedAt && (
            <Icon
              iconId="fa-trash-o"
              size="20px"
              onClick={() => onPostRemove(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;

  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    align-items: center;
  }
`
SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  iconButton: PropTypes.node.isRequired,
}
