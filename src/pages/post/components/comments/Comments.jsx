import { useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import { Icon } from "../../../../components"
import { Comment } from "./components"
import { selectUserId } from "../../../../selectors"
import { useServerRequest } from "../../../../hooks"
import { addCommentAsync } from "../../../../actions"

function CommentsContainer({ className, comments, postId }) {
  const [newComment, setNewComment] = useState("")
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const requestServer = useServerRequest()

  function onNewCommentAdd(postId, userId, content) {
    dispatch(addCommentAsync(requestServer, postId, userId, content))
  }

  return (
    <div className={className}>
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

      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
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
  display: flex;
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
    width: 100%;
    resize: none;
  }
`
