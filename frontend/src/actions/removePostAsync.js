import { request } from "../utils/request"

export function removePostAsync(id) {
  return function () {
    return request(`/api/posts/${id}`, "DELETE")
  }
}
