import styled from "styled-components"

import { Input, Icon } from "../../../../components"

function SearchContainer({ className, searchPhrase, onChange = { onChange } }) {
  return (
    <div className={className}>
      <Input
        onChange={onChange}
        value={searchPhrase}
        placeholder="Поиск по заголовку"
      />
      <Icon
        inactive={true}
        iconId="fa-search"
        margin="0 10px 0 0"
        size="18px"
      />
    </div>
  )
}

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;

  width: 340px;
  height: 40px;
  margin: 30px auto 0;

  & > div {
    position: absolute;

    right: 0;
    top: 6px;
  }

  & > input {
    padding: 10px 34px 10px 10px;
  }
`
