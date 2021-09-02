import ConditionalTokens from '../abi/ConditionalTokens.json'
import LMSRMarketMaker from '../abi/LMSRMarketMaker.json'
import WETH9 from '../abi/WETH9.json'
const TruffleContract = require('@truffle/contract')

let contracts: Object | undefined
let lmsrAddressCache: string | undefined
let providerAccountCache: string | undefined

const resetContracts = () => {
  contracts = undefined
  lmsrAddressCache = undefined
  providerAccountCache = undefined
}

const loadLMSRMarketMakerContract = async (web3: any) => {
  let lmsrMarketMakerContract
  if (!contracts) {
    lmsrMarketMakerContract = TruffleContract(LMSRMarketMaker)
    lmsrMarketMakerContract.setProvider(web3.currentProvider)
  }
  return lmsrMarketMakerContract
}

const loadConditionalTokensContract = async (web3: any) => {
  let conditionalTokensContract
  if (!contracts) {
    conditionalTokensContract = TruffleContract(ConditionalTokens)
    conditionalTokensContract.setProvider(web3.currentProvider)
  }
  return conditionalTokensContract
}

const loadWETH9Contract = async (web3: any) => {
  let weth9Contract
  if (!contracts) {
    weth9Contract = TruffleContract(WETH9)
    weth9Contract.setProvider(web3.currentProvider)
  }
  return weth9Contract
}

const loadContracts = async (web3: any, lmsrAddress: string, account: string) => {
  try {
    if (
      (account && account !== providerAccountCache) ||
      (lmsrAddress && lmsrAddress !== lmsrAddressCache)
    ) {
      resetContracts()
    }
    if (!contracts) {
      providerAccountCache = account
      lmsrAddressCache = lmsrAddress

      const LMSRMarketMakerContract = await loadLMSRMarketMakerContract(web3)
      const ConditionalTokensContract = await loadConditionalTokensContract(web3)
      const WETH9Contract = await loadWETH9Contract(web3)

      const lmsrMarketMaker = await LMSRMarketMakerContract.at(lmsrAddress)
      const conditionalTokens = await ConditionalTokensContract.at(await lmsrMarketMaker.pmSystem())
      const collateralToken = {
        address: await lmsrMarketMaker.collateralToken(),
        contract: await WETH9Contract.at(await lmsrMarketMaker.collateralToken()),
        name: 'Wrapped Ether',
        decimals: 18,
        symbol: 'WETH',
      }

      contracts = { lmsrMarketMaker, conditionalTokens, collateralToken }
    }
    return contracts
  } catch (err) {
    console.error(err)
    return null
  }
}

export default loadContracts
