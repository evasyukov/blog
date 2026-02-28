import { ACTION_TYPE } from "./actionType"
export function openModal(modelParams) {
  return {
    type: ACTION_TYPE.OPEN_MODAL,
    payload: modelParams,
  }
}
