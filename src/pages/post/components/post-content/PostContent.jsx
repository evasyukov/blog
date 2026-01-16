import styled from "styled-components"
import { H2 } from "../../../../components"
import { SpecialPanel } from "../special-panel/SpecialPanel"

function PostContentContainer({
  className,
  post: { title, imageUrl, content, publishedAt },
}) {
  return (
    <div className={className}>
      <img src={imageUrl || null} alt={"fds"} />

      <H2>{title}</H2>

      <SpecialPanel
        iconButton="fa-pencil-square-o"
        publishedAt={publishedAt}
        margin="-20px 0 10px"
      />

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

  & .post-text {
    font-size: 18px;
  }
`
