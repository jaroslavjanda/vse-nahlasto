export const tickets = async (_, { communityId }, { dbConnection }) => {
  const tickets = await dbConnection.query('SELECT * FROM ticket WHERE community_id = ?',[
    communityId
] );

  return tickets;
};

export const ticket = async (_, { ticketId,communityId }, { dbConnection }) => {
  const ticket = (
    await dbConnection.query(`SELECT * FROM ticket WHERE community_id = ? AND ticket_id = ?`, [
      ticketId,communityId
    ])
  )[0];
  if (!ticket) {
    return null;
  }
  return ticket;
};
