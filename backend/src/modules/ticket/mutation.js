export const addTicket = async (
  _,
  { ownerId, communityId, title, content },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    // TODO we do not have images yet
    // `INSERT INTO ticket (user_id, title, image, community_id, content)
    // VALUES (?, ?, ?, ?, ?);`,
    `INSERT INTO ticket (user_id, community_id, title, content)
    VALUES (?, ?, ?, ?);`,
    [ownerId, communityId, title, content],
  );

  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id, 
      COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
      FROM ticket 
      LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
      LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
      WHERE ticket.ticket_id = ?
      GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id`,
      [dbResponse.insertId],
    )
  )[0];

  return ticket;
};

export const addLike= async (
  _,
  { ownerId, ticketId },
  { dbConnection },
) => {
  const dbResponseCheck = await dbConnection.query(
    `SELECT * FROM \`like\` WHERE user_id=? AND ticket_id=?;`,
    [ownerId, ticketId,],
  );

  if (dbResponseCheck[0]){
    const dbResponseDelete = await dbConnection.query(
      `DELETE FROM \`like\` WHERE user_id=? AND ticket_id=?;`,
      [ownerId, ticketId,],
    );
  }
  else{
    const dbResponseInsert = await dbConnection.query(
      `INSERT INTO \`like\` (user_id, ticket_id)
      VALUES (?, ?);`,
      [ownerId, ticketId,],
    );
  }

  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id, 
      COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
      FROM ticket 
      LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
      LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
      WHERE ticket.ticket_id = ?
      GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id`,
      [ticketId],
    )
  )[0];

  return ticket;
};
