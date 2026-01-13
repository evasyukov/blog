import { useState } from "react"
import styled from "styled-components"

import { Icon } from "../../../../components"
import { Comment } from "./components"

function CommentsContainer({ className, comments }) {
  const [newComment, setNewComment] = useState("")

  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
          value={newComment}
          placeholder="Комментарий"
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <Icon iconId="fa-send-o" margin="0 0 0 10px" size="20px" />
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
