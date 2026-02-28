export async function request(url, method = "GET", data) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  })

  return res.json()
}
