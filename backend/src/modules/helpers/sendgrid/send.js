import { resolveSubject, resolveText } from './typeResolver';

export const TYPE = {
  REGISTRATION: 'REGISTRATION',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SEND_LINK_TO_CHANGE_PASSWORD: 'SEND_LINK_TO_CHANGE_PASSWORD',
  ADD_COMMUNITY_CONFIRMATION: 'ADD_COMMUNITY_CONFIRMATION',
};

export function send(email, type, link = '') {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'tym7nahlasto@gmail.com', // Nemenit!
    subject: resolveSubject(type),
    text: resolveText(type, link),
    // html: '<strong>You have successfully registered to Nahlas.to</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(`${type} operation was successful`);
    })
    .catch((error) => {
      //Log friendly error
      // FIXME this alert causes crash
      // alert(error);
      console.log('Submit failed');
      console.error(error.toString());
    });
}
