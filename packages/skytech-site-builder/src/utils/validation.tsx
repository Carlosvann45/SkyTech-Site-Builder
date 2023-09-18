import { ERROR, REGEX } from "./constants";

export default class Validation {
    public static verifyTitle(data: { title: string}) {
        let valid: { valid: boolean, messages: string[] } = { valid: true, messages: [] };

        if (!REGEX.TITLE.test(data.title)) {
            valid.valid = false;
            valid.messages.push(ERROR.TITLE);
        } 
        
        if (data.title.startsWith(' ') || data.title.endsWith(' ')) {
            valid.valid = false;
            valid.messages.push(ERROR.TITLE_NO_TRAILING);
        }

        return valid;

    }
}