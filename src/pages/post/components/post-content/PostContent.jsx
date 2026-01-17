import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { H2, Icon } from "../../../../components"
import { SpecialPanel } from "../special-panel/SpecialPanel"

function PostContentContainer({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) {
  const navigate = useNavigate()

  return (
    <div className={className}>
      <img src={imageUrl || null} alt={"fds"} />

      <H2>{title}</H2>

      <SpecialPanel
        publishedAt={publishedAt}
        margin="-20px 0 10px"
        iconButton={
          <Icon
            iconId="fa-pencil-square-o"
            margin="0 10px 0 0"
            size="20px"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
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
    white-space: pre-line;  
  }
`
