export const comments = async (_, __, { dbConnection }) => {
  const comments = await dbConnection.query(
    `SELECT comment_id, date, content, user_id, ticket_id
    FROM \`comment\``
    );

  return comments;
};

export const comment = async (_, { commentId }, { dbConnection }) => {
  const comment = (
    await dbConnection.query(
      `SELECT comment_id, date, content, user_id, ticket_id
      FROM \`comment\`
      WHERE comment_id = ?`, 
      [
        commentId,
      ]
    )
  ) 
  return community
}

export const ticketComments = async (_, { ticketId }, { dbConnection }) => {
  const comment = (
    await dbConnection.query(
      `SELECT comment_id, date, content, user_id, ticket_id
      FROM \`comment\`
      WHERE ticket_id = ?`, 
      [
      communityId,
      ]
    )
  ) 
  return community
}
