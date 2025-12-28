import { generateDate } from "./generateDate.js"

export function addUser(login, password) {
  fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Contet-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      registed_at: generateDate(),
      role_id: 2,
    }),
  })
}
