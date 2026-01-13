import styled from "styled-components"

import { Icon } from "../../../../../../components"

function CommentContainer({ className, author, content, publishedAt }) {
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

      <Icon iconId="fa-trash-o" margin="0 0 0 10px" size="20px" />
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
