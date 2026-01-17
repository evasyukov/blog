export function removePostAsync(requestServer, id) {
  return function () {
    return requestServer("removePost", id)
  }
}
