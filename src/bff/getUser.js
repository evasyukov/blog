import { getUsers } from "bff"

export async function getUser(loginProps) {
  const users = await getUsers()
  return users.find(({ login }) => login === loginProps)
}
