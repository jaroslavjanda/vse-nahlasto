export const tickets = async (_, __, { dbConnection }) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id`,
  );

  return tickets;
};

export const ticket = async (_, { ticketId }, { dbConnection }) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE ticket.ticket_id = ?
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id
    `,
    [ticketId],
  );

  return tickets;
};

export const communityTickets = async (
  _,
  { communityId },
  { dbConnection },
) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE community_id = ? 
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id
    `,
    [communityId],
  );

  return tickets;
};

export const communityTicket = async (
  _,
  { ticketId, communityId },
  { dbConnection },
) => {
  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, image, ticket.content, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE community_id = ? AND ticket.ticket_id = ?
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.user_id, community_id
    `,
      [ticketId, communityId],
    )
  )[0];
  if (!ticket) {
    return null;
  }
  return ticket;
};
