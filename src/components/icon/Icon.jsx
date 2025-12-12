import styled from "styled-components"

function IconContainer({ className, iconId }) {
  return (
    <div className={className}>
      <i className={`fa ${iconId}`} aria-hidden="true"></i>
    </div>
  )
}

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "24px" }) => size};
  margin: ${({ margin = "0px" }) => margin};
`
