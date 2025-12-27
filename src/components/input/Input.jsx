import styled from "styled-components"
import { forwardRef } from "react"

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
