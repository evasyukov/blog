import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useMatch } from "react-router-dom"
import styled from "styled-components"

import { useServerRequest } from "../../hooks"
import { Comments, PostContent, PostForm } from "./components"
import { Error, PrivateContent } from "../../components"
import { loadPostAsync, RESET_POST_DATA } from "../../actions"
import { selectPost } from "../../selectors"
import { ROLE } from "../../constants"

function PostContainer({ className }) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const params = useParams()

  const isEditing = !!useMatch("post/:id/edit")
  const isCreating = !!useMatch("/post")

  const requestServer = useServerRequest()
  const post = useSelector(selectPost)

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA)
  }, [dispatch, isCreating])

  useEffect(() => {
    if (isCreating) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false)
      return
    }

    dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
      setError(postData.error)
      setIsLoading(false)
    })
  }, [requestServer, dispatch, params.id, isCreating])

  if (isLoading) {
    return <div>Загрузка... </div>
  }

  const SpecificPostPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={post} id={params.id} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <PostContent post={post} id={params.id} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    )

  return error ? <Error error={error} /> : SpecificPostPage
}

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
`
