export const memberships = async (_, __, { dbConnection }) => {
  const memberships = (
    await dbConnection.query(
      `SELECT * FROM membership`
    )
  )
  if (!memberships) {
    return null
  }
  return memberships
}

export const membership = async (_, { communityId }, { dbConnection }) => {
  const membership = (
    await dbConnection.query(
      `SELECT * FROM membership as m
      WHERE m.community_id = ?`, 
      [
      communityId,
      ]
    )
  )
  if (!membership) {
    return null
  }
  return membership
}
