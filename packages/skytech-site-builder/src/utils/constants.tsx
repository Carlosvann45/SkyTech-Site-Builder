/**
 * @name REGEX
 * @description constant regex string to use for validating strings
 */
export class REGEX {
  static TITLE = /^\w+[^\t\r\n!`~|\\@#$%^&*()<>/?"':;{}[\]+=_]+$/;
  static NAME = /^\w+[^\t\r\n!`~|\\@#$%^&*()<>/?"':;{}[\]+=]+$/;
  static NUMBER = /^\d+$/;
}

/**
 * @name ERROR
 * @description constant strings to use for error messages
 */
export class ERROR {
  static TITLE =
    "Title must have none of the following special characters: !`~|\\@#$%^&*()<>/?\"':;{}[]+=_";
  static TITLE_LENGTH = "Title must be atleast 3 characters long.";
  static TITLE_NO_TRAILING = "Title must not have any trailing spaces.";
  static NAME =
    "Name must have none of the following special characters: !`~|\\@#$%^&*()<>/?\"':;{}[]+=";
  static NAME_LENGTH = "Name must be atleast 3 characters long.";
  static NAME_NO_SPACES = "Name must not have any spaces.";
  static TITLE_EXISTS = "Title already exists.";
  static NAME_EXISTS = "Name already exists.";
  static COMPONENT_UPDATE_ERROR =
    "There was an error updating components for page.";
}
