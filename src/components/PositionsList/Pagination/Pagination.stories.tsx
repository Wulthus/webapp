import React from 'react'
import { storiesOf } from '@storybook/react'
import { colors } from '@static/theme'
import { PaginationList } from './Pagination'

const handleChange = (e: React.ChangeEvent<unknown>, page: number): void => {
  console.log(e, page)
}

storiesOf('positionsList/pagination', module).add('pagination', () => (
  <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
    <PaginationList pages={10} defaultPage={5} handleChangePage={handleChange} />
  </div>
))
