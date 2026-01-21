import { useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import { Icon } from "../../../../components"
import { Comment } from "./components"
import { selectUserId, selectUserRole } from "../../../../selectors"
import { useServerRequest } from "../../../../hooks"
import { addCommentAsync } from "../../../../actions"
import { ROLE } from "../../../../constants"

function CommentsContainer({ className, comments, postId }) {
  const [newComment, setNewComment] = useState("")
  const dispatch = useDispatch()
  const requestServer = useServerRequest()

  const userId = useSelector(selectUserId)
  const userRole = useSelector(selectUserRole)

  function onNewCommentAdd(postId, userId, content) {
    dispatch(addCommentAsync(requestServer, userId, postId, content))
    setNewComment("")
  }

  const isGuest = userRole === ROLE.GUEST

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий"
            onChange={({ target }) => setNewComment(target.value)}
          ></textarea>
          <Icon
            iconId="fa-send-o"
            margin="0 0 0 10px"
            size="20px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          />
        </div>
      )}

      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            postId={postId}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  )
}

export const Comments = styled(CommentsContainer)`
  margin: 0 auto;

  width: 580px;

  & .new-comment {
    display: flex;

    width: 100%;
    height: 120px;

    margin: 20px 0 0;

    font-size: 18px;
  }

  & textarea {
    width: 550px;
    resize: none;
  }
`
