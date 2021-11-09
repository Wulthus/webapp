import { Grid, Typography } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import React, { useState, useRef } from 'react'
import PositionSettings from '../Modals/PositionSettings/PositionSettings'
import DepositSelector from './DepositSelector/DepositSelector'
import RangeSelector from './RangeSelector/RangeSelector'
import settingsIcon from '@static/svg/settings_ic.svg'
import useStyles from './style'

export interface INewPosition {
  tokens: Array<{ symbol: string, name: string, icon: string, walletAmount: number, address: PublicKey }>
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  addLiquidityHandler: (
    token1: PublicKey,
    token2: PublicKey,
    token1Amount: number,
    token2Amount: number,
    leftTickIndex: number,
    rightTickIndex: number,
    feeTier: number,
    slippageTolerance: number
  ) => void
  onChangePositionTokens: (token1Index: number | null, token2index: number | null) => void
}

export const INewPosition: React.FC<INewPosition> = ({
  tokens,
  data,
  midPriceIndex,
  addLiquidityHandler,
  onChangePositionTokens
}) => {
  const classes = useStyles()

  const settingsRef = useRef<HTMLDivElement>(null)

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1)
  const [feeTier, setFeeTier] = useState<number>(0.05)

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [token1Index, setToken1Index] = useState<number | null>(null)
  const [token2Index, setToken2Index] = useState<number | null>(null)

  const setInputBlockerInfo = (isIndexNull: boolean, isSingleAsset: boolean) => {
    if (isIndexNull) {
      return 'Select token.'
    }

    if (isSingleAsset) {
      return 'Current price outside range. Single-asset deposit only.'
    }

    return ''
  }

  const setRangeBlockerInfo = (isAnyIndexNull: boolean) => {
    if (isAnyIndexNull) {
      return 'Select tokens to set price range.'
    }

    return ''
  }

  return (
    <Grid container className={classes.wrapper}>
      <Grid container className={classes.top} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography className={classes.title}>Add new liquidity position</Typography>

        <Grid
          className={classes.settings}
          ref={settingsRef}
          onClick={() => { setSettingsOpen(true) }}
          container
          item
          alignItems='center'
        >
          <img className={classes.settingsIcon} src={settingsIcon} />
          <Typography className={classes.settingsText}>Position settings</Typography>
        </Grid>
      </Grid>

      <Grid container direction='row' justifyContent='space-between'>
        <DepositSelector
          tokens={tokens}
          setPositionTokens={(index1, index2) => {
            setToken1Index(index1)
            setToken2Index(index2)
            onChangePositionTokens(index1, index2)
          }}
          setFeeValue={setFeeTier}
          token1Max={token1Index !== null ? tokens[token1Index].walletAmount : 0}
          token2Max={token2Index !== null ? tokens[token2Index].walletAmount : 0}
          onAddLiquidity={
            (token1Amount, token2Amount) => {
              if (token1Index !== null && token2Index !== null) {
                addLiquidityHandler(
                  tokens[token1Index].address,
                  tokens[token2Index].address,
                  token1Amount,
                  token2Amount,
                  leftRange,
                  rightRange,
                  feeTier,
                  slippageTolerance
                )
              }
            }
          }
          token1InputState={{
            blocked: token1Index === null || rightRange < midPriceIndex,
            blockerInfo: setInputBlockerInfo(token1Index === null, rightRange < midPriceIndex)
          }}
          token2InputState={{
            blocked: token2Index === null || leftRange > midPriceIndex,
            blockerInfo: setInputBlockerInfo(token2Index === null, leftRange > midPriceIndex)
          }}
        />

        <RangeSelector
          data={data}
          midPriceIndex={midPriceIndex}
          tokenFromSymbol={token1Index !== null ? tokens[token1Index].symbol : 'ABC'}
          tokenToSymbol={token2Index !== null ? tokens[token2Index].symbol : 'XYZ'}
          onChangeRange={
            (left, right) => {
              setLeftRange(left)
              setRightRange(right)
            }
          }
          blocked={token1Index === null || token2Index === null}
          blockerInfo={setRangeBlockerInfo(token1Index === null || token2Index === null)}
        />
      </Grid>

      <PositionSettings
        open={settingsOpen}
        anchorEl={settingsRef.current}
        handleClose={() => { setSettingsOpen(false) }}
        slippageTolerance={slippageTolerance}
        onChangeSlippageTolerance={setSlippageTolerance}
        autoSetSlippageTolerance={() => { setSlippageTolerance(1) }}
      />
    </Grid>
  )
}

export default INewPosition
