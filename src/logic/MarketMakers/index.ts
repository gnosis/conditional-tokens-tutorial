import MarketMakersRepo from './MarketMakersRepo'
import loadContracts from '../contracts'

let marketMakersRepo: MarketMakersRepo | undefined
let lmsrAddressCache: string
let providerAccountCache: string

const resetMarketMakersRepo = () => {
  marketMakersRepo = undefined
}

const loadMarketMakersRepo = async (web3: any, lmsrAddress: string, account: string) => {
  try {
    if (
      (account && account !== providerAccountCache) ||
      (lmsrAddress && lmsrAddress !== lmsrAddressCache)
    ) {
      resetMarketMakersRepo()
    }
    if (!marketMakersRepo) {
      lmsrAddressCache = lmsrAddress
      providerAccountCache = account

      const contracts = await loadContracts(web3, lmsrAddress, account)
      marketMakersRepo = new MarketMakersRepo(contracts)
    }
    return marketMakersRepo
  } catch (err) {
    console.error(err)
    return null
  }
}

export default loadMarketMakersRepo
