import "./App.css"
import styled from "styled-components"

const Div = styled.div`
  color: red;
  background-color: #000;
`

export default function App() {
  return (
    <div className="app">
      <i className="fa fa-camera-retro fa-lg"></i>
      <Div>5678</Div>
    </div>
  )
}
