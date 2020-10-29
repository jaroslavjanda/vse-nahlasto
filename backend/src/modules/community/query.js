export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(`SELECT * FROM community`);

  return communities;
};

export const community = async (_, { name }, { dbConnection }) => {
  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE name = ?`, [
      name,
    ])
  ) [0]
  if (!name) {
    return null
  }
  return community
}
