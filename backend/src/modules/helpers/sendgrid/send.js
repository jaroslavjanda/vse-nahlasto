import { resolveSubject, resolveText } from './typeResolver';

export const TYPE = {
  REGISTRATION: 'REGISTRATION',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SEND_LINK_TO_CHANGE_PASSWORD: 'SEND_LINK_TO_CHANGE_PASSWORD',
  ADD_COMMUNITY_CONFIRMATION: 'ADD_COMMUNITY_CONFIRMATION',
};

export function send(emailData) {

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let templates;
  templates = {
    passwordreset_confirm: 'd-cb10662bffea4380a20ece2d0ffdfc6f',
    passwordreset_request: 'd-b8097738e729419b9fd445e1ac6f8daa',
  };

  const msg = {
    //extract the email details
    to: emailData.receiver,
    from: emailData.sender,
    templateId: templates[emailData.templateName],
    //extract the custom fields
    dynamic_template_data: {
      link: emailData.link,
    },
  };

  //send the email
  sgMail
    .send(msg)
    .then(() => {
      console.log(`operation was successful`);
    })
    .catch((error) => {
      //Log friendly error
      // TODO this alert causes crash
      // alert(error);
      console.log('Submit failed');
      console.error(error.toString());
    });
}
