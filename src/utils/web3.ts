export const getCurrentNetworkName = () => {
  // https://ethereum.stackexchange.com/a/17101
  const networkId = process.env.REACT_APP_NETWORK_ID && parseInt(process.env.REACT_APP_NETWORK_ID)
  switch (networkId) {
    case 1:
      return 'mainnet'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    case 42:
      return 'kovan'
    default:
      return null
  }
}

export const getWeb3Account = async (web3: any) => {
  if (!web3) return null
  if (web3.defaultAccount == null) {
    const accounts = await web3.eth.getAccounts()
    return accounts[0] || null
  } else return web3.defaultAccount
}
