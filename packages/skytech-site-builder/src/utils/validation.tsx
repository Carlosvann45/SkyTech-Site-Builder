import { ERROR, REGEX } from "./constants";

/**
 * @name Validation
 * @description hadnles all validation for application
 */
export default class Validation {
  /**
   * @name verifyForm
   * @description handles validating form objects that include title and name
   * @param data data to validate
   *  {
   *      title: title to validate,
   *      name: name to validate
   * }
   * @returns error object
   * {
   *  valid: whether data is valid,
   *  messages: message array of errors in data,
   *  errors: {
   *      titleError: whether title had the error,
   *      nameError: whether name had the error
   *  }
   * }
   */
  public static verifyForm(data: { title: string; name: string }) {
    const validTitle = Validation.verifyTitle(data);
    const validName = Validation.verifyName(data.name);

    return {
      valid: validTitle.valid && validName.valid,
      messages: [...validTitle.messages, ...validName.messages],
      errors: {
        titleError: !validTitle.valid,
        nameError: !validName.valid,
      },
    };
  }

  /**
   * @name verifyTitle
   * @description handles validating data objects that include title
   * @param data data to validate
   *  {
   *      title: title to validate
   * }
   * @returns error object
   * {
   *  valid: whether data is valid,
   *  messages: message array of errors in data
   * }
   */
  public static verifyTitle(data: { title: string }) {
    const valid: { valid: boolean; messages: string[] } = {
      valid: true,
      messages: [],
    };

    if (data.title.length <= 2) {
      valid.valid = false;
      valid.messages.push(ERROR.TITLE_LENGTH);
    } else if (!REGEX.TITLE.test(data.title)) {
      valid.valid = false;
      valid.messages.push(ERROR.TITLE);
    } else if (data.title.startsWith(" ") || data.title.endsWith(" ")) {
      valid.valid = false;
      valid.messages.push(ERROR.TITLE_NO_TRAILING);
    }

    return valid;
  }

  /**
   * @name verifyName
   * @description handles validating data objects that include name
   * @param data data to validate
   *  {
   *      name: name to validate
   * }
   * @returns error object
   * {
   *  valid: whether data is valid,
   *  messages: message array of errors in data
   * }
   */
  public static verifyName(data: string) {
    const valid: { valid: boolean; messages: string[] } = {
      valid: true,
      messages: [],
    };

    if (data.length > 0) {
      if (data.length <= 2) {
        valid.valid = false;
        valid.messages.push(ERROR.NAME_LENGTH);
      } else if (!REGEX.NAME.test(data)) {
        valid.valid = false;
        valid.messages.push(ERROR.NAME);
      } else if (
        data.startsWith(" ") ||
        data.endsWith(" ") ||
        data.split(" ").length > 1
      ) {
        valid.valid = false;
        valid.messages.push(ERROR.NAME_NO_SPACES);
      }
    }

    return valid;
  }
}
