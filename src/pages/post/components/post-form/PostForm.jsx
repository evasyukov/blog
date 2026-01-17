import { useRef } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { Input, Icon } from "../../../../components"
import { SpecialPanel } from "../special-panel/SpecialPanel"
import { sanitizeContent } from "./utils/sanitize-content/sanitizeContent"
import { savePostAsync } from "../../../../actions"
import { useServerRequest } from "../../../../hooks"

function PostFormContainer({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) {
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const requestServer = useServerRequest()

  function onSave() {
    const newImageUrl = imageRef.current.value
    const newTitle = titleRef.current.value
    const newContent = sanitizeContent(contentRef.current.innerHTML)

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      }),
    ).then(() => navigate(`/post/${id}`))
  }

  return (
    <div className={className}>
      <Input
        defaultValue={imageUrl}
        placeholder="Изображение..."
        ref={imageRef}
      />
      <Input defaultValue={title} placeholder="Заголовок..." ref={titleRef} />

      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        iconButton={
          <Icon
            iconId="fa-floppy-o"
            margin="0 10px 0 0"
            size="20px"
            onClick={onSave}
          />
        }
      />

      <div
        ref={contentRef}
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
