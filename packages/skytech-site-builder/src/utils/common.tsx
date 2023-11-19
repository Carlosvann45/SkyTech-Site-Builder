import { toast } from "react-toastify";

/**
 * @name Common
 * @description a class for common function to use through out the frontend
 */
export default class Common {
  /**
   * @name toast
   * @description handles displaying a toast to a user with provided fr more about overrides
   * please see: https://fkhadra.github.io/react-toastify/introduction/
   * @param type message type (success, warning, error, info(default))
   * @param message message to display to user
   * @param overrides any overrides for message
   * @
   */
  public static toast(type: string, message: string, overrides: any = {}) {
    switch (type) {
      case "success":
        toast.success(message, overrides);
        break;
      case "warning":
        toast.warning(message, overrides);
        break;
      case "error":
        toast.error(message, overrides);
        break;
      case "info":
      default:
        toast.info(message, overrides);
        break;
    }
  }

  /**
   * @name formatTitle
   * @description handles formatting title with _ or spaces
   * if withSpaces is set to true it wil replace _ with spaces
   * else if withSpaces is false it will replace spaces with _
   * @param title title t format
   * @param withSpaces boolean on how to format (see description)
   * @returns formatted title
   */
  public static formatTitle(title: string, withSpaces: boolean) {
    if (!withSpaces) {
      if (title.split(" ").length > 1) {
        return title.split(" ").join("_");
      }

      return title.trim();
    } else {
      if (title.split("_").length > 1) {
        return title.split("_").join(" ");
      }

      return title.trim();
    }
  }
}
