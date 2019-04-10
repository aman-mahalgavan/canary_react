

export default async () => {

    let addresses = await window.ethereum.enable();
    return addresses[0]

}