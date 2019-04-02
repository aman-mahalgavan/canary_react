export const formatToken = (token) => {

    let splittedToken = token.split("%20");

    return `${splittedToken[0]} ${splittedToken[1]}`


}