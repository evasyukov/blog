import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import { Icon } from "../../../../../../components"
import { useServerRequest } from "../../../../../../hooks"
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from "../../../../../../actions"
import { selectUserRole } from "../../../../../../selectors"
import { ROLE } from "../../../../../../constants"

function CommentContainer({
  className,
  id,
  postId,
  author,
  content,
  publishedAt,
}) {
  const dispatch = useDispatch()
  const requestServer = useServerRequest()

  const userRole = useSelector(selectUserRole)

  function onCommentRemove(id) {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, id, postId))
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    )
  }

  const isAdminOrModerator =
    userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR

  return (
    <div className={className}>
      <div className="comment-block">
        <div className="information-panel">
          <div className="author">
            <Icon
              inactive={true}
              iconId="fa-user-circle-o"
              margin="0 5px 0 0"
              size="16px"
            />

            {author}
          </div>
          <div className="published-at">
            <Icon
              inactive={true}
              iconId="fa-calendar-o"
              margin="0 10px 0 0"
              size="16px"
            />

            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>

      {isAdminOrModerator && (
        <Icon
          iconId="fa-trash-o"
          margin="0 0 0 10px"
          size="20px"
          onClick={() => onCommentRemove(id)}
        />
      )}
    </div>
  )
}

export const Comment = styled(CommentContainer)`
  display: flex;

  margin-top: 10px;

  & .comment-block {
    border: 1px solid black;
    width: 550px;
    padding: 5px 10px;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author {
    display: flex;
  }

  & .published-at {
    display: flex;
  }
`
