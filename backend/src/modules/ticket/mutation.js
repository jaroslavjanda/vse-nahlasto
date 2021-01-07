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
import { singleUpload } from '../upload/mutation';
import { DirType } from '../../constants';
export const addTicket = async (
  _,
  { user_id, title, image, community_id, content, status_id, email },
  { dbConnection },
) => {
  var img = image=!null? image : null;

  const imgPath = await singleUpload({
    file: img,
    type: DirType.TICKET_UPLOAD_DIR,
  });

  const dbResponse = await dbConnection.query(
    `INSERT INTO ticket (user_id, title, image, community_id, content, status_id, anonym_email)
    VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [user_id, title, imgPath, community_id, content, status_id, email],
  );

  const ticket = (
    await dbConnection.query(
      `SELECT ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
      FROM ticket 
      WHERE ticket_id = ?
      ORDER BY ticket.date desc`,
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
      `SELECT ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
      FROM ticket 
      WHERE ticket_id = ?
      ORDER BY ticket.date desc`,
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

import { send, TYPE } from '../helpers/sendgrid/send';

export const setTicketResolved = async (_, { ticketId }, { dbConnection }) => {
  await dbConnection.query(
    `UPDATE ticket SET status_id = 1 WHERE ticket_id = ?`,
    [ticketId],
    console.log('UPDATE', ticketId),
  );

  const ticket = (
    await dbConnection.query(`SELECT * FROM ticket WHERE ticket_id = ?`, [
      ticketId,
    ])
  )[0];

  // fetches user info email from DB to be able to send him an email
  const checkInTicket = parseInt(ticket.user_id)===25086 ? true: false

  let email
  let userName

  if (checkInTicket){
    email = ticket.anonym_email;
    userName = "anonym"
  }
  else{
    email = (
      await dbConnection.query(`SELECT email FROM user WHERE user_id = ?`, [
        ticket.user_id,
      ])
    )[0].email;

    userName = (
      await dbConnection.query(`SELECT name FROM user WHERE user_id = ?`, [
        ticket.user_id,
      ])
    )[0].name;
  }
  
  const emailData = {
    type: TYPE.RESOLVE_TICKET,
    receiver: email,
    ticketTitle: ticket.title,
    receiverName: userName
  };
  
  send(emailData);

  return ticket;
};
