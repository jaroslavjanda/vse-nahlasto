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
    REGISTRATION: 'd-05ecc56913034bc0bf829bfba09f72a9',
    CHANGE_PASSWORD: 'd-cb10662bffea4380a20ece2d0ffdfc6f',
    SEND_LINK_TO_CHANGE_PASSWORD: 'd-b8097738e729419b9fd445e1ac6f8daa',
    ADD_COMMUNITY_CONFIRMATION: 'd-9db61fbe2ea14a01ae5f58e1ab930e6b'
  };

  console.log("receiverName: ", emailData.receiverName, "communityName", emailData.communityName, "link", emailData.link)

  const msg = {
    to: emailData.receiver.toString(),
    from: "tym7nahlasto@gmail.com",
    templateId: templates[emailData.type],
    dynamic_template_data: {
      community_name: emailData.communityName,
      receiver_name: emailData.receiverName,
      link: emailData.link,
    }
  }



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
      console.log('Submit failed', "receiver: ", emailData.receiverName);
      console.error(error.toString());
    });
}
