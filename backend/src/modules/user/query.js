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
export const changePasswordRequest = async (_, { user_email, code }, { dbConnection }) => {
  const request = (
    await dbConnection.query(`SELECT * FROM change_password_request
    WHERE user_email = ? 
    AND code = ?`,
      [user_email, code])
  )[0];

  //if user do not exist
  if (!request) {
    return null;
  }
  return request;
};
