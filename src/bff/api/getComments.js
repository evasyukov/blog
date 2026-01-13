import { transformComment } from "../transformers"

export function getComments(postId) {
  return fetch(`http://localhost:3005/comments?post_id=${postId}`)
    .then((loadedComments) => loadedComments.json())
    .then((loadedComments) => loadedComments.map(transformComment))
}
