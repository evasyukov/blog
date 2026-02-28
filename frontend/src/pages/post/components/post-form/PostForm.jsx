import { useLayoutEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { Input, Icon } from "../../../../components"
import { SpecialPanel } from "../special-panel/SpecialPanel"
import { sanitizeContent } from "./utils/sanitize-content/sanitizeContent"
import { savePostAsync } from "../../../../actions"
import { PROP_TYPE } from "../../../../constants"

function PostFormContainer({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
  const [titleValue, setTitleValue] = useState(title)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageUrlValue(imageUrl)
    setTitleValue(title)
  }, [imageUrl, title])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSave() {
    const newContent = sanitizeContent(contentRef.current.innerHTML)

    dispatch(
      savePostAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      }),
    ).then(({ id }) => navigate(`/post/${id}`))
  }

  function onImageChange({ target }) {
    setImageUrlValue(target.value)
  }

  function onTitleChange({ target }) {
    setTitleValue(target.value)
  }

  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        placeholder="Изображение..."
        onChange={onImageChange}
      />
      <Input
        value={titleValue}
        placeholder="Заголовок..."
        onChange={onTitleChange}
      />

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
PostForm.propTypes = {
  post: PROP_TYPE.POST.isRequireds,
}
