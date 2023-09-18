import { toast } from "react-toastify";

export default class Common {
    public static toast(type: string, message: string, overrides: any = {}) {
        switch (type) {
            case 'success':
                toast.success(message, overrides);
                break;
            case 'warning':
                toast.warning(message, overrides);
                break;
            case 'error':
                toast.error(message, overrides);
                break;
            case 'info':
            default:
                toast.info(message, overrides);
                break;
        }
    }

    public static formatTitle(title: string, withSpaces: boolean) {
        if (!withSpaces) {
            if (title.split(' ').length > 1) {
                return title.split(' ').join('_');
            }
            
            return title.trim();
        } else  {
            if (title.split('_').length > 1) {
                return title.split('_').join(' ');
            }
            
            return title.trim();
        }
    }
}