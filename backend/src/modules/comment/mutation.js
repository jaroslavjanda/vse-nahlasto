/**
 * Add community.
 * @param _
 * @param content
 * @param user_id
 * @param ticket_id
 * @returns {Promise<*>}
 */
export const addComment = async (_, { content, user_id, ticket_id }, { dbConnection }) => {

    // adds comment to DB
    const addCommentDbResponse = await dbConnection.query(
      `INSERT INTO comment (content, user_id, ticket_id)
      VALUES (?, ?, ?);`,
      [content, user_id, ticket_id],
    );
  
    // if comment inserted successfully
    if (addCommentDbResponse.insertId) {
  
      const commentId  = addCommentDbResponse.insertId;
  
      // fetches added community from DB
      const comment = (
        await dbConnection.query(`SELECT * FROM comment WHERE comment_id = ?`, [
            commentId,
        ])
      )[0];

      return comment;
    }
    return null;
  };