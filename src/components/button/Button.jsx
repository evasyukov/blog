import PropTypes from "prop-types"
import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
function ButtonContainer({ claaName, width, disabled, children, ...props }) {
  return (
    <button className={claaName} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export const Button = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width = "100%" }) => width};
  height: 30px;

  font-size: 18px;
  user-select: none;

  border: 1px solid #000;
  border-radius: 7px;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
}
