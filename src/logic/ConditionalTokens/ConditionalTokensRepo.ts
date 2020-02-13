const assert = require('assert')

class ConditionalTokensRepo {
  conditionalTokens: any

  constructor(contracts: any) {
    assert(contracts, '"contracts" is required')

    this.conditionalTokens = contracts.conditionalTokens
  }

  balanceOf = async (account: string, positionId: number) => {
    return this.conditionalTokens.balanceOf(account, positionId)
  }

  getOutcomeSlotCount = async (id: string) => {
    return this.conditionalTokens.getOutcomeSlotCount(id)
  }

  getCollectionId = async (parentCollectionId: string, conditionId: string, indexSet: number[]) => {
    return this.conditionalTokens.getCollectionId(parentCollectionId, conditionId, indexSet)
  }

  payoutDenominator = async (conditionId: string) => {
    return this.conditionalTokens.payoutDenominator(conditionId)
  }

  payoutNumerators = async (conditionId: string, outcomeIndex: number) => {
    return this.conditionalTokens.payoutNumerators(conditionId, outcomeIndex)
  }

  isApprovedForAll = async (account: string, lmsrMarketMakerAddress: string) => {
    return this.conditionalTokens.isApprovedForAll(account, lmsrMarketMakerAddress)
  }

  setApprovalForAll = async (lmsrMarketMakerAddress: string, approved: boolean, from: string) => {
    return this.conditionalTokens.setApprovalForAll(lmsrMarketMakerAddress, approved, { from })
  }

  reportPayouts = async (questionId: string, payouts: number[], from: string) => {
    return this.conditionalTokens.reportPayouts(questionId, payouts, { from })
  }

  redeemPositions = async (
    collateralAddress: string,
    parentCollectionId: string,
    marketConditionId: string,
    indexSets: number[],
    from: string,
  ) => {
    return this.conditionalTokens.redeemPositions(
      collateralAddress,
      parentCollectionId,
      marketConditionId,
      indexSets,
      { from },
    )
  }

  // ...
}

export default ConditionalTokensRepo
