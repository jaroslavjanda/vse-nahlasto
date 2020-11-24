/**
 * Adding ticket to the community
 * @param _
 * @param user_id
 * @param title
 * @param image
 * @param community_id
 * @param content
 * @param status_id
 * @returns {Promise<*>}
 */
export const addTicket = async (
  _,
  { user_id, title, image, community_id, content, status_id },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO ticket (user_id, title, image, community_id, content, status_id)
    VALUES (?, ?, ?, ?, ?, ?);`,
    [user_id, title, image, community_id, content, status_id],
  );

  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
      COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
      FROM ticket 
      LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
      LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
      WHERE ticket.ticket_id = ?
      GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id`,
      [dbResponse.insertId],
    )
  )[0];

  return ticket;
};

/**
 * Based on ticketId and ownerId adds or removes tiket like.
 * @param _
 * @param ownerId
 * @param ticketId
 * @returns {Promise<*>}
 */
export const addLike = async (_, { ownerId, ticketId }, { dbConnection }) => {
  //check if like exists
  const dbResponseCheck = await dbConnection.query(
    `SELECT * FROM \`like\` WHERE user_id=? AND ticket_id=?;`,
    [ownerId, ticketId],
  );

  if (dbResponseCheck[0]) {
    //remove like
    const dbResponseDelete = await dbConnection.query(
      `DELETE FROM \`like\` WHERE user_id=? AND ticket_id=?;`,
      [ownerId, ticketId],
    );
  } else {
    //add like
    const dbResponseInsert = await dbConnection.query(
      `INSERT INTO \`like\` (user_id, ticket_id)
      VALUES (?, ?);`,
      [ownerId, ticketId],
    );
  }

  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
      COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
      FROM ticket 
      LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
      LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
      WHERE ticket.ticket_id = ?
      GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id`,
      [ticketId],
    )
  )[0];

  return ticket;
};

/**
 * Based on ticketId, deletes ticket. But beforehand checks if user, who is trying to delete ticket, is owner of a community.
 * @param _
 * @param userId
 * @param communityId
 * @param ticketId
 * @returns {Promise<*>}
 */
export const deleteTicket = async (
  _,
  { userId, communityId, ticketId },
  { dbConnection },
) => {
  //select owner
  const dbResponseCheck = await dbConnection.query(
    `SELECT * FROM membership WHERE role_id = ? AND community_id = ?`,
    [1, communityId],
  );
  //check if owner of community is user who deletes
  if (dbResponseCheck[0].user_id == userId) {
    const dbResponseDelete = await dbConnection.query(
      `DELETE FROM \`ticket\` WHERE ticket_id=?;`,
      [ticketId],
    );
  }

  return {
    ticket_id: ticketId,
  };
};
