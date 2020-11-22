/**
 * Returns all comments.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const comments = async (_, __, { dbConnection }) => {
  const comments = await dbConnection.query(
    `SELECT comment_id, date, content, user_id, ticket_id
    FROM \`comment\``,
  );

  return comments;
};

/**
 * Returns comment based on commentId.
 * @param _
 * @param commentId
 * @returns {Promise<*>}
 */
export const comment = async (_, { commentId }, { dbConnection }) => {
  const comment = await dbConnection.query(
    `SELECT comment_id, date, content, user_id, ticket_id
      FROM \`comment\`
      WHERE comment_id = ?`,
    [commentId],
  );
  return community;
};

/**
 * Returns all comments based on communityId.
 * @param _
 * @param communityId
 * @returns {Promise<*>}
 */
export const ticketComments = async (_, { communityId }, { dbConnection }) => {
  const comment = await dbConnection.query(
    `SELECT comment_id, date, content, user_id, ticket_id
      FROM \`comment\`
      WHERE ticket_id = ?`,
    [communityId],
  );
  return community;
};
