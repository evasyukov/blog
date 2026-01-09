import styled from "styled-components"

function IconContainer({ className, iconId, ...props }) {
  return (
    <div className={className} {...props}>
      <i className={`fa ${iconId}`} aria-hidden="true"></i>
    </div>
  )
}

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "24px" }) => size};
  margin: ${({ margin = "0px" }) => margin};

  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

  &:hover {
    cursor: pointer;
  }
`
