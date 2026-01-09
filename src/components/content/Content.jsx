import styled from "styled-components"
import { H2 } from "../h2/H2"

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export function Content({ children, error }) {
  return error ? (
    <Div>
      <H2>Ошибка</H2>
      <div>{error}</div>
    </Div>
  ) : (
    children
  )
}
