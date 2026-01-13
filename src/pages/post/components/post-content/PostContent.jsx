import styled from "styled-components"
import { H2, Icon } from "../../../../components"

function PostContentContainer({
  className,
  post: { title, imageUrl, content, publishedAt },
}) {
  return (
    <div className={className}>
      <img src={imageUrl || null} alt={"fds"} />
      <H2>{title}</H2>
      <div className="special-panel">
        <div className="published-at">
          <Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="18px" />
          {publishedAt}
        </div>
        <div className="buttons">
          <Icon iconId="fa-pencil-square-o" margin="0 10px 0 0" size="20px" />
          <Icon iconId="fa-trash-o" size="20px" />
        </div>
      </div>
      <div className="post-text">{content}</div>
    </div>
  )
}

export const PostContent = styled(PostContentContainer)`
  & img {
    width: 375px;
    height: 200px;

    float: left;

    margin: 0 20px 20px 0;
  }

  & .special-panel {
    display: flex;
    justify-content: space-between;

    margin: -20px 0 20px;
  }

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    align-items: center;
  }

  & .post-text {
    font-size: 18px;
  }
`
