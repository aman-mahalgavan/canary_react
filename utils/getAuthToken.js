import { getCookieFromBrowser } from "./cookie";
import { formatToken } from "./formatToken";


export default () => {
    let token = getCookieFromBrowser("authorization");
    let formattedToken = formatToken(token);

    return { authorization: formattedToken }
}