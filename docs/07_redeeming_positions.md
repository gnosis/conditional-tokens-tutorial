---
id: 07_redeeming_positions
title: Redeeming positions
sidebar_label: Redeeming positions
---

Before redeeming your positions in the market is possible, the oracle must report the correct answer to the contract.

In the `ConditionalTokensRepo.ts` file it is defined the function that calls the contract to redeem the positions of the trader:
```
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
```

The function [redeemPositions](https://github.com/gnosis/conditional-tokens-contracts/blob/master/contracts/ConditionalTokens.sol#L218) is defined in the ConditionalTokens contract and it has two parameters:
```
function redeemPositions(IERC20 collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] calldata indexSets) external
```
- `collateralToken`: ERC20 token which exists on the same chain as the ConditionalTokens instance and is used as collateral to back positions.
- `parentCollectionId`: Collection ID of the parent outcome collection, or bytes32(0) if there's no parent.
- `conditionId`: It may be derived from other parameters via ``keccak256(abi.encodePacked(oracle, questionId, outcomeSlotCount))``.
- `indexSets`: Is a bit array where the 0<sup>th</sup> index corresponds with the 0<sup>th</sup> outcome slot and also whether or not the 1<sup>st</sup> place (1 << 0) is set in the value of indexSets. Similarly, the 1<sup>st</sup> index corresponds with  the 1<sup>st</sup> outcome slot and is whether or not the 2<sup>nd</sup> place (1 << 1) is set. It is supposed to represent a "union" of outcome slots. So like a value of 3 (0b11) would represent a position that pays out when either outcome slots [0] or [1] occur.

If the function succeeds, the following [event](https://github.com/gnosis/conditional-tokens-contracts/blob/master/contracts/ConditionalTokens.sol#L46) will be emitted.
```
event PayoutRedemption(
  address indexed redeemer,
  IERC20 indexed collateralToken,
  bytes32 indexed parentCollectionId,
  bytes32 conditionId,
  uint[] indexSets,
  uint payout
);
```

In the `Market.ts` file it is defined the function to redeem the positions of the trader:
```
const redeem = async () => {
  const collateral = await marketMakersRepo.getCollateralToken()

  const indexSets = Array.from({ length: marketInfo.outcomes.length }, (v, i) =>
    i === 0 ? 1 : parseInt(Math.pow(10, i).toString(), 2),
  )

  const tx = await conditionalTokensRepo.redeemPositions(
    collateral.address,
    `0x${'0'.repeat(64)}`,
    marketInfo.conditionId,
    indexSets,
    account,
  )
}
```
