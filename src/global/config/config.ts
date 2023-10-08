import { Session } from "next-auth";

export const isNull = (string: Session |string | null | undefined) => {
    if (string != null && string != 'null' && string != undefined && string != 'undefined' && string != '') {
        return false
    }
    return true;
}