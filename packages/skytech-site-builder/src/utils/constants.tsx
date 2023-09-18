export class REGEX {
    static TITLE = /^\w+[^\t\r\n!`~|\\@#$%^&*()<>/?"':;{}[\]+=_]+$/;
}

export class ERROR {
    static TITLE = 'Title must be a valid name with none of the following special characters: !`~|\\@#$%^&*()<>/?"\':;{}[]+=_';
    static TITLE_NO_TRAILING = 'Title must not have any trailing spaces.';
    static TITLE_EXISTS = 'Title already exists.';
}