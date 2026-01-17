import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { Icon } from "../../../../components"
import { removePostAsync, openModal, CLOSE_MODAL } from "../../../../actions"
import { useServerRequest } from "../../../../hooks"

function SpecialPanelContainer({ className, id, publishedAt, iconButton }) {
  const dispatch = useDispatch()
  const requestServer = useServerRequest()
  const navigate = useNavigate()

  function onPostRemove(id) {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => navigate("/"))
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    )
  }

  return (
    <div className={className}>
      <div className="published-at">
        <Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="18px" />
        {publishedAt}
      </div>
      <div className="buttons">
        {iconButton}

        <Icon
          iconId="fa-trash-o"
          size="20px"
          onClick={() => onPostRemove(id)}
        />
      </div>
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
