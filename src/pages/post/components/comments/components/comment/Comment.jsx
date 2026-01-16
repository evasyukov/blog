import styled from "styled-components"
import { useDispatch } from "react-redux"

import { Icon } from "../../../../../../components"
import { useServerRequest } from "../../../../../../hooks"
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from "../../../../../../actions"

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

  function onCommentRemove(id) {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, id, postId))
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    )
  }

  return (
    <div className={className}>
      <div className="comment-block">
        <div className="information-panel">
          <div className="author">
            <Icon iconId="fa-user-circle-o" margin="0 10px 0 0" size="20px" />

            {author}
          </div>
          <div className="published-at">
            <Icon iconId="fa-calendar-o" margin="0 0 0 10px" size="20px" />

            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>

      <Icon
        iconId="fa-trash-o"
        margin="0 0 0 10px"
        size="20px"
        onClick={() => onCommentRemove(id)}
      />
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
