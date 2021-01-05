/**
 * Returns all users.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const users = async (_, __, { dbConnection }) => {
  const users = await dbConnection.query('SELECT * FROM user');

  return users;
};

/**
 * Returns one user.
 * @param _
 * @param user_id
 * @returns {Promise<*>}
 */
export const user = async (_, { user_id }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE user_id = ?`, [user_id])
  )[0];

  //if user do not exist
  if (!user) {
    return null;
  }
  return user;
};

/**
 * Returns one changePasswordRequest, if exists.
 * @param _
 * @param user_email
 * @param code
 * @param dbConnection
 * @returns {Promise<null|*>}
 */
export const changePasswordRequest = async (
  _,
  { user_email, code },
  { dbConnection },
) => {
  const request = (
    await dbConnection.query(
      `SELECT * FROM change_password_request
    WHERE user_email = ? 
    AND code = ?`,
      [user_email, code],
    )
  )[0];

  //if user do not exist
  if (!request) {
    return null;
  }
  return request;
};

/**
 * Checks if there is an 'join private community' request with these credentials
 * and returns it when there is one.
 * @param _
 * @param communityId
 * @param applicant_email
 * @param code
 * @param dbConnection
 * @returns {Promise<null|*>}
 */
export const validateJoinCommunityRequestCode = async (
  _,
  { communityId, applicant_email, code },
  { dbConnection },
) => {
  const request = (
    await dbConnection.query(
      `SELECT * FROM join_private_community_request 
      WHERE communityId = ? 
      AND user_email = ? 
      AND code = ?`,
      [communityId, applicant_email, code],
    )
  )[0];

  //if user do not exist
  if (!request) {
    return null;
  }
  return request;
};
