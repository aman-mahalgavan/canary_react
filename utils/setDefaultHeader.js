import { getCookieFromBrowser } from "./cookie";
import { formatToken } from "./formatToken";
import setAuthToken from "./setAuthToken";

export default () => {
    let token = getCookieFromBrowser("authorization");
    let formattedToken = formatToken(token);
    setAuthToken(formattedToken);
}