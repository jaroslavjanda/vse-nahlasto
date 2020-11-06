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
