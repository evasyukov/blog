import { transformPost } from "../transformers"

export async function getPost(postId) {
  return fetch(`http://localhost:3005/posts/${postId}`)
    .then((loadedPost) => loadedPost.json())
    .then((loadedPost) => loadedPost && transformPost(loadedPost))
}
