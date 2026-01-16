import styled from "styled-components"

import { Icon } from "../../../../components"

function SpecialPanelContainer({ className, publishedAt, iconButton, margin }) {
  return (
    <div className={className}>
      <div className="published-at">
        <Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="18px" />
        {publishedAt}
      </div>
      <div className="buttons">
        <Icon iconId={iconButton} margin="0 10px 0 0" size="20px" />
        <Icon iconId="fa-trash-o" size="20px" />
      </div>
    </div>
  )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;

  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    align-items: center;
  }
`
