import { useEffect, useState, useMemo } from "react"
import styled from "styled-components"

import { useServerRequest } from "../../hooks"
import { PostCart, Pagination, Search } from "./components"
import { PAGINATION_LIMIT } from "../../constants"
import { getLastPageFromLinks, debounce } from "./utils"

function MainContainer({ className }) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [shouldSearch, setShouldSearch] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState("")

  const requestServer = useServerRequest()

  useEffect(() => {
    requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
      ({ response: { posts, links } }) => {
        setPosts(posts)
        setLastPage(getLastPageFromLinks(links))
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestServer, page, shouldSearch])

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

  function onSearch({ target }) {
    setSearchPhrase(target.value)

    startDelayedSearch(!shouldSearch)
  }

  return (
    <div className={className}>
      <div className="main-content">
        <Search onChange={onSearch} searchPhrase={searchPhrase} />

        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map(
              ({ id, title, imageUrl, publishedAt, commentsCount }) => (
                <PostCart
                  key={id}
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  publishedAt={publishedAt}
                  commentsCount={commentsCount}
                />
              ),
            )}
          </div>
        ) : (
          <div className="post-no-found">Статьи не найдены</div>
        )}
      </div>

      {lastPage > 1 && posts.length > 0 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  )
}

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-wrap: wrap;

    padding: 20px 20px 80px;
  }

  & .post-no-found {
    margin-top: 40px;

    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
`
