/**
 * Returns all tickets.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const tickets = async (_, __, { dbConnection }) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id`,
  );

  return tickets;
};

/**
 * Returns ticket based on ticketId.
 * @param _
 * @param ticketId
 * @returns {Promise<*>}
 */
export const ticket = async (_, { ticketId }, { dbConnection }) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE ticket.ticket_id = ?
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
    `,
    [ticketId],
  );

  return tickets[0];
};

/**
 * Returns tickets from one community based on communityId.
 * @param _
 * @param communityId
 * @returns {Promise<*>}
 */
export const communityTickets = async (
  _,
  { communityId },
  { dbConnection },
) => {
  const tickets = await dbConnection.query(
    `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE community_id = ? 
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
    ORDER BY ticket.date desc
    `,
    [communityId],
  );

  return tickets;
};

/**
 * Returns ticket from one community based on communityId and ticketId.
 * @param _
 * @param ticketId
 * @param communityId
 * @returns {Promise<*>}
 */
export const communityTicket = async (
  _,
  { ticketId, communityId },
  { dbConnection },
) => {
  const ticket = (
    await dbConnection.query(
      `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id,  ticket.user_id, community_id, 
    COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
    FROM ticket 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
    WHERE community_id = ? AND ticket.ticket_id = ?
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
    `,
      [ticketId, communityId],
    )
  )[0];

  if (!ticket) {
    return null;
  }
  return ticket;
};

/**
 * Returns tickets from logged user.
 */
export const usersTickets = async (_, { userId }, { dbConnection }) => {
  
  return await dbConnection.query(`SELECT ticket.community_id, ticket.content, ticket.date, ticket.image, ticket.status_id, ticket.ticket_id, ticket.title, ticket.user_id, COUNT(like.ticket_id) likes_count 
  FROM ticket 
  LEFT JOIN membership ON ticket.community_id = membership.community_id 
  LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
  WHERE ticket.user_id = ?
  GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id`,
  [userId]);
};

/**
 * Returns tickets from all communities where user is an admin (based on userId).
 * @param _
 * @param userId
 * @returns {Promise<*>}
 */
export const ticketFromCommunitiesIAmAdminIn = async (
  _,
  { userId },
  { dbConnection },
) => {
  const ticketsFromCommunitiesIAmAdminIn = await dbConnection.query(
    `SELECT DISTINCT ticket_id FROM membership 
    JOIN ticket ON membership.community_id = ticket.community_id 
    WHERE membership.user_id = ? AND membership.role_id = 1 OR membership.role_id = 2`,
    [userId],
  );

  return ticketsFromCommunitiesIAmAdminIn;
};

/**
 * Returns tickets which are not solved and only from communities where I am an admin.
 */
export const ticketsToResolve = async (_, { userId }, { dbConnection }) => {
  const ticketsToResolve = await dbConnection.query(
    `SELECT ticket.community_id, ticket.content, ticket.date, ticket.image, ticket.status_id, ticket.ticket_id, ticket.title, ticket.user_id, COUNT(like.ticket_id) likes_count 
    FROM ticket 
    LEFT JOIN membership ON ticket.community_id = membership.community_id 
    LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
    WHERE membership.user_id = ? AND (membership.role_id = 1 OR membership.role_id = 2) AND status_id = 3 
    GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id`,
    [userId],
  );
  return ticketsToResolve;
};
