import React from 'react'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { colors, theme } from '@static/theme'
import { useStyles } from './style'

export enum SortType {
  NAME_ASC,
  NAME_DESC,
  PRICE_ASC,
  PRICE_DESC,
  CHANGE_ASC,
  CHANGE_DESC,
  VOLUME_ASC,
  VOLUME_DESC,
  TVL_ASC,
  TVL_DESC
}

interface IProps {
  displayType: string
  itemNumber?: number
  icon?: string
  name?: string
  symbol?: string
  price?: number
  priceChange?: number
  volume?: number
  TVL?: number
  sortType?: SortType
  onSort?: (type: SortType) => void
}

const TokenListItem: React.FC<IProps> = ({
  displayType,
  itemNumber = 0,
  icon = 'BTCIcon',
  name = 'Bitcoin',
  symbol = 'BTCIcon',
  price = 0,
  priceChange = 0,
  volume = 0,
  TVL = 0,
  sortType,
  onSort
}) => {
  const classes = useStyles()
  const isNegative = priceChange < 0

  const isXDown = useMediaQuery(theme.breakpoints.down('sm'))
  const hideName = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid>
      {displayType === 'tokens' ? (
        <Grid
          container
          style={{ color: colors.white.main }}
          classes={{ container: classes.container, root: classes.tokenList }}>
          <Typography component='p'>{itemNumber}</Typography>
          <Grid className={classes.tokenName}>
            {!isXDown && <img src={icon}></img>}
            <Typography>
              {hideName ? symbol : name}
              {!hideName && <span className={classes.tokenSymbol}>{` (${symbol})`}</span>}
            </Typography>
          </Grid>
          <Typography>{`~$${formatNumbers()(price.toString())}${showPrefix(price)}`}</Typography>
          {!hideName && (
            <Typography style={{ color: isNegative ? colors.invariant.Error : colors.green.main }}>
              {isNegative ? `${priceChange.toFixed(2)}%` : `+${priceChange.toFixed(2)}%`}
            </Typography>
          )}
          {!hideName && (
            <Typography>{`$${formatNumbers()(volume.toString())}${showPrefix(volume)}`}</Typography>
          )}
          <Typography>{`$${formatNumbers()(TVL.toString())}${showPrefix(TVL)}`}</Typography>
        </Grid>
      ) : (
        <Grid
          container
          style={{ color: colors.invariant.textGrey, fontWeight: 400 }}
          classes={{ container: classes.container, root: classes.header }}>
          <Typography style={{ lineHeight: '12px' }}>
            N<sup>o</sup>
          </Typography>
          <Grid>
            <Typography
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (sortType === SortType.NAME_ASC) {
                  onSort?.(SortType.NAME_DESC)
                } else {
                  onSort?.(SortType.NAME_ASC)
                }
              }}>
              Name
            </Typography>
          </Grid>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.PRICE_ASC) {
                onSort?.(SortType.PRICE_DESC)
              } else {
                onSort?.(SortType.PRICE_ASC)
              }
            }}>
            Price
          </Typography>
          {!hideName && (
            <Typography
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (sortType === SortType.CHANGE_ASC) {
                  onSort?.(SortType.CHANGE_DESC)
                } else {
                  onSort?.(SortType.CHANGE_ASC)
                }
              }}>
              Price change
            </Typography>
          )}
          {!hideName && (
            <Typography
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (sortType === SortType.VOLUME_DESC) {
                  onSort?.(SortType.VOLUME_ASC)
                } else {
                  onSort?.(SortType.VOLUME_DESC)
                }
              }}>
              Volume 24H
            </Typography>
          )}
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.TVL_DESC) {
                onSort?.(SortType.TVL_ASC)
              } else {
                onSort?.(SortType.TVL_DESC)
              }
            }}>
            TVL
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
export default TokenListItem
