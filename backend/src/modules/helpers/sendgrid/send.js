import {resolveSubject, resolveText} from "./typeResolver"

export const TYPE = {
  REGISTRATION: "REGISTRATION",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  ADD_COMMUNITY_CONFIRMATION: "ADD_COMMUNITY_CONFIRMATION"
}

export function send(email, type) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
    const msg = {
      to: email,
      from: 'tym7nahlasto@gmail.com', // Nemenit!
      subject: resolveSubject(type),
      text: resolveText(type),
      html: '<strong>You have succesfully registered to Nahlas.to</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log(`${type} operation was succesfull`);
      })
      .catch((error) => {
        //Log friendly error
        alert(error)
        console.log("Submit failed")
        console.error(error.toString());
      })
    }
    