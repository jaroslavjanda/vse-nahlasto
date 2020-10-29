export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(`SELECT * FROM community`);

  return communities;
};
