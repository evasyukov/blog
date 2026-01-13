export function transformSession(dbSession) {
  return {
    id: dbSession.id,
    hash: dbSession.hash,
    user: dbSession.user,
  }
}
