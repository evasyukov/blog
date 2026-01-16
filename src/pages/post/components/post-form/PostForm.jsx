import styled from "styled-components"
import { Input } from "../../../../components"

import { SpecialPanel } from "../special-panel/SpecialPanel"

function PostFormContainer({
  className,
  post: { title, imageUrl, content, publishedAt },
}) {
  return (
    <div className={className}>
      <Input defaultValue={imageUrl} />
      <Input defaultValue={title} />

      <SpecialPanel
        iconButton="fa-floppy-o"
        publishedAt={publishedAt}
        margin="20px 0"
      />

      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  )
}

export const PostForm = styled(PostFormContainer)`
  & img {
    width: 375px;
    height: 200px;

    float: left;

    margin: 0 20px 20px 0;
  }

  & .post-text {
    border: 1px solid #000000;
    border-radius: 8px;

    padding: 10px;

    font-size: 18px;
    white-space: pre-line;
  }
`
