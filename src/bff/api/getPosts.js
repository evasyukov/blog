import { transformPost } from "../transformers"

export function getPosts(searchPhrase, page, limit) {
  return fetch(
    `http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
  )
    .then((loadedPosts) =>
      Promise.all([loadedPosts.json(), loadedPosts.headers.get("Link")]),
    )
    .then(([loadedPosts, links]) => ({
      posts: loadedPosts && loadedPosts.map(transformPost),
      links,
    }))
}
