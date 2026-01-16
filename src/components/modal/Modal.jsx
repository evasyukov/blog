import { useSelector } from "react-redux"
import styled from "styled-components"

import { Button } from "../button/Button"
import {
  selectModalIsOpen,
  selectModalText,
  selectModalOnConfirm,
  selectModalOnCancel,
} from "../../selectors"

function ModalContainer({ className }) {
  const isOpen = useSelector(selectModalIsOpen)
  const text = useSelector(selectModalText)
  const onConfirm = useSelector(selectModalOnConfirm)
  const onCancel = useSelector(selectModalOnCancel)

  if (!isOpen) return null

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button width="120px" onClick={onConfirm}>
            Да
          </Button>
          <Button width="120px" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Modal = styled(ModalContainer)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: 20;

  & .overlay {
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: #000000bf;
  }

  & .box {
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    width: 361px;

    padding: 20px;
    margin: 0 auto;

    background-color: #fff;
    border-radius: 20px;

    z-index: 30;
  }

  & h3 {
    margin-top: 0px;
    text-align: center;
  }

  & .buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
  }
`
