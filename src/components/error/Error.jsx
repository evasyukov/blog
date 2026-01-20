import styled from "styled-components"
import { H2 } from "../h2/H2"

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  font-size: 18px;
`

export function Error({ error }) {
  return (
    error && (
      <Div>
        <H2>Ошибка</H2>
        <div>{error}</div>
      </Div>
    )
  )
}
