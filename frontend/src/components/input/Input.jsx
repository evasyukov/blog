import PropTypes from "prop-types"
import styled from "styled-components"
import { forwardRef } from "react"

// eslint-disable-next-line no-unused-vars
const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />
})

export const Input = styled(InputContainer)`
  height: 40px;
  width: ${({ width = "100%" }) => width};

  margin: 0 0 10px;
  padding: 8px 10px;

  border: 1px solid #000;
  border-radius: 8px;
`
Input.propTypes = {
  width: PropTypes.string,
}
