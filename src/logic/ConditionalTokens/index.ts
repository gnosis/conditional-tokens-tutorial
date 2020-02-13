import ConditionalTokensRepo from './ConditionalTokensRepo'
import loadContracts from '../contracts'

let conditionalTokensRepo: ConditionalTokensRepo | undefined
let lmsrAddressCache: string
let providerAccountCache: string

const resetConditionalTokensRepo = () => {
  conditionalTokensRepo = undefined
}

const loadConditionalTokensRepo = async (web3: any, lmsrAddress: string, account: string) => {
  try {
    if (
      (account && account !== providerAccountCache) ||
      (lmsrAddress && lmsrAddress !== lmsrAddressCache)
    ) {
      resetConditionalTokensRepo()
    }
    if (!conditionalTokensRepo) {
      lmsrAddressCache = lmsrAddress
      providerAccountCache = account

      const contracts = await loadContracts(web3, lmsrAddress, account)
      conditionalTokensRepo = new ConditionalTokensRepo(contracts)
    }
    return conditionalTokensRepo
  } catch (err) {
    console.error(err)
    return null
  }
}

export default loadConditionalTokensRepo
