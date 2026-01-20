import { transformPost } from "../transformers"

export async function getPost(postId) {
  return fetch(`http://localhost:3005/posts/${postId}`)
    .then((response) => {
      if (response.ok) {
        return response
      }

      const error =
        response.status === 404
          ? "Страница не сущетсвует"
          : "Что-то пошло не так. Попробуйте позднее"

      return Promise.reject(error)
    })
    .then((loadedPost) => loadedPost.json())
    .then((loadedPost) => loadedPost && transformPost(loadedPost))
}
