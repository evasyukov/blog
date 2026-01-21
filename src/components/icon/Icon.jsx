import PropTypes from "prop-types"
import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
function IconContainer({ className, iconId, inactive, ...props }) {
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
    cursor: ${({ inactive }) => (inactive ? "default" : "pointer")};
  }
`
Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
}
