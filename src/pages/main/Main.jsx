import { useEffect, useState } from "react"
import styled from "styled-components"

import { useServerRequest } from "../../hooks"
import { PostCart, Pagination } from "./components"
import { PAGINATION_LIMIT } from "../../constants"
import { getLastPageFromLinks } from "./utils/getLastPageFromLinks"

function MainContainer({ className }) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(2)

  const requestServer = useServerRequest()

  useEffect(() => {
    requestServer("fetchPosts", page, PAGINATION_LIMIT).then(
      ({ response: { posts, links } }) => {
        setPosts(posts)
        console.log(getLastPageFromLinks(links))

        setLastPage(getLastPageFromLinks(links))
      },
    )
  }, [requestServer, page])

  return (
    <div className={className}>
      <div className="post-search"></div>

      <div className="post-list">
        {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
          <PostCart
            key={id}
            id={id}
            title={title}
            imageUrl={imageUrl}
            publishedAt={publishedAt}
            commentsCount={commentsCount}
          />
        ))}
      </div>

      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  )
}

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-wrap: wrap;

    padding: 20px;
  }
`
