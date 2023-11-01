import { ERROR, REGEX } from "./constants";

export default class Validation {
    public static verifyTemplateForm(data: { title: string, name: string }) {
        const validTitle = Validation.verifyTitle(data);
        const validName = Validation.verifyName(data.name);

        return {
            valid: validTitle.valid && validName.valid,
            messages: [...validTitle.messages, ... validName.messages],
            errors: {
                titleError: !validTitle.valid,
                nameError: !validName.valid
            }
        }
    }

    public static verifyTitle(data: { title: string}) {
        let valid: { valid: boolean, messages: string[] } = { valid: true, messages: [] };
        
        if (data.title.length <= 2) {
            valid.valid = false;
            valid.messages.push(ERROR.TITLE_LENGTH);
        } else if (!REGEX.TITLE.test(data.title)) {
            valid.valid = false;
            valid.messages.push(ERROR.TITLE);
        } else if (data.title.startsWith(' ') || data.title.endsWith(' ')) {
            valid.valid = false;
            valid.messages.push(ERROR.TITLE_NO_TRAILING);
        }

        return valid;

    }

    public static verifyName(data: string) {
        let valid: { valid: boolean, messages: string[] } = { valid: true, messages: [] };

        if (data.length > 0) {
            if (data.length <= 2) {
                valid.valid = false;
                valid.messages.push(ERROR.NAME_LENGTH);
            } else if (!REGEX.NAME.test(data)) {
                valid.valid = false;
                valid.messages.push(ERROR.NAME);
            } else if (data.startsWith(' ') || data.endsWith(' ') || data.split(' ').length > 1) {
                valid.valid = false;
                valid.messages.push(ERROR.NAME_NO_SPACES);
            }
        }

        return valid;

    }
}