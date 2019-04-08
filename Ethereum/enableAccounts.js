


export default async () => {
    try {
        let addresses = await window.ethereum.enable();
        return addresses
    } catch (err) {
        return err
    }
}