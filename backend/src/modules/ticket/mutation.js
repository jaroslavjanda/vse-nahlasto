export const addTicket = async (_, { ownerId, communityId, content }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO ticket (user_id, community_id, content)
    VALUES (?, ?, ?);`,
    [ownerId, communityId, content],
  );

  const ticket = (
    await dbConnection.query(`SELECT * FROM ticket WHERE id = ?`, [
      dbResponse.insertId,
    ])
  )[0];

  return ticket;
};
