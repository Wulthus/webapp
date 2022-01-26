import React from 'react'
import { storiesOf } from '@storybook/react'
import { SelectedFarm } from './SelectedFarm'
storiesOf('farmsList/selectedFarm', module).add('tile', () => {
  const handleFarm = (type: string): void => {
    console.log(type)
  }
  return (
    <div style={{ width: 500, height: 500 }}>
      <SelectedFarm
        value={2345.34}
        staked={233345}
        pair={'xBTC - xUSD'}
        rewardsToken={'SNY'}
        currencyPrice={2}
        apy={1}
        liquidity={457}
        handleFarm={handleFarm}
      />
    </div>
  )
})
