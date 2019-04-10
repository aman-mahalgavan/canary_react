import getAccount from "./getAccount";
import isEmpty from "./isEmpty";


export default async (hasProfile, address) => {
    let errors = {};
    let account;
    try {
        account = await getAccount();
        if (address != account) {
            errors.address = `Please switch  to your registered address ${address}`
        }
    } catch (err) {
        errors.account = err.message;
    }
    if (!hasProfile) {
        errors.profile = "First You need to complete your Profile";
    }
    if (!address) {
        errors.address = "Please connect an Ethereum address with your account";
    }
    let isEligible = true;
    if (!isEmpty(errors)) {
        isEligible = false;
    }
    return { isEligible, errors };

}
