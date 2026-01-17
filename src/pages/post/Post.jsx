import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useMatch } from "react-router-dom"
import styled from "styled-components"

import { useServerRequest } from "../../hooks"
import { Comments, PostContent, PostForm } from "./components"
import { loadPostAsync } from "../../actions"
import { selectPost } from "../../selectors"

function PostContainer({ className }) {
  const dispatch = useDispatch()
  const params = useParams()
  const isEditing = useMatch("post/:id/edit")

  const requestServer = useServerRequest()
  const post = useSelector(selectPost)

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id))
  }, [requestServer, dispatch, params.id])

  return (
    <div className={className}>
      {isEditing ? (
        <PostForm post={post} id={params.id} />
      ) : (
        <>
          <PostContent post={post} id={params.id} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  )
}

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
`
