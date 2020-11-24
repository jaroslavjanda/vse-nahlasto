import { TYPE } from './send';

export function resolveSubject(type) {
  switch (type) {
    case TYPE.REGISTRATION:
      return 'Registration confirmation';
    case TYPE.CHANGE_PASSWORD:
      return 'Change password confirmation';
    case TYPE.SEND_LINK_TO_CHANGE_PASSWORD:
      return 'Here is the link to change your password';
    case TYPE.ADD_COMMUNITY_CONFIRMATION:
      return 'Add community confirmation';
  }
}

export function resolveText(type, link) {
  switch (type) {
    case TYPE.REGISTRATION:
      return 'You have successfully registered to Nahlas.to ';
    case TYPE.CHANGE_PASSWORD:
      return 'You have successfully changed your password';
    case TYPE.SEND_LINK_TO_CHANGE_PASSWORD:
      return (
        'We received a request to change your password. ' +
        'In case you did not submit it, please ignore this message.' +
        ' Otherwise, here is your link: ' +
        link
      );
    case TYPE.ADD_COMMUNITY_CONFIRMATION:
      return 'Community at Nahlas.to created';
  }
}
