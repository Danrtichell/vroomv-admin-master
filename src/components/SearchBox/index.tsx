import React, { ChangeEvent } from 'react'
import { Search as SearchIcon } from '@material-ui/icons'
import { Wrapper } from './style'

interface Prop {
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const SearchBox = (prop: Prop) => {
  const { onChange, value } = prop

  return (
    <Wrapper>
      <SearchIcon className="search" />
      <input
        value={value}
        onChange={onChange}
        placeholder="Search for..."
        type="text"
      />
    </Wrapper>
  )
}

export default SearchBox
