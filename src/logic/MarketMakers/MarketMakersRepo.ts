const assert = require('assert')

class MarketMakersRepo {
  lmsrMarketMaker: any
  collateralToken: any

  constructor(contracts: any) {
    assert(contracts, '"contracts" is required')

    this.lmsrMarketMaker = contracts.lmsrMarketMaker
    this.collateralToken = contracts.collateralToken
  }

  getAddress = async () => {
    return this.lmsrMarketMaker.address
  }

  getCollateralToken = async () => {
    return this.collateralToken
  }

  conditionIds = async (index: number) => {
    return this.lmsrMarketMaker.conditionIds(index)
  }

  owner = async () => {
    return this.lmsrMarketMaker.owner()
  }

  funding = async () => {
    return this.lmsrMarketMaker.funding()
  }

  stage = async () => {
    return this.lmsrMarketMaker.stage()
  }

  close = async (from: string) => {
    return this.lmsrMarketMaker.close({ from })
  }

  calcNetCost = async (outcomeTokenAmounts: number[]) => {
    return this.lmsrMarketMaker.calcNetCost(outcomeTokenAmounts)
  }

  calcMarginalPrice = async (outcomeIndex: number) => {
    return this.lmsrMarketMaker.calcMarginalPrice(outcomeIndex)
  }

  trade = async (tradeAmounts: number[], collateralLimit: number, from: string) => {
    return this.lmsrMarketMaker.trade(tradeAmounts, collateralLimit, { from })
  }

  // ...
}

export default MarketMakersRepo
