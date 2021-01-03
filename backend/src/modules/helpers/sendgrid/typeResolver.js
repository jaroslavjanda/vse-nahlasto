import { TYPE } from './send';

export function resolveSubject(type) {
  switch (type) {
    case TYPE.REGISTRATION:
      return 'Nahlaš.to - Potvrzení registrace';
    case TYPE.CHANGE_PASSWORD:
      return 'Nahlaš.to - Potvrzení změna hesla';
    case TYPE.SEND_LINK_TO_CHANGE_PASSWORD:
      return 'Nahlaš.to - Zde je odkaz na změnu vašeho hesla';
    case TYPE.ADD_COMMUNITY_CONFIRMATION:
      return 'Nahlaš.to - Potvrzení přidání komunity';
  }
}

export function resolveText(type, link) {
  switch (type) {
    case TYPE.REGISTRATION:
      return 'Úspěšně jste se registrovali v Nahlaš.to Nyní můžete přidávat komunity';
    case TYPE.CHANGE_PASSWORD:
      return 'Úspěšně jste změnili heslo';
    case TYPE.SEND_LINK_TO_CHANGE_PASSWORD:
      return (
        'Obdrželi jsme žádost o změnu hesla. ' +
        'Pokud jste jej nezadali, prosím ignorujte tuto zprávu.' +
        ' Jinak je zde váš odkaz: ' +
        link + ''
      );
    case TYPE.ADD_COMMUNITY_CONFIRMATION:
      return 'Komunita v Nahlas.to byla vytvořená';
  }
}
