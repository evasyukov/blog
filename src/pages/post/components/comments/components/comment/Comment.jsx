import styled from "styled-components"

import { Icon } from "../../../../../../components"

function CommentContainer({ className, id, author, content, publishedAt }) {
  return (
    <div className={className}>
      <div className="information-panel">
        <div className="author">
          <Icon iconId="fa-user-cirle-o" margin="0 0 0 10px" size="20px" />

          {author}
        </div>
        <div className="published-at">
          <Icon iconId="fa-calendar-o" margin="0 0 0 10px" size="20px" />

          {publishedAt}
        </div>
      </div>
      <div className="comment-text">{content}</div>
    </div>
  )
}

export const Comment = styled(CommentContainer)`
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
