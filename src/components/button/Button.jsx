import styled from "styled-components"

function ButtonContainer({ claaName, width, children, ...props }) {
  return (
    <button className={claaName} {...props}>
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
    cursor: pointer;
  }
`
