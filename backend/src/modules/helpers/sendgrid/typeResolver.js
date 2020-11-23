import { TYPE } from "./send"


export function resolveSubject(type) {
    switch(type) {
        case TYPE.REGISTRATION:
        return "Registration confirmation"
        case TYPE.CHANGE_PASSWORD:
        return "Change password confirmation"
        case TYPE.ADD_COMMUNITY_CONFIRMATION:
        return "Add community confirmation"
    }
}

export function resolveText(type) {
    switch(type) {
        case TYPE.REGISTRATION:
        return "You have succesfully registered to Nahlas.to "
        case TYPE.CHANGE_PASSWORD:
        return "You have successfully changed your password"
        case TYPE.ADD_COMMUNITY_CONFIRMATION:
        return "Community at Nahlas.to created"
    }
}
